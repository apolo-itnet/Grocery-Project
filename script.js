/* const carousel = document.getElementById("carousel");
let index = 0;
const totalSlides = document.querySelectorAll("#carousel div").length - 1;

function nextSlide() {
    index++;
    carousel.style.transition = "transform 0.5s ease-in-out";
    carousel.style.transform = `translateX(-${index * 100}%)`;
    
    if (index === totalSlides) {
        setTimeout(() => {
            carousel.style.transition = "none";
            carousel.style.transform = "translateX(0%)";
            index = 0;
        }, 500);
    }
}
setInterval(nextSlide, 4000); */


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


// Add to cart - 1st method
/*
document.addEventListener("DOMContentLoaded", function () {
  let quantity = 1; // Default quantity
  let pricePerItem = 30.00; // Base price
  let totalPriceElement = document.getElementById("total-price");
  let quantityElement = document.getElementById("quantity");
  
  // Buttons
  let decreaseBtn = document.getElementById("decrease");
  let increaseBtn = document.getElementById("increase");
  let addToCartBtn = document.getElementById("add-to-cart");

  // Increase Quantity
  increaseBtn.addEventListener("click", function () {
      quantity++;
      updatePrice();
  });

  // Decrease Quantity (Minimum 1)
  decreaseBtn.addEventListener("click", function () {
      if (quantity > 1) {
          quantity--;
          updatePrice();
      }
  });

  // Update Price Function
  function updatePrice() {
      let totalPrice = (quantity * pricePerItem).toFixed(2);
      totalPriceElement.innerText = `$${totalPrice}`;
      quantityElement.innerText = quantity;
  }

  // Add to Cart (Console Log for now)
  addToCartBtn.addEventListener("click", function () {
      console.log(`Added to cart: ${quantity} item(s) - Total Price: $${(quantity * pricePerItem).toFixed(2)}`);
      alert(`Added ${quantity} item(s) to cart!`);
  });
});
*/

// Add to cart - 2nd method
/*
document.addEventListener("DOMContentLoaded", function () {
  let carts = document.querySelectorAll(".card");

  carts.forEach(cart => {
      let quantityElement = cart.querySelector("#quantity");
      let totalPriceElement = cart.querySelector("#total-price");
      let decreaseBtn = cart.querySelector("#decrease");
      let increaseBtn = cart.querySelector("#increase");
      let addToCartBtn = cart.querySelector("#add-to-cart");

      let pricePerItem = parseFloat(totalPriceElement.innerText.replace("tk.", "").trim());
      let quantity = 1;

      // Increase Quantity
      increaseBtn.addEventListener("click", function () {
          quantity++;
          updatePrice();
      });

      // Decrease Quantity
      decreaseBtn.addEventListener("click", function () {
          if (quantity > 1) {
              quantity--;
              updatePrice();
          }
      });

      // Update Price
      function updatePrice() {
          let totalPrice = (quantity * pricePerItem).toFixed(2);
          totalPriceElement.innerText = `tk.${totalPrice}`;
          quantityElement.innerText = quantity;
      }

      // Add to Cart
      addToCartBtn.addEventListener("click", function () {
          let product = {
              name: cart.querySelector("h3").innerText,
              price: pricePerItem,
              quantity: quantity,
              total: (quantity * pricePerItem).toFixed(2),
              image: cart.querySelector("img").src
          };

          saveToCart(product);
          alert(`${quantity} ${product.name} added to cart!`);
      });
  });

  function saveToCart(product) {
      let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      cartItems.push(product);
      localStorage.setItem("cart", JSON.stringify(cartItems));
  }
});
*/


// Add to cart - 3rd method deepseek

// সমস্ত কার্টের জন্য সিঙ্গেল ইভেন্ট লিসেনার
/*
document.addEventListener('click', function(e) {
  const card = e.target.closest('.card');
  if (!card) return;

  // কোয়ান্টিটি কন্ট্রোল
  if (e.target.classList.contains('increase') || e.target.classList.contains('decrease')) {
    const quantityEl = card.querySelector('.quantity');
    const priceEl = card.querySelector('.total-price');
    const basePrice = parseFloat(card.dataset.basePrice);
    let quantity = parseInt(quantityEl.textContent);

    // ক্যালকুলেশন
    if (e.target.classList.contains('increase')) quantity++;
    if (e.target.classList.contains('decrease') && quantity > 1) quantity--;

    // আপডেট UI
    quantityEl.textContent = quantity;
    priceEl.textContent = `tk.${(basePrice * quantity).toFixed(2)}`;
  }

  // Add to Cart ফাংশনালিটি
  if (e.target.classList.contains('add-to-cart')) {
    const product = {
      name: card.querySelector('h3').textContent.trim(),
      price: parseFloat(card.dataset.basePrice),
      quantity: parseInt(card.querySelector('.quantity').textContent),
      total: parseFloat(card.querySelector('.total-price').textContent.replace('tk.', ''))
    };
    console.log('Added to cart:', product);
    alert(`${product.quantity}x ${product.name} added! Total: tk.${product.total}`);
  }

  // উইশলিস্ট ফাংশনালিটি
  if (e.target.id === 'wish-cart') {
    const productName = card.querySelector('h3').textContent.trim();
    console.log('Added to wishlist:', productName);
    e.target.classList.toggle('text-red-500'); // হৃদয় আইকন কালার চেঞ্জ
  }

  // জুম ইন ফাংশনালিটি
  if (e.target.id === 'zoom-in') {
    const imgSrc = card.querySelector('img').src;
    console.log('Zoom image:', imgSrc);
    // এখানে মডাল বা লাইটবক্স ওপেন করুন
  }
});
*/

// Add to cart - 4th method - chatgpt
/*
document.addEventListener("DOMContentLoaded", function () {
  let carts = document.querySelectorAll(".card");

  carts.forEach(cart => {
      let quantityElement = cart.querySelector("#quantity");
      let totalPriceElement = cart.querySelector("#total-price");
      let decreaseBtn = cart.querySelector("#decrease");
      let increaseBtn = cart.querySelector("#increase");
      let addToCartBtn = cart.querySelector("#add-to-cart");

      // শুধুমাত্র সংখ্যাটা বের করে নাও
      let priceText = totalPriceElement.innerText.replace(/[^\d]/g, "");  
      let pricePerItem = parseInt(priceText); // parseFloat -> parseInt

      if (isNaN(pricePerItem)) {
          console.error("Invalid price detected:", priceText);
          pricePerItem = 0; 
      }

      let quantity = 1;

      // Increase Quantity
      increaseBtn.addEventListener("click", function () {
          quantity++;
          updatePrice();
      });

      // Decrease Quantity
      decreaseBtn.addEventListener("click", function () {
          if (quantity > 1) {
              quantity--;
              updatePrice();
          }
      });

      // Update Price (Multiplication)
      function updatePrice() {
          let totalPrice = quantity * pricePerItem; // **toFixed(2) সরিয়ে দিলাম**
          totalPriceElement.innerText = `tk.${totalPrice}`;
          quantityElement.innerText = quantity;
      }

      // Add to Cart
      addToCartBtn.addEventListener("click", function () {
          let product = {
              name: cart.querySelector("h3").innerText,
              price: pricePerItem,
              quantity: quantity,
              total: quantity * pricePerItem,
              image: cart.querySelector("img").src
          };

          saveToCart(product);
          alert(`${quantity} ${product.name} added to cart!`);
      });
  });

  function saveToCart(product) {
      let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      cartItems.push(product);
      localStorage.setItem("cart", JSON.stringify(cartItems));
  }
});
*/

// Add to cart - 5th method - chatgpt
/*
document.addEventListener("DOMContentLoaded", function () {
  let carts = document.querySelectorAll(".card");

  carts.forEach(cart => {
      let quantityElement = cart.querySelector("#quantity");
      let totalPriceElement = cart.querySelector("#total-price");
      let decreaseBtn = cart.querySelector("#decrease");
      let increaseBtn = cart.querySelector("#increase");
      let addToCartBtn = cart.querySelector("#add-to-cart");

      // শুধুমাত্র সংখ্যাটা বের করে নাও
      let priceText = totalPriceElement.innerText.replace(/[^\d]/g, "");
      let pricePerKg = parseInt(priceText); // 1kg এর দাম
      let quantity = 1; // Default 1kg
      let weightOptions = [0.1, 0.25, 0.5, 1]; // 100gm, 250gm, 500gm, 1kg+
      
      function updatePrice() {
          let totalPrice = (quantity * pricePerKg).toFixed(2);
          totalPriceElement.innerText = `tk.${totalPrice}`;
          quantityElement.innerText = quantity < 1 ? `${quantity * 1000}gm` : `${quantity}kg`;
      }

      // Increase Quantity
      increaseBtn.addEventListener("click", function () {
          if (quantity < 1) {
              let nextIndex = weightOptions.indexOf(quantity) + 1;
              quantity = weightOptions[nextIndex] || 1; // 100gm -> 250gm -> 500gm -> 1kg
          } else {
              quantity++; // 1kg এর পর infinity পর্যন্ত বাড়বে
          }
          updatePrice();
      });

      // Decrease Quantity
      decreaseBtn.addEventListener("click", function () {
          if (quantity > 1) {
              quantity--;
          } else {
              let prevIndex = weightOptions.indexOf(quantity) - 1;
              quantity = weightOptions[prevIndex] || 0.1; // 1kg -> 500gm -> 250gm -> 100gm
          }
          updatePrice();
      });

      // Add to Cart
      addToCartBtn.addEventListener("click", function () {
          let product = {
              name: cart.querySelector("h3").innerText,
              price: pricePerKg,
              quantity: quantity < 1 ? `${quantity * 1000}gm` : `${quantity}kg`,
              total: (quantity * pricePerKg).toFixed(2),
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
*/


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
