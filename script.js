// 1. Navigation Redirect Simulation Function
function goToPage(pageNum) {
    if (pageNum === 1) {
        alert("Redirecting to Page 1: Home Page...");
    } else if (pageNum === 3) {
        console.log("Already on Page 3: Browse Items View");
    } else if (pageNum === 2) {
        alert("Redirecting to Page 2: Add/Post Item Page...");
    } else if (pageNum === 4) {
        alert("Redirecting to Page 4: Product Detail View...");
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
// ५. NEW: Cart, Delete and Payment System
// ==========================================
let cart = []; // कार्टमा थपिने सामानहरू राख्ने एरे (Array)

// कार्ट बक्स खोल्ने र बन्द गर्ने फङ्सन
function toggleCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.toggle('open');
}

// सामान कार्टमा थप्ने फङ्सन
function addToCart(title, price) {
    // सामानलाई एउटा object बनाएर cart भित्र राख्ने
    cart.push({ id: Date.now(), title: title, price: price });
    
    updateCartUI();
    alert(`"${title}" has been added to your cart!`);
}

// कार्टबाट सामान हटाउने (Delete) फङ्सन
function deleteCartItem(itemId) {
    // मिल्ने ID लाई हटाइदिने
    cart = cart.filter(item => item.id !== itemId);
    updateCartUI();
}

// कार्टको लिस्ट र काउन्टर अपडेट गर्ने फङ्सन
function updateCartUI() {
    // माथि नेभबारको नम्बर अपडेट गर्ने
    document.getElementById('cartBtn').innerHTML = `🛒 Cart (${cart.length})`;
    
    const container = document.getElementById('cartItemsContainer');
    const totalAmountSpan = document.getElementById('cartTotalAmount');
    
    container.innerHTML = ''; // पुरानो लिस्ट सफा गर्ने
    
    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-cart-msg">Your cart is empty.</p>';
        totalAmountSpan.innerText = '0';
        return;
    }
    
    let total = 0;
    
    // कार्टमा भएका सामानहरू पालैपालो विन्डोमा देखाउने
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

// Payment Option छान्ने फङ्सन
function processPayment() {
    if (cart.length === 0) {
        alert("Your cart is empty! Please add items first.");
        return;
    }
    
    // युजरलाई Cash वा Online रोज्न लगाउने prompt
    const option = prompt("Select Payment Method:\nType '1' for Cash on Delivery\nType '2' for Online Payment (eSewa/Khalti)");
    
    if (option === '1') {
        alert("Success! Order placed via Cash on Delivery. Thank you!");
        clearCart();
    } else if (option === '2') {
        alert("Redirecting to Secure Online Payment Gateway (eSewa/Khalti)... Order Placed!");
        clearCart();
    } else {
        alert("Invalid option! Order cancel भयो, कृपया सही विकल्प रोज्नुहोस्।");
    }
}

// अर्डर सफल भएपछि कार्ट सफा गर्ने फङ्सन
function clearCart() {
    cart = [];
    updateCartUI();
    toggleCart(); // कार्ट विन्डो बन्द गर्ने
}