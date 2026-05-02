/**
 * controllers/OrderController.js
 */

const OrderController = {
    selectedCustomer: null,
    selectedItem: null,

    init: function() {
        OrderView.renderHistory(allOrders);
        this.generateNextOrderId();
    },

    generateNextOrderId: function() {
        if (allOrders.length === 0) {
            OrderView.setOrderId("O001");
            return;
        }

        const lastOrderId = allOrders[allOrders.length - 1].orderId;
        const lastIdNum = parseInt(lastOrderId.substring(1));
        const nextIdNum = lastIdNum + 1;
        const nextOrderId = "O" + nextIdNum.toString().padStart(3, '0');
        
        OrderView.setOrderId(nextOrderId);
    },

    searchCustomer: function(id) {
        const customer = customers.find(c => c.id === id.trim());
        this.selectedCustomer = customer;
        OrderView.setCustomerInfo(customer);
    },

    searchItem: function(code) {
        const item = items.find(i => i.code === code.trim());
        this.selectedItem = item;
        OrderView.setItemInfo(item);
    },

    addToCart: function() {
        const qtyInput = document.getElementById('orderItemQty').value;
        const qty = parseInt(qtyInput);

        if (!this.selectedItem) {
            alert('Selection Missing: Please provide a valid Item Code!');
            return;
        }

        if (isNaN(qty) || qty <= 0) {
            alert('Input Error: Please enter a valid quantity!');
            return;
        }

        if (qty > this.selectedItem.qty) {
            alert(`Stock Error: Only ${this.selectedItem.qty} units available.`);
            return;
        }

        const price = parseFloat(this.selectedItem.sellingPrice);
        const total = price * qty;

        const existingIndex = cartItems.findIndex(item => item.code === this.selectedItem.code);
        
        if (existingIndex !== -1) {
            const newQty = cartItems[existingIndex].qty + qty;
            if(newQty > this.selectedItem.qty) {
                alert('Stock limit reached for this item in cart!');
                return;
            }
            cartItems[existingIndex].qty = newQty;
            cartItems[existingIndex].total = newQty * price;
        } else {
            cartItems.push({
                code: this.selectedItem.code,
                name: this.selectedItem.name,
                price: price,
                qty: qty,
                total: total
            });
        }

        OrderView.renderCart(cartItems);
        OrderView.clearOrderFields();
        this.selectedItem = null;
    },

    removeFromCart: function(index) {
        cartItems.splice(index, 1);
        OrderView.renderCart(cartItems);
    },

    placeOrder: function() {
        const orderId = document.getElementById('orderIdDisplay').value;
        const custName = document.getElementById('orderCustName').value;
        const netTotalText = document.getElementById('netTotal').innerText;
        
        if (cartItems.length === 0) {
            alert("Cart Empty: Please add products first.");
            return;
        }

        if (!custName) {
            alert("Customer Missing: Select a customer.");
            return;
        }

        // 1. Stock Update
        cartItems.forEach(cartItem => {
            const originalItem = items.find(i => i.code === cartItem.code);
            if (originalItem) {
                originalItem.qty -= cartItem.qty;
            }
        });

        // 2. Add to History
        const newOrder = {
            orderId: orderId,
            customerName: custName,
            date: new Date().toLocaleDateString(),
            total: netTotalText
        };

        allOrders.push(newOrder);
        
        // 3. UI Update
        OrderView.renderHistory(allOrders);
        DashboardController.updateStats();
        alert(`Success: Order ${orderId} placed.`);

        cartItems.length = 0; // Clear the array
        OrderView.clearAfterOrder();
        this.generateNextOrderId();
    }
};