const products = [
    { id: 'E12345', name: 'iPhone 13 Pro qoplamasi', price: 200000, image: './img/iphone-case.jpg', category: 'Elektronika' },
    { id: 'E67890', name: '20000mAh Power Bank', price: 350000, image: './img/power-bank.jpg', category: 'Elektronika' },
    { id: 'E67891', name: 'Naushnik', price: 135000, image: './img/headphone.jpeg', category: 'Elektronika' },
    { id: 'H13579', name: 'LED Yoritgich', price: 150000, image: './img/led-lamp.jpg', category: 'Uy va Ofis' },
    { id: 'H13580', name: 'Dron', price: 15000, image: './img/drone.jpg', category: 'Uy va Ofis' },
    { id: 'M24680', name: 'Smart Soat', price: 800000, image: './img/smart-watch.png', category: 'Moda' },
    { id: 'S35791', name: 'Ko\'zoynak', price: 180000, image: './img/kozoynak.jpg', category: 'Sport' },
    { id: 'B46802', name: 'Atir', price: 120000, image: './img/atir.jpg', category: 'Go\'zallik' },
];

const productGrid = document.getElementById('productGrid');
const categoryButtons = document.getElementById('categoryButtons');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const closeModal = document.getElementsByClassName('close')[0];
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');

let cart = [];

function displayProducts(productsToShow = products) {
    productGrid.innerHTML = '';
    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-id">#${product.id}</p>
                <p class="product-price">${product.price.toLocaleString()} so'm</p>
                <button class="add-to-cart" onclick="addToCart('${product.id}')">Savatga qo'shish</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

function createCategoryButtons() {
    const categories = ['Hammasi', ...new Set(products.map(product => product.category))];
    categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category;
        button.addEventListener('click', () => filterByCategory(category));
        categoryButtons.appendChild(button);
    });
}

function filterByCategory(category) {
    const buttons = categoryButtons.getElementsByTagName('button');
    for (let button of buttons) {
        button.classList.remove('active');
        if (button.textContent === category) {
            button.classList.add('active');
        }
    }
    
    const filteredProducts = category === 'Hammasi' ? 
        products : 
        products.filter(product => product.category === category);
    displayProducts(filteredProducts);
}

function searchProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.id.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCart();
    }
}

function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>${item.name} x ${item.quantity}</span>
            <span>${(item.price * item.quantity).toLocaleString()} so'm</span>
        `;
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    });
    cartTotal.textContent = total.toLocaleString();
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

searchButton.addEventListener('click', searchProducts);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        searchProducts();
    }
});

cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target == cartModal) {
        cartModal.style.display = 'none';
    }
});

window.addEventListener('load', () => {
    displayProducts();
    createCategoryButtons();
});