// Sample product data
const products = [
    { id: 1, name: 'iPhone 14', price: 999, rating: 4.5, img: 'https://via.placeholder.com/300x300?text=iPhone' },
    { id: 2, name: 'Samsung TV', price: 599, rating: 4.2, img: 'https://via.placeholder.com/300x300?text=TV' },
    { id: 3, name: 'Nike Shoes', price: 120, rating: 4.8, img: 'https://via.placeholder.com/300x300?text=Shoes' },
    { id: 4, name: 'Dell Laptop', price: 899, rating: 4.3, img: 'https://via.placeholder.com/300x300?text=Laptop' },
    { id: 5, name: 'T-Shirt', price: 25, rating: 4.0, img: 'https://via.placeholder.com/300x300?text=T-Shirt' },
    { id: 6, name: 'Sofa', price: 450, rating: 4.1, img: 'https://via.placeholder.com/300x300?text=Sofa' }
];

// Load products
function loadProducts(sortBy = 'price-low') {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    let sortedProducts = [...products];
    if (sortBy === 'price-low') sortedProducts.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') sortedProducts.sort((a, b) => b.price - a.price);
    else sortedProducts.sort((a, b) => b.rating - a.rating);

    sortedProducts.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price} | Rating: ${product.rating}⭐</p>
            <button onclick="quickView(${product.id})">Quick View</button>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel img');
function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}
document.querySelector('.next').addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
});
document.querySelector('.prev').addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
});
setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}, 5000);

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert('Added to cart!');
}

// Quick View Modal
function quickView(id) {
    const product = products.find(p => p.id === id);
    document.getElementById('modal-img').src = product.img;
    document.getElementById('modal-title').textContent = product.name;
    document.getElementById('modal-price').textContent = `$${product.price}`;
    document.getElementById('modal').style.display = 'block';
    document.getElementById('add-to-cart-modal').onclick = () => addToCart(id);
}
document.querySelector('.close').onclick = () => document.getElementById('modal').style.display = 'none';

// Sort
document.getElementById('sort').addEventListener('change', (e) => loadProducts(e.target.value));

// Search
document.getElementById('search-btn').addEventListener('click', () => {
    const query = document.getElementById('search').value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(query));
    // For simplicity, just alert; in real app, filter display
    alert(`Found ${filtered.length} products matching "${query}"`);
});

// Initialize
loadProducts();
updateCartCount();