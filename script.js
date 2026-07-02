// 1. Navigation Redirect Simulation Function (Alerts Removed)
function goToPage(pageNum) {
    if (pageNum === 1) {
        console.log("Redirecting to Page 1: Home Page...");
    } else if (pageNum === 3) {
        console.log("Already on Page 3: Browse Items View");
    } else if (pageNum === 2) {
        console.log("Redirecting to Page 2: Add/Post Item Page...");
    } else if (pageNum === 4) {
        console.log("Redirecting to Page 4: Product Detail View...");
    }
}

// 2. Heart/Wishlist Button Toggle
function toggleWishlist(btn) {
    btn.classList.toggle('active');
    if (btn.classList.contains('active')) {
        btn.innerHTML = '♥';
    } else {
        btn.innerHTML = '♡';
    }
}

// 3. Dynamic Category, Condition & Price Multi-Filter Feature
function applyFilters() {
    const category = document.getElementById('categoryFilter').value;
    const condition = document.getElementById('conditionFilter').value;
    const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;

    const cards = document.querySelectorAll('.product-card');

    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const cardCondition = card.getAttribute('data-condition');
        const cardPrice = parseFloat(card.getAttribute('data-price'));

        const matchCategory = (category === 'all' || cardCategory === category);
        const matchCondition = (condition === 'all' || cardCondition === condition);
        const matchPrice = (cardPrice >= minPrice && cardPrice <= maxPrice);

        if (matchCategory && matchCondition && matchPrice) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// 4. Products List Sorting Mechanics
function sortItems() {
    const sortBy = document.getElementById('sortSelect').value;
    const grid = document.getElementById('productsGrid');
    const cards = Array.from(grid.querySelectorAll('.product-card'));

    cards.sort((a, b) => {
        const priceA = parseFloat(a.getAttribute('data-price'));
        const priceB = parseFloat(b.getAttribute('data-price'));

        if (sortBy === 'price-low') {
            return priceA - priceB;
        } else if (sortBy === 'price-high') {
            return priceB - priceA;
        } else {
            return 0;
        }
    });

    cards.forEach(card => grid.appendChild(card));
}

// ==========================================
// ५. NO POP-UP: Cart, Delete and Payment System
// ==========================================
let cart = [];

// कार्ट बक्स खोल्ने र बन्द गर्ने फङ्सन
function toggleCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.toggle('open');
    // स्टेटस म्यासेज क्लियर गर्ने जब कार्ट खोलिन्छ/बन्द गरिन्छ
    document.getElementById('orderStatusMessage').innerText = '';
}

// सामान कार्टमा थप्ने (No Alert Pop-up)
function addToCart(title, price) {
    cart.push({ id: Date.now() + Math.random(), title: title, price: price });
    updateCartUI();
}

// कार्टबाट सामान हटाउने
function deleteCartItem(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartUI();
}

// कार्ट UI अपडेट गर्ने
function updateCartUI() {
    document.getElementById('cartBtn').innerHTML = `🛒 Cart (${cart.length})`;
    
    const container = document.getElementById('cartItemsContainer');
    const totalAmountSpan = document.getElementById('cartTotalAmount');
    
    container.innerHTML = '';
    
    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-cart-msg">Your cart is empty.</p>';
        totalAmountSpan.innerText = '0';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        total += item.price;
        
        const itemRow = document.createElement('div');
        itemRow.classList.add('cart-item');
        itemRow.innerHTML = `
            <div class="cart-item-info">
                <span class="cart-item-title">${item.title}</span>
                <span class="cart-item-price">Rs. ${item.price.toLocaleString()}</span>
            </div>
            <button class="delete-item-btn" onclick="deleteCartItem(${item.id})">🗑️</button>
        `;
        container.appendChild(itemRow);
    });
    
    totalAmountSpan.innerText = total.toLocaleString();
}

// पेमेन्ट प्रोसेस गर्ने फङ्सन (बटन थिच्दा सिधै म्यासेज देखाउने, No Prompts)
function processPayment(method) {
    const statusMsg = document.getElementById('orderStatusMessage');
    
    if (cart.length === 0) {
        statusMsg.style.color = "red";
        statusMsg.innerText = "Cart is empty! Please add items first.";
        return;
    }
    
    statusMsg.style.color = "green";
    if (method === 'COD') {
        statusMsg.innerText = "Success! Ordered via Cash on Delivery.";
    } else if (method === 'ONLINE') {
        statusMsg.innerText = "Redirecting to Online Gateway... Order Placed!";
    }
    
    // २ सेकेन्ड पछि कार्ट खाली गरेर विन्डो बन्द गर्ने
    setTimeout(() => {
        cart = [];
        updateCartUI();
        toggleCart();
    }, 2000);
}