// 1. Navigation Redirect Simulation Function
function goToPage(pageNum) {
    if (pageNum === 1) {
        alert("Redirecting to Page 1: Home Page...");
        // Timro dynamic single page app haina bhane mathi yo line halna milxa:
        // window.location.href = "index.html";
    } else if (pageNum === 3) {
        console.log("Already on Page 3: Browse Items View");
    } else if (pageNum === 2) {
        alert("Redirecting to Page 2: Add/Post Item Page...");
        // window.location.href = "add_item.html";
    } else if (pageNum === 4) {
        alert("Redirecting to Page 4: Product Detail View...");
    }
}

// 2. Heart/Wishlist Button Toggle (Change Color and Icon Shape)
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

    // Grid vitra ko sabai product cards taneko
    const cards = document.querySelectorAll('.product-card');

    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const cardCondition = card.getAttribute('data-condition');
        const cardPrice = parseFloat(card.getAttribute('data-price'));

        // Logic check conditions matching filters
        const matchCategory = (category === 'all' || cardCategory === category);
        const matchCondition = (condition === 'all' || cardCondition === condition);
        const matchPrice = (cardPrice >= minPrice && cardPrice <= maxPrice);

        // Display check toggling via CSS inline block model
        if (matchCategory && matchCondition && matchPrice) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// 4. Products List Sorting Mechanics (Low to High / High to Low)
function sortItems() {
    const sortBy = document.getElementById('sortSelect').value;
    const grid = document.getElementById('productsGrid');
    const cards = Array.from(grid.querySelectorAll('.product-card'));

    cards.sort((a, b) => {
        const priceA = parseFloat(a.getAttribute('data-price'));
        const priceB = parseFloat(b.getAttribute('data-price'));

        if (sortBy === 'price-low') {
            return priceA - priceB; // ascending sorting
        } else if (sortBy === 'price-high') {
            return priceB - priceA; // descending sorting
        } else {
            return 0; // standard sorting / unchanged order
        }
    });

    // Re-appending dynamically elements back to clear previous hierarchy positions
    cards.forEach(card => grid.appendChild(card));
}