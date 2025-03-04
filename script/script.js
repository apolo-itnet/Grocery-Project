// hero-carousel-start
const carousel = document.getElementById("carousel");
const totalSlides = document.querySelectorAll(".carousel-item").length;
let index = 0;
let autoSlideInterval; // Variable to store the interval ID

// Function to change slides
function changeSlide() {
  carousel.style.transform = `translateX(-${index * 100}%)`;
}

// Function to go to the next slide
function nextSlide() {
  index = (index + 1) % totalSlides; // Loop back to the first slide after the last
  changeSlide();
  resetAutoSlide(); // Restart the auto-slide after manual slide change
}

// Function to go to the previous slide
function prevSlide() {
  index = (index - 1 + totalSlides) % totalSlides; // Loop back to the last slide if moving back
  changeSlide();
  resetAutoSlide(); // Restart the auto-slide after manual slide change
}

// Function to reset the auto-slide interval
function resetAutoSlide() {
  clearInterval(autoSlideInterval); // Clear the existing interval
  autoSlideInterval = setInterval(nextSlide, 4000); // Start a new interval
}

// Set up the interval for auto-sliding every 4 seconds
autoSlideInterval = setInterval(nextSlide, 4000);

// Event listeners for buttons
document.querySelectorAll('.btn-circle').forEach(button => {
  button.addEventListener('click', function() {
    if (this.innerText === '❮') {
      prevSlide();
    } else if (this.innerText === '❯') {
      nextSlide();
    }
  });
});

// hero-carousel-end


// cart & wishlist - 2nd method
document.addEventListener("DOMContentLoaded", function () {
  let cartContainer = document.getElementById("cart-items");
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  if (cartItems.length === 0) {
      cartContainer.innerHTML = "<p>No items in cart</p>";
  } else {
      cartItems.forEach(item => {
          let cartItem = document.createElement("div");
          cartItem.classList.add("cart-item");
          cartItem.innerHTML = `
              <img src="${item.image}" width="50">
              <p>${item.name}</p>
              <p>${item.quantity} x tk.${item.price}</p>
              <p>Total: tk.${item.total}</p>
          `;
          cartContainer.appendChild(cartItem);
      });
  }
});


// wishlist 
function saveToWishlist(product) {
  let wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlistItems.push(product);
  localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
}

//add to cart
document.addEventListener("DOMContentLoaded", function () {
  let carts = document.querySelectorAll(".card");

  carts.forEach(cart => {
      let quantityElement = cart.querySelector("#quantity");
      let totalPriceElement = cart.querySelector("#total-price");
      let decreaseBtn = cart.querySelector("#decrease");
      let increaseBtn = cart.querySelector("#increase");
      let addToCartBtn = cart.querySelector("#add-to-cart");

      // Kg or Piece নির্ধারণ করো
      let unit = cart.dataset.unit || "kg"; // HTML-এ data-unit="piece" দিলে সেটা ধরে নিবে
      let priceText = totalPriceElement.innerText.replace(/[^\d]/g, "");
      let pricePerUnit = parseInt(priceText); // 1kg বা 1pc এর দাম
      let quantity = 1; // Default quantity
      let weightOptions = unit === "kg" ? [0.1, 0.25, 0.5, 1] : null;

      function updatePrice() {
          let totalPrice = (quantity * pricePerUnit).toFixed(2);
          totalPriceElement.innerText = `tk.${totalPrice}`;
          quantityElement.innerText = unit === "kg"
              ? (quantity < 1 ? `${quantity * 1000}gm` : `${quantity}kg`)
              : `${quantity} pcs`;
      }

      // Increase Quantity
      increaseBtn.addEventListener("click", function () {
          if (unit === "kg") {
              if (quantity < 1) {
                  let nextIndex = weightOptions.indexOf(quantity) + 1;
                  quantity = weightOptions[nextIndex] || 1; 
              } else {
                  quantity++;
              }
          } else {
              quantity++; // পিস হলে শুধু সংখ্যা বাড়বে
          }
          updatePrice();
      });

      // Decrease Quantity
      decreaseBtn.addEventListener("click", function () {
          if (unit === "kg") {
              if (quantity > 1) {
                  quantity--;
              } else {
                  let prevIndex = weightOptions.indexOf(quantity) - 1;
                  quantity = weightOptions[prevIndex] || 0.1;
              }
          } else {
              if (quantity > 1) {
                  quantity--; // পিস হলে শুধু সংখ্যা কমবে
              }
          }
          updatePrice();
      });

      // Add to Cart
      addToCartBtn.addEventListener("click", function () {
          let product = {
              name: cart.querySelector("h3").innerText,
              price: pricePerUnit,
              quantity: unit === "kg"
                  ? (quantity < 1 ? `${quantity * 1000}gm` : `${quantity}kg`)
                  : `${quantity} pcs`,
              total: (quantity * pricePerUnit).toFixed(2),
              image: cart.querySelector("img").src
          };

          saveToCart(product);
          alert(`${product.quantity} ${product.name} added to cart!`);
      });

      function saveToCart(product) {
          let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
          cartItems.push(product);
          localStorage.setItem("cart", JSON.stringify(cartItems));
      }
  });
});

// category wise product show


// বাটন ধরা
const allBtn = document.querySelector('.all-product');
const vegBtn = document.querySelector('.vegetable');
const fruitBtn = document.querySelector('.fruits');
const snackBtn = document.querySelector('.snacks');

// সব কার্ড ধরা
const cards = document.querySelectorAll('.card');

// ফিল্টার করার ফাংশন
function showProducts(category) {
    cards.forEach(card => {
        const pTag = card.querySelector('p');
        const classList = pTag.classList;
        const hasCategory = classList.contains(category);

        if (category === 'all') {
            card.style.display = 'flex'; // দেখাও
        } else if (hasCategory) {
            card.style.display = 'flex'; // ক্যাটাগরি মিললে দেখাও
        } else {
            card.style.display = 'none'; // না মিললে লুকাও
        }
    });
}

// বাটনে ক্লিক করলে কী হবে
allBtn.addEventListener('click', () => showProducts('all'));
vegBtn.addEventListener('click', () => showProducts('vegetable'));
fruitBtn.addEventListener('click', () => showProducts('fruits'));
snackBtn.addEventListener('click', () => showProducts('snacks'));