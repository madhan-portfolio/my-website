/* ==============================
   EVOLVE MOBILES — script.js
   ============================== */

'use strict';

// ── iPhone Products Data ──────────────────────────────────────────
const PRODUCTS = [
  {
    id: 1, name: 'iPhone 16 Pro Max', color: 'Black Titanium',
    price: 134900, original: 159900,
    tag: 'new', tagLabel: 'New',
    img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-blacktitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1726770829919',
    specs: ['6.9" Super Retina XDR', 'A18 Pro Chip', '48MP ProRAW Camera', '256GB Storage']
  },
  {
    id: 2, name: 'iPhone 16 Pro', color: 'Desert Titanium',
    price: 119900, original: 139900,
    tag: 'new', tagLabel: 'New',
    img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-deserttitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1726770829399',
    specs: ['6.3" Super Retina XDR', 'A18 Pro Chip', 'ProRes Video', '128GB Storage']
  },
  {
    id: 3, name: 'iPhone 16 Plus', color: 'Ultramarine',
    price: 89900, original: 99900,
    tag: 'hot', tagLabel: 'Hot',
    img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-7inch-ultramarine?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1726770833108',
    specs: ['6.7" OLED Display', 'A18 Chip', '48MP Fusion Camera', '128GB Storage']
  },
  {
    id: 4, name: 'iPhone 16', color: 'Teal',
    price: 79900, original: 89900,
    tag: 'best', tagLabel: 'Best Buy',
    img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-teal?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1726770832650',
    specs: ['6.1" OLED Display', 'A18 Chip', 'Camera Control Button', '128GB Storage']
  },
  {
    id: 5, name: 'iPhone 15 Pro Max', color: 'Blue Titanium',
    price: 109900, original: 134900,
    tag: 'sale', tagLabel: 'Sale',
    img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-bluetitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1693009865090',
    specs: ['6.7" ProMotion XDR', 'A17 Pro Chip', '48MP Triple Camera', '256GB Storage']
  },
  {
    id: 6, name: 'iPhone 15 Pro', color: 'Natural Titanium',
    price: 99900, original: 119900,
    tag: 'sale', tagLabel: 'Sale',
    img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923711438',
    specs: ['6.1" ProMotion XDR', 'A17 Pro Chip', 'Titanium Design', '128GB Storage']
  },
  {
    id: 7, name: 'iPhone 15 Plus', color: 'Pink',
    price: 74900, original: 89900,
    tag: 'sale', tagLabel: 'Sale',
    img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-plus-finish-select-202309-6-7inch-pink?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923711462',
    specs: ['6.7" Super Retina XDR', 'A16 Bionic Chip', '48MP Main Camera', '128GB Storage']
  },
  {
    id: 8, name: 'iPhone 15', color: 'Midnight',
    price: 64900, original: 79900,
    tag: 'sale', tagLabel: 'Sale',
    img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-black?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923711456',
    specs: ['6.1" Super Retina XDR', 'A16 Bionic Chip', 'Dynamic Island', '128GB Storage']
  },
  {
    id: 9, name: 'iPhone 14 Pro Max', color: 'Deep Purple',
    price: 89900, original: 129900,
    tag: 'sale', tagLabel: 'Great Deal',
    img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-7inch-deeppurple?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1663703841896',
    specs: ['6.7" ProMotion OLED', 'A16 Bionic Chip', '48MP ProRAW Camera', '256GB Storage']
  },
  {
    id: 10, name: 'iPhone SE (3rd Gen)', color: 'Midnight',
    price: 49900, original: 59900,
    tag: 'best', tagLabel: 'Value Pick',
    img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-se-finish-select-202203-midnight_AV1?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1646100086324',
    specs: ['4.7" Retina HD', 'A15 Bionic Chip', '12MP Camera', '64GB Storage']
  }
];

// ── State ─────────────────────────────────────────────────────────
let cart = JSON.parse(localStorage.getItem('em_cart') || '[]');
let currentSection = 'home';
let favorites = JSON.parse(localStorage.getItem('em_favorites') || '[]');

// ── DOM Refs ──────────────────────────────────────────────────────
const navBtns      = document.querySelectorAll('.nav-btn[data-section]');
const cartBadge    = document.getElementById('cartBadge');
const toast        = document.getElementById('toast');
const hamburger    = document.getElementById('hamburger');
const navList      = document.querySelector('.nav-list');
const cartItemsWrap = document.getElementById('cartItemsWrap');
const cartEmpty    = document.getElementById('cartEmpty');
const cartList     = document.getElementById('cartList');
const summarySubtotal = document.getElementById('summarySubtotal');
const summaryTotal    = document.getElementById('summaryTotal');
const checkoutBtn  = document.getElementById('checkoutBtn');
const header       = document.getElementById('header');

// ── Init ──────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartBadge();
  bindNav();
  bindHamburger();
  bindContactForm();
  bindCheckout();
  bindScroll();
  showSection(currentSection, true);
});

// ── Navigation ────────────────────────────────────────────────────
function bindNav() {
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const sec = btn.dataset.section;
      showSection(sec);
      closeMobileMenu();
    });
  });
}

function showSection(name, instant = false) {
  // Hide all sections
  document.querySelectorAll('.section').forEach(s => {
    s.classList.remove('active');
  });

  // Show target
  const target = document.getElementById('section-' + name);
  if (!target) return;

  currentSection = name;
  if (instant) {
    target.style.animationDuration = '0s';
  }
  target.classList.add('active');
  if (instant) {
    setTimeout(() => target.style.animationDuration = '', 10);
  }

   if(name === 'favorites'){
renderFavorites();
}

  // Update nav active state
  navBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.section === name);
  });

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Re-render cart when switching to it
  if (name === 'cart') renderCart();
}

// Make available globally (used by onclick in HTML)
window.showSection = showSection;

// ── Mobile Menu ───────────────────────────────────────────────────
function bindHamburger() {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navList.classList.toggle('open');
  });
}
function closeMobileMenu() {
  hamburger.classList.remove('open');
  navList.classList.remove('open');
}

// ── Header scroll effect ──────────────────────────────────────────
function bindScroll() {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// ── Render Products ───────────────────────────────────────────────
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = PRODUCTS.map(p => `
    <div class="product-card" data-id="${p.id}">
      <div class="product-img-wrap">
  <button class="fav-btn ${favorites.includes(p.id) ? 'active' : ''}" onclick="toggleFavorite(${p.id})">
${favorites.includes(p.id) ? '❤️' : '♡'}
</button>
        <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x300/141416/8B5CF6?text=${encodeURIComponent(p.name)}'"/>
        <span class="product-tag tag-${p.tag}">${p.tagLabel}</span>
      </div>
      <div class="product-body">
        <div>
          <div class="product-name">${p.name}</div>
          <div class="product-color">${p.color}</div>
        </div>
        <div class="product-prices">
          <span class="price-current">₹${p.price.toLocaleString('en-IN')}</span>
          <span class="price-original">₹${p.original.toLocaleString('en-IN')}</span>
        </div>
        <ul class="product-specs">
          ${p.specs.map(s => `<li>${s}</li>`).join('')}
        </ul>
      </div>
      <div class="product-footer">
        <div class="product-buttons">

<button class="add-to-cart-btn" data-id="${p.id}">
Add to Cart
</button>

<button class="buy-now-btn" onclick="buyNow(${p.id})">
Buy Now
</button>

</div>
      </div>
    </div>
  `).join('');
}

  // Bind add-to-cart buttons
  grid.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      addToCart(id, btn);
    });
  });
}

function renderFavorites(){

const grid = document.getElementById("favoritesGrid");

const favProducts = PRODUCTS.filter(p=>favorites.includes(p.id));

if(favProducts.length===0){
grid.innerHTML="<p>No favorites yet</p>";
return;
}

grid.innerHTML = favProducts.map(p=>`

<div class="product-card">

<div class="product-img-wrap">
<img src="${p.img}">
</div>

<div class="product-body">
<div class="product-name">${p.name}</div>

<div class="price-current">
₹${p.price.toLocaleString('en-IN')}
</div>

</div>

</div>

`).join("");

}

   



// ── Cart Logic ────────────────────────────────────────────────────
function addToCart(id, btn) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, qty: 1 });
  }

  persistCart();
  updateCartBadge();
  showToast(`${product.name} added to cart ✓`);

  // Button feedback
  btn.textContent = 'Added ✓';
  btn.classList.add('added');
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Add to Cart';
    btn.classList.remove('added');
    btn.disabled = false;
  }, 2000);
}

function updateCartBadge() {
  const total = cart.reduce((sum, i) => sum + i.qty, 0);
  cartBadge.textContent = total;
  cartBadge.style.background = total > 0 ? '' : 'rgba(139,92,246,0.4)';
}

function persistCart() {
  localStorage.setItem('em_cart', JSON.stringify(cart));
}

function renderCart() {
  const items = cart.map(i => {
    const p = PRODUCTS.find(p => p.id === i.id);
    return p ? { ...p, qty: i.qty } : null;
  }).filter(Boolean);

  if (items.length === 0) {
    cartEmpty.style.display = 'flex';
    cartList.innerHTML = '';
    document.getElementById('cartSummary').style.opacity = '0.4';
    document.getElementById('cartSummary').style.pointerEvents = 'none';
    summarySubtotal.textContent = '₹0';
    summaryTotal.textContent = '₹0';
    return;
  }

  cartEmpty.style.display = 'none';
  document.getElementById('cartSummary').style.opacity = '1';
  document.getElementById('cartSummary').style.pointerEvents = 'all';

  cartList.innerHTML = items.map(item => `
    <div class="cart-item-row" data-row="${item.id}">
      <img class="cart-item-img" src="${item.img}"
        alt="${item.name}"
        onerror="this.src='https://via.placeholder.com/80x80/141416/8B5CF6?text=iPhone'"/>
      <div>
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
          <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      </div>
    </div>
  `).join('');

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  summarySubtotal.textContent = '₹' + subtotal.toLocaleString('en-IN');
  summaryTotal.textContent    = '₹' + subtotal.toLocaleString('en-IN');
}

window.changeQty = function(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  persistCart();
  updateCartBadge();
  renderCart();
};

window.removeFromCart = function(id) {
  cart = cart.filter(i => i.id !== id);
  persistCart();
  updateCartBadge();
  renderCart();
  showToast('Item removed from cart');

};
window.toggleFavorite = function(id){

if(favorites.includes(id)){
favorites = favorites.filter(f=>f!==id);
showToast("Removed from favorites");
}else{
favorites.push(id);
showToast("Added to favorites ❤️");
}

localStorage.setItem("em_favorites",JSON.stringify(favorites));
renderProducts();

};
window.buyNow = function(id){

cart = [{id:id,qty:1}];

persistCart();
updateCartBadge();

showSection("cart");

};
document.getElementById("checkoutForm").addEventListener("submit",function(e){

e.preventDefault();

showToast("Order placed successfully 🎉");

cart=[];
persistCart();
updateCartBadge();

showSection("home");

});


// ── Checkout ──────────────────────────────────────────────────────
function bindCheckout() {
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) return;
    showSection("checkout");
  });
}

// ── Contact Form ──────────────────────────────────────────────────
function bindContactForm() {
  document.getElementById('contactForm').addEventListener('submit', e => {
    e.preventDefault();
    showToast('Message sent! We\'ll reply within 24hrs ✓');
    e.target.reset();
  });
}

// ── Toast ─────────────────────────────────────────────────────────
let toastTimer;
function showToast(msg) {
  clearTimeout(toastTimer);
  toast.textContent = msg;
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}
