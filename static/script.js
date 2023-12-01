function loadCategories(products) {
  const categories = new Set(products.map((p) => p.category));
  const categoryContainer = document.getElementById("category-container");

  categories.forEach((category) => {
    const anchor = document.createElement("a");
    anchor.textContent = category;
    anchor.href = `#${category.replace(/\s+/g, "-")}`;
    categoryContainer.appendChild(anchor);
  });
}

function sortProductsByCategory(products) {
  return products.sort((a, b) => a.category.localeCompare(b.category));
}

document.addEventListener("DOMContentLoaded", function () {
  // Products data from the CSV file
  const products = [
    {
      model: "Port and Co - CP77",
      category: "Dad hat",
      quality: "Low",
      material: "100% Cotton Unstructured",
      price: "$6.69",
    },
    {
      model: "New Era - 201",
      category: "Dad hat",
      quality: "Medium",
      material: "100% Cotton Unstructured",
      price: "$10.49",
    },
    {
      model: "Yupoong - 6245PT - dad hat",
      category: "Dad hat",
      quality: "Medium",
      material: "100% Cotton Unstructured",
      price: "$8.90",
    },
    {
      model: "Marine Layer - MSC1",
      category: "Shirt blend",
      quality: "Premium",
      material: "50% Cotton / 50% Micromodal)",
      price: "42.63",
    },
    {
      model: "Travis Mathew - TM1MU412",
      category: "Polo",
      quality: "High",
      material: "57/43 cotton/polyester",
      price: "45.5",
    },
  ];
  const sortedProducts = sortProductsByCategory(products);
  loadCategories(sortedProducts);

  const modal = document.getElementById("product-modal");
  const modalBody = document.getElementById("modal-body");
  const closeButton = document.querySelector(".close-button");

  // New code: Function to close the modal
  closeButton.onclick = function () {
    modal.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  // New code: Function to open the modal with product details
  function openModal(product) {
    modalBody.innerHTML = `<h2>${product.model}</h2>
                           <p>Category: ${product.category}</p>
                           <p>Quality: ${product.quality}</p>
                           <p>Material: ${product.material}</p>
                           <p>Price: ${product.price}</p>`;
    modal.style.display = "block";
  }

  const productContainer = document.getElementById("product-container");
  const cartItems = document.getElementById("cart-items");

  function addToCart(product, addButton) {
    const li = document.createElement("li");
    li.id = `cart-item-${product.model.replace(/\s+/g, "-")}`;
    li.textContent = `${product.model} - ${product.price}`;

    const removeButton = document.createElement("span");
    removeButton.innerHTML = "🗑️";
    removeButton.className = "removeButton";
    removeButton.onclick = function () {
      cartItems.removeChild(li);
      calculateSubtotal(); // Recalculate subtotal when an item is removed
    };

    removeButton.onclick = function () {
      cartItems.removeChild(li);
      calculateSubtotal();
      removeFromCart(product.model, addButton); // Update this line
    };

    li.appendChild(removeButton);
    cartItems.appendChild(li);

    calculateSubtotal(); // Calculate subtotal whenever a new item is added
  }

  function removeFromCart(model, addButton) {
    const itemToRemove = document.getElementById(
      `cart-item-${model.replace(/\s+/g, "-")}`
    );
    if (itemToRemove) {
      cartItems.removeChild(itemToRemove);
      calculateSubtotal();
    }
    if (addButton) {
      addButton.innerHTML = "+"; // Change back to plus
    }
  }

  function calculateSubtotal() {
    let subtotal = 0;
    const quantity = document.getElementById("quantity").value;
    const quantityMultiplier =
      quantity === "250+" ? 250 : parseInt(quantity, 10);

    document.querySelectorAll("#cart-items li").forEach((li) => {
      const price = parseFloat(li.textContent.split(" - $")[1]);
      subtotal += price * quantityMultiplier;
    });

    const subtotalElement = document.getElementById("subtotal");
    const pricePerPackElement = document.getElementById("price-per-pack");

    subtotalElement.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
    const pricePerPack = (
      subtotal / (quantityMultiplier === 250 ? 250 : quantityMultiplier)
    ).toFixed(2);
    pricePerPackElement.textContent = `$${pricePerPack}`;
  }

  // Add an event listener to the quantity dropdown
  document
    .getElementById("quantity")
    .addEventListener("change", calculateSubtotal);

  let currentCategory = "";

  sortedProducts.forEach((product) => {
    if (product.category !== currentCategory) {
      const categoryHeader = document.createElement("h2");
      categoryHeader.id = product.category.replace(/\s+/g, "-");
      categoryHeader.textContent = product.category;
      productContainer.appendChild(categoryHeader);
      currentCategory = product.category;
    }

    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `<h3>${product.model}</h3>
                         <p>Price: ${product.price}</p>`;
    //  <span class="addButton">Add to Cart</span>`;
    // <p>Category: ${product.category}</p>
    // <p>Quality: ${product.quality}</p>
    // <p>Material: ${product.material}</p>
    div.onclick = function () {
      openModal(product);
    };

    const addButton = document.createElement("span");
    addButton.innerHTML = "+"; // Plus symbol
    addButton.className = "addButton";
    addButton.style.color = "blue";
    addButton.style.cursor = "pointer";

    addButton.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevents modal from opening
      if (addButton.textContent === "+") {
        addToCart(product, addButton);
        addButton.innerHTML = "✔️"; // Change to check mark
      } else {
        removeFromCart(product.model, addButton);
      }
    });

    div.appendChild(addButton);
    productContainer.appendChild(div);
  });
});
