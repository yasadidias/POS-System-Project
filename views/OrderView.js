/**
 * views/OrderView.js
 */

const OrderView = {
    renderCart: function(cartItems) {
        const tbody = document.getElementById('cartTableBody'); 
        if (!tbody) return;
        
        tbody.innerHTML = '';
        let grandTotal = 0;

        cartItems.forEach((item, index) => {
            grandTotal += item.total; 
            
            const row = `
                <tr>
                    <td style="padding: 10px;">${item.name}</td>
                    <td style="text-align: center;">${item.price.toFixed(2)}</td>
                    <td style="text-align: center;">${item.qty}</td>
                    <td style="text-align: right; font-weight: bold;">${item.total.toFixed(2)}</td>
                    <td style="text-align: center;">
                        <button class="action-btn action-delete" data-index="${index}">
                            <i class="fa-solid fa-circle-xmark"></i>
                        </button>
                    </td>
                </tr>`;
            tbody.innerHTML += row;
        });

        const netTotalElem = document.getElementById('netTotal');
        if (netTotalElem) {
            netTotalElem.innerText = `LKR ${grandTotal.toFixed(2)}`;
        }
    },

    renderHistory: function(allOrders) {
        const tbody = document.getElementById('allOrdersTableBody');
        if (!tbody) return;
        tbody.innerHTML = '';

        allOrders.forEach(order => {
            const row = `
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${order.orderId}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${order.customerName}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${order.date}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right; font-weight: bold; color: #C71585;">${order.total}</td>
                </tr>`;
            tbody.innerHTML += row;
        });
    },

    setCustomerInfo: function(customer) {
        const nameFld = document.getElementById('orderCustName');
        const contactFld = document.getElementById('orderCustContact');
        if (customer) {
            if(nameFld) nameFld.value = customer.name;
            if(contactFld) contactFld.value = customer.contact;
        } else {
            if(nameFld) nameFld.value = "";
            if(contactFld) contactFld.value = "";
        }
    },

    setItemInfo: function(item) {
        const nameFld = document.getElementById('orderItemName');
        const priceFld = document.getElementById('orderItemPrice');
        if (item) {
            if(nameFld) nameFld.value = item.name;
            if(priceFld) priceFld.value = item.sellingPrice;
        } else {
            if(nameFld) nameFld.value = "";
            if(priceFld) priceFld.value = "";
        }
    },

    setOrderId: function(orderId) {
        const orderIdField = document.getElementById('orderIdDisplay');
        if (orderIdField) orderIdField.value = orderId;
    },

    clearOrderFields: function() {
        document.getElementById('searchItemCode').value = '';
        document.getElementById('orderItemName').value = '';
        document.getElementById('orderItemPrice').value = '';
        document.getElementById('orderItemQty').value = '1';
    },

    clearAfterOrder: function() {
        this.renderCart([]);
        document.getElementById('searchCustId').value = '';
        document.getElementById('orderCustName').value = '';
        document.getElementById('orderCustContact').value = '';
    }
};