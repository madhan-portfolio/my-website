'use strict';

// ── DATA ─────────────────────────────────────────────
const PRODUCTS = [
  {id:1,name:"iPhone 16 Pro Max",price:134900,img:"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-blacktitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1726770829919"},
  {id:2,name:"iPhone 16 Pro",price:119900,img:"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-deserttitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1726770829399"},
  {id:3,name:"iPhone 16 Plus",price:89900,img:"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-7inch-ultramarine?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1726770833108"}
];

// ── STATE ───────────────────────────────────────────
let cart = JSON.parse(localStorage.getItem('em_cart') || '[]');
let favorites = JSON.parse(localStorage.getItem('em_favorites') || '[]');

// ── DOM REFERENCES ─────────────────────────────────
const productsGrid = document.getElementById('productsGrid');
const favoritesGrid = document.getElementById('favoritesGrid');
const cartGrid = document.getElementById('cartGrid');
const cartBadge = document.getElementById('cartBadge');
const toast = document.getElementById('toast');

// ── INIT ──────────────────────────────────────────
function init() {
  renderProducts();
  updateCartBadge();
}
init();

// ── RENDER PRODUCTS ────────────────────────────────
function renderProducts() {
  if (!productsGrid) return;
  productsGrid.innerHTML = '';
  PRODUCTS.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product-card';
    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}" class="product-img">
      <div class="product-name">${p.name}</div>
      <div class="product-price">₹${p.price.toLocaleString('en-IN')}</div>
      <button onclick="toggleFavorite(${p.id})">${favorites.includes(p.id) ? '❤️' : '♡'}</button>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    productsGrid.appendChild(div);
  });
}

// ── FAVORITES ─────────────────────────────────────
function renderFavorites() {
  if (!favoritesGrid) return;
  favoritesGrid.innerHTML = '';
  const favProducts = PRODUCTS.filter(p => favorites.includes(p.id));
  if (favProducts.length === 0) {
    favoritesGrid.innerHTML = '<p>No favorites yet</p>';
    return;
  }
  favProducts.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product-card';
    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}" class="product-img">
      <div class="product-name">${p.name}</div>
      <div class="product-price">₹${p.price.toLocaleString('en-IN')}</div>
      <button onclick="removeFavorite(${p.id})">Remove ❤️</button>
    `;
    favoritesGrid.appendChild(div);
  });
}

window.toggleFavorite = function(id) {
  if (favorites.includes(id)) favorites = favorites.filter(f => f !== id);
  else favorites.push(id);
  localStorage.setItem('em_favorites', JSON.stringify(favorites));
  renderProducts();
  renderFavorites();
};

window.removeFavorite = function(id) {
  favorites = favorites.filter(f => f !== id);
  localStorage.setItem('em_favorites', JSON.stringify(favorites));
  renderProducts();
  renderFavorites();
};

// ── CART ──────────────────────────────────────────
function addToCart(id) {
  const existing = cart.find(i => i.id === id);
  if (existing) existing.qty += 1;
  else cart.push({id, qty:1});
  localStorage.setItem('em_cart', JSON.stringify(cart));
  updateCartBadge();
  renderCart();
  showToast("Added to cart!");
}

function renderCart() {
  if (!cartGrid) return;
  cartGrid.innerHTML = '';
  if (cart.length === 0) {
    cartGrid.innerHTML = '<p>Cart is empty</p>';
    return;
  }
  cart.forEach(i => {
    const product = PRODUCTS.find(p => p.id === i.id);
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div>${product.name} × ${i.qty}</div>
      <div>₹${(product.price*i.qty).toLocaleString('en-IN')}</div>
      <button onclick="removeFromCart(${i.id})">Remove</button>
    `;
    cartGrid.appendChild(div);
  });
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  localStorage.setItem('em_cart', JSON.stringify(cart));
  updateCartBadge();
  renderCart();
  showToast("Removed from cart!");
}

function updateCartBadge() {
  if (!cartBadge) return;
  const total = cart.reduce((sum,i)=>sum+i.qty,0);
  cartBadge.textContent = total;
}

// ── TOAST ─────────────────────────────────────────
function showToast(msg) {
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'), 2000);
}
