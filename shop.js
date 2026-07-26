const products = [
    {
        name: "Wireless Headphones",
        price: 99,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600"
    },
    {
        name: "Running Shoes",
        price: 120,
        category: "Shoes",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
    },
    {
        name: "Smart Watch",
        price: 180,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600"
    },
    {
        name: "Backpack",
        price: 65,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600"
    }
];

const savedCart = JSON.parse(localStorage.getItem("cart"));
const cart = savedCart || [];

const productsContainer = document.getElementById("products");
const search = document.getElementById("search");
const cartList = document.getElementById("cart");
const total = document.getElementById("total");

function displayProducts(productArray) {

    productsContainer.innerHTML = "";

    productArray.forEach(function(product) {

        productsContainer.innerHTML += `
            <div class="product-card">

                <img src="${product.image}" alt="${product.name}">

                <h3>${product.name}</h3>

                <p>${product.category}</p>

                <p class="price">$${product.price}</p>

                <button class="buy-btn" onclick="addToCart('${product.name}')">
                    Add to Cart
                </button>

            </div>
        `;
    });

}

function addToCart(productName) {

    const product = products.find(function(item) {

        return item.name === productName;

    });

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();

}

function removeFromCart(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();

}

function updateCart() {

    cartList.innerHTML = "";

    let totalPrice = 0;

    cart.forEach(function(product, index) {

        cartList.innerHTML += `
            <li>
                ${product.name} - $${product.price}

                <button onclick="removeFromCart(${index})">
                    Remove
                </button>

            </li>
        `;

        totalPrice += product.price;

    });

    total.textContent = totalPrice;

}

function filterProducts(category) {

    if (category === "All") {

        displayProducts(products);

        return;

    }

    const filtered = products.filter(function(product) {

        return product.category === category;

    });

    displayProducts(filtered);

}

search.addEventListener("input", function() {

    const keyword = search.value.toLowerCase();

    const filteredProducts = products.filter(function(product) {

        return product.name.toLowerCase().includes(keyword);

    });

    displayProducts(filteredProducts);

});

displayProducts(products);

updateCart();