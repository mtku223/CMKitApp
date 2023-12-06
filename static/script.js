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

const screenprintPricing = {
  0: [0, 0, 0, 0, 0, 0, 0, 0], // No colors
  1: [2.1, 1.74, 1.55, 1.43, 1.33, 1.13, 0.9, 0.82],
  2: [2.8, 2.17, 1.86, 1.72, 1.59, 1.33, 1.03, 0.93],
  3: [3.29, 2.61, 2.27, 2.09, 1.83, 1.46, 1.21, 1.09],
  4: [3.63, 2.96, 2.59, 2.39, 2.01, 1.49, 1.29, 1.19],
  5: [3.75, 3.24, 2.81, 2.58, 2.16, 1.66, 1.38, 1.28],
  6: [9.09, 3.5, 3.05, 2.79, 2.34, 1.84, 1.51, 1.36],
  7: [9.8, 3.52, 3.38, 3.1, 2.62, 2.13, 1.8, 1.64],
  8: [10.36, 3.87, 4.06, 3.73, 3.2, 2.68, 2.43, 2.25],
};

const embroideryPricing = {
  0: [0],
  1: [6.47],
  2: [5.68],
  3: [5.28],
  4: [4.84],
};

function calculateEmbroideryPrice(product, quantity) {
  let priceBracket;
  if (quantity < 25) {
    priceBracket = 0;
  } else if (quantity <= 60) {
    priceBracket = 1;
  } else if (quantity <= 120) {
    priceBracket = 2;
  } else if (quantity <= 249) {
    priceBracket = 3;
  } else {
    priceBracket = 4;
  }

  const embroideryUnitPrice = embroideryPricing[priceBracket][0];
  const totalCost = (product.price + embroideryUnitPrice) * quantity;
  return totalCost;
}

const totalEmbroideryCost = calculateEmbroideryPrice(selectedProduct, 30); // For 30 items
console.log("Total Embroidery Cost:", totalEmbroideryCost);

document.addEventListener("DOMContentLoaded", function () {
  // Products data from the CSV file
  const products = [
    {
      model: "Port and Co - CP77",
      imageLink: "https://cdnp.sanmar.com/medias/sys_master/images/images/...",
      colors: [
        "Black",
        "Carolina Blue",
        "Hunter",
        "Khaki",
        "Light Pink",
        "...",
      ],
      skuNumber: "CP77",
      category: "Dad hat",
      priceStructure: "Embroidery",
      brand: "Port and Co",
      material: "100% Cotton Unstructured",
      price: "3.19",
      notes: "Our best selling and cheapest Domestic dad hat",
      pricing: embroideryPricing,
    },
    {
      model: "New Era - 201",
      imageLink:
        "https://cdnp.sanmar.com/medias/sys_master/images/images/hb3/hf3/14189339017246/337W-null.jpg",
      colors: ["Black", "Deep Navy", "Graphite", "Stone", "White"],
      skuNumber: "201",
      category: "Dad hat",
      priceStructure: "Embroidery",
      brand: "New Era",
      material: "100% Cotton Unstructured",
      price: "6.99",
      notes: "Name brand dad hat that people trust",
      pricing: embroideryPricing,
    },
    {
      model: "Yupoong - 6245PT - dad hat",
      imageLink: "https://cdn.ssactivewear.com/Images/Style/5646_fm.jpg",
      colors: [
        "White",
        "Black",
        "Diamond Blue",
        "Light Grey",
        "Loden",
        "Maroon",
        "Yellow",
      ],
      skuNumber: "6245pt",
      category: "Dad hat",
      priceStructure: "Embroidery",
      brand: "Yupoong",
      material: "100% Cotton Unstructured",
      price: "5.4",
      notes:
        "Medium Quality Dad hat that illustrates difference between 3 levels",
      pricing: embroideryPricing,
    },
    {
      model: "Tultex - 202",
      imageLink: "https://cdn.ssactivewear.com/Images/Color/100890_f_fm.jpg",
      colors: [],
      skuNumber: "202",
      category: "Shirt 100% cotton",
      priceStructure: "Screenprint",
      brand: "Tultex",
      material: "100% cotton",
      price: "2.62",
      notes:
        "One of Cheapest Middle Tier choices - Tubular shirt - Good quality for price",
      pricing: screenprintPricing,
    },
    {
      model: "Journal Book - 3443 - Notebook",
      imageLink:
        "https://assets.pcna.com/t_560,q_auto/Images/SM-3443BK_D_FR_4046.jpg",
      colors: ["Black", "Red", "Blue"],
      skuNumber: "3443",
      category: "Notebooks",
      priceStructure: "Table",
      brand: "Journal Books",
      material: "",
      price: "0",
      notes: "Included because it is $3",
      tablePricing: {
        35: 5.5,
        50: 5.5,
        100: 5.5,
        150: 3.52,
        250: 3.52,
        350: 3.52,
      },
    },
    {
      model: "Bullet - 6946 - Faye Vaccuum tumbler",
      imageLink: "Faye 20oz Vacuum Tumbler w/ SS Straw | PCNA",
      colors: ["Black", "Navy", "White"],
      skuNumber: "6946",
      category: "Water Bottles",
      priceStructure: "table",
      brand: "Bullet",
      material: "Aluminum",
      price: "0",
      notes:
        "Bullit Line Vacuum option - Bullet is lowest quality brand at PCNA - Chosen to show the quality of PCNA low Tier options",
      tablePricing: {
        35: 14.46,
        50: 14.46,
        100: 14.46,
        150: 14.46,
        250: 14.46,
        350: 13.86,
      },
    },
    {
      model: "Marine Layer - MSC1",
      imageLink:
        "https://www.marinelayer.com/cdn/shop/products/MSC1-FN_Front_-thumb_700x.jpg?v=1570749038",
      colors: ["White", "Black", "Blue"],
      skuNumber: "MSC1",
      category: "Shirt blend",
      priceStructure: "Screenprint",
      brand: "Sanmar",
      material: "50% Cotton / 50% Micromodal)",
      price: "39.0",
      notes: "", // Empty notes
      tablePricing: screenprintPricing,
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
    // Create category headers
    if (product.category !== currentCategory) {
      const categoryHeader = document.createElement("h2");
      categoryHeader.id = product.category.replace(/\s+/g, "-");
      categoryHeader.textContent = product.category;
      productContainer.appendChild(categoryHeader);
      currentCategory = product.category;
    }

    // Create product cards
    const div = document.createElement("div");
    div.className = "product";

    // Default image link and checks for colors and price
    const imageLink = product.imageLink || "path/to/default-image.jpg"; // Default image if missing
    const colors = Array.isArray(product.colors)
      ? product.colors.join(", ")
      : "N/A";
    const price = product.price || "0.00";

    div.innerHTML = `
        <h3>${product.model}</h3>
        <img src="${imageLink}" alt="${product.model} image" onerror="this.onerror=null;this.src='path/to/default-image.jpg';">
        <p>Colors: ${colors}</p>
        <p>Price: $${price}</p>`;

    div.onclick = function () {
      openModal(product);
    };

    // Append product card to the container
    productContainer.appendChild(div);
  });

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

  div.appendChild(addButton); // Ensure addButton is appended within the loop
});
