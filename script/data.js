const productData = [
  {
    img_src: "../assets/img/cart/fruit/strawberries.webp",
    category: "fruits",
    name: "Strawberry local",
    unit: "kg",
    price: 1990, // সংখ্যা হিসেবে রাখছি যাতে ক্যালকুলেশন সহজ হয়
    add_cart: "Add to Cart",
    id: "sku-01",
  },
  {
    img_src: "../assets/img/cart/snacks-spices/dates.jpg",
    category: "snacks",
    name: "Dry Dates",
    unit: "pcs",
    price: 1535,
    add_cart: "Add to Cart",
    id: "sku-02",
  },
];

function showProducts() {
  const container = document.getElementById("product-container");
  if (!container) {
    console.error("Product container not found!");
    return;
  }

  for (let product of productData) {
    const productCard = document.createElement("div");
    productCard.innerHTML = `
      <div class="card flex flex-col justify-center items-center p-4 rounded-md border relative group h-96" data-unit="${product.unit}">
        <!-- Image -->
        <figure class="overflow-hidden flex items-center justify-center group h-3/5">
          <img src="${product.img_src}" alt="${product.name}" class="w-5/6 object-contain group-hover:scale-110 transition-transform duration-500">
          <div class="absolute inset-0 rounded-md bg-black bg-opacity-0 group-hover:bg-opacity-50 bottom-96 group-hover:bottom-48 transition-all duration-500 flex justify-center items-center opacity-0 group-hover:opacity-100 gap-4">
            <a href="#" class=""><i class='bx bx-zoom-in text-white text-5xl hover:scale-125 transition-transform duration-500'></i></a>
            <a href="cart.html"><i class='bx bx-heart text-white text-5xl hover:scale-125 transition-transform duration-500'></i></a>
          </div>
        </figure>

        <!-- Text -->
        <div class="card-body w-full px-2 py-2 mt-4 gap-0 justify-center">
          <!-- Category & Name -->
          <div class="capitalize">
            <p class="text-color text-left font-semibold">${product.category}</p>
            <h3 class="text-base text-left font-bold uppercase">${product.name}</h3>
            <p class="text-base font-semibold text-gray-500">${product.unit}</p>
          </div>

          <!-- Quantity Control -->
          <div class="flex items-center justify-between my-2">
            <div>
              <p id="total-price-${product.id}" class="font-semibold uppercase">tk.${product.price}</p>
            </div>
            <div class="flex flex-row items-center justify-center gap-4 border rounded-full p-1">
              <button class="decrease bg-gray-200 flex items-center justify-center rounded-full w-6 h-6 text-lg" data-id="${product.id}">−</button>
              <span id="quantity-${product.id}" class="text-sm font-semibold">1</span>
              <button class="increase bg-gray-200 flex items-center justify-center rounded-full w-6 h-6 text-lg" data-id="${product.id}">+</button>
            </div>
          </div>

          <!-- Add to Cart Button -->
          <div class="flex justify-center">
            <button class="add-to-cart rounded-lg font-semibold px-2 py-1 gap-2 flex items-center justify-center btn-bg-primary text-white group hover:px-4 duration-300" data-id="${product.id}">
              ${product.add_cart}<i class='bx bx-right-arrow-alt text-2xl group-hover:-rotate-45 transition-transform duration-400'></i>
            </button>
          </div>
        </div>
      </div>
    `;
    container.appendChild(productCard);
  }

  // ইভেন্ট লিসেনার যোগ করা
  addEventListeners();
}

function addEventListeners() {
  document.querySelectorAll(".increase").forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      updateQuantity(id, 1);
    });
  });

  document.querySelectorAll(".decrease").forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      updateQuantity(id, -1);
    });
  });

  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      // id দিয়ে productData থেকে প্রোডাক্ট খুঁজে বের করা
      const product = productData.find((p) => p.id === id);
      alert(`Product "${product.name}" added to cart!`);
    });
  });
}

function updateQuantity(id, change) {
  const quantityElement = document.getElementById(`quantity-${id}`);
  const priceElement = document.getElementById(`total-price-${id}`);
  let quantity = parseInt(quantityElement.textContent);
  const product = productData.find((p) => p.id === id);

  quantity += change;
  if (quantity < 1) quantity = 1; // মিনিমাম কোয়ান্টিটি ১

  quantityElement.textContent = quantity;
  priceElement.textContent = `tk.${product.price * quantity}`;
}

showProducts();