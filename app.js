/**
 * app.js
 * Main entry point for the application.
 * Initializes controllers and sets up global event listeners.
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("System Initializing...");

    // 1. Initialize Dashboard (which handles stats)
    DashboardController.init();

    // 2. Global Navigation Event Listeners
    setupNavigationListeners();

    // 3. Login Event Listener
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            LoginController.handleLogin();
        });
    }

    // 4. Customer Section Listeners
    setupCustomerListeners();

    // 5. Item Section Listeners
    setupItemListeners();

    // 6. Order Section Listeners
    setupOrderListeners();
});

function setupNavigationListeners() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Find which section this button points to
            const btnText = btn.innerText.toLowerCase().trim();
            let sectionId = '';
            
            if (btnText.includes('dashboard')) sectionId = 'dashboard-section';
            else if (btnText.includes('customers')) sectionId = 'customers-section';
            else if (btnText.includes('items')) sectionId = 'items-section';
            else if (btnText.includes('orders')) sectionId = 'orders-section';
            
            if (sectionId) {
                DashboardController.handleNavigation(sectionId);
            }
        });
    });
}

function setupCustomerListeners() {
    // Search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            CustomerController.search(e.target.value);
        });
    }

    // Table Actions (Edit/Delete) - using delegation
    const tbody = document.getElementById('customersTableBody');
    if (tbody) {
        tbody.addEventListener('click', (e) => {
            const editBtn = e.target.closest('.action-edit');
            const deleteBtn = e.target.closest('.action-delete');
            
            if (editBtn) {
                const id = editBtn.getAttribute('data-id');
                CustomerController.loadDetails(id);
            } else if (deleteBtn) {
                const id = deleteBtn.getAttribute('data-id');
                CustomerController.delete(id);
            }
        });
    }
}

function setupItemListeners() {
    // Search
    const searchInput = document.getElementById('searchItemInput');
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            ItemController.search(e.target.value);
        });
    }

    // Table Actions
    const tbody = document.getElementById('itemsTableBody');
    if (tbody) {
        tbody.addEventListener('click', (e) => {
            const editBtn = e.target.closest('.action-edit');
            const deleteBtn = e.target.closest('.action-delete');
            
            if (editBtn) {
                const code = editBtn.getAttribute('data-code');
                ItemController.loadDetails(code);
            } else if (deleteBtn) {
                const code = deleteBtn.getAttribute('data-code');
                ItemController.delete(code);
            }
        });
    }
}

function setupOrderListeners() {
    // Customer Search
    const searchCust = document.getElementById('searchCustId');
    if (searchCust) {
        searchCust.addEventListener('input', (e) => {
            OrderController.searchCustomer(e.target.value);
        });
    }

    // Item Search
    const searchItem = document.getElementById('searchItemCode');
    if (searchItem) {
        searchItem.addEventListener('input', (e) => {
            OrderController.searchItem(e.target.value);
        });
    }

    // Qty adjustments
    const qtyInput = document.getElementById('orderItemQty');
    const qtyPlus = document.getElementById('qtyPlus');
    const qtyMinus = document.getElementById('qtyMinus');

    if (qtyPlus) {
        qtyPlus.onclick = () => {
            qtyInput.value = parseInt(qtyInput.value) + 1;
        };
    }
    if (qtyMinus) {
        qtyMinus.onclick = () => {
            if(parseInt(qtyInput.value) > 1) qtyInput.value = parseInt(qtyInput.value) - 1;
        };
    }

    // Cart Actions (Delete)
    const cartBody = document.getElementById('cartTableBody');
    if (cartBody) {
        cartBody.addEventListener('click', (e) => {
            const deleteBtn = e.target.closest('.action-delete');
            if (deleteBtn) {
                const index = deleteBtn.getAttribute('data-index');
                OrderController.removeFromCart(index);
            }
        });
    }

    // Buttons
    const btnAddToCart = document.getElementById('btnAddToCart');
    if (btnAddToCart) {
        btnAddToCart.onclick = () => OrderController.addToCart();
    }

    const btnPlaceOrder = document.getElementById('btnPlaceOrder');
    if (btnPlaceOrder) {
        btnPlaceOrder.onclick = () => OrderController.placeOrder();
    }
}

// Global scope functions for HTML onclick attributes if any are left
window.registerCustomer = () => CustomerController.register();
window.updateCustomer = () => CustomerController.update();
window.clearCustomerForm = () => CustomerView.clearForm();
window.nextCustomerPage = () => CustomerController.nextPage();
window.previousCustomerPage = () => CustomerController.previousPage();

window.addItem = () => ItemController.add();
window.updateItem = () => ItemController.update();
window.deleteItem = (code) => ItemController.delete(code);
window.clearItemForm = () => ItemView.clearForm();
window.nextItemPage = () => ItemController.nextPage();
window.previousItemPage = () => ItemController.previousPage();

window.showSection = (sectionId) => DashboardController.handleNavigation(sectionId);