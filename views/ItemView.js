

const ItemView = {
    renderTable: function(itemsList, currentPage, itemsPerPage) {
        const tbody = document.getElementById('itemsTableBody');
        if (!tbody) return;
        tbody.innerHTML = '';

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedData = itemsList.slice(startIndex, endIndex);

        if (paginatedData.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 20px;">No items found.</td></tr>';
        } else {
            paginatedData.forEach(item => {
                const row = `
                    <tr>
                        <td>${item.code}</td>
                        <td style="font-weight: 600;">${item.name}</td>
                        <td><span class="badge">${item.category}</span></td>
                        <td>Rs. ${parseFloat(item.sellingPrice).toFixed(2)}</td>
                        <td style="color: ${item.qty < 10 ? 'red' : 'inherit'}; font-weight: bold;">${item.qty}</td>
                        <td>
                            <button class="action-btn action-edit" data-code="${item.code}"><i class="fa-solid fa-pen"></i></button>
                            <button class="action-btn action-delete" data-code="${item.code}"><i class="fa-solid fa-trash"></i></button>
                        </td>
                    </tr>`;
                tbody.innerHTML += row;
            });
        }
        this.updatePaginationInfo(currentPage, itemsList.length, itemsPerPage);
    },

    updatePaginationInfo: function(currentPage, totalItems, itemsPerPage) {
        const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
        const info = document.getElementById('itemsPageInfo');
        if (info) info.innerText = `${currentPage} / ${totalPages}`;
    },

    getFormData: function() {
        return {
            code: document.getElementById('itemCode').value.trim(),
            name: document.getElementById('itemName').value.trim(),
            category: document.getElementById('itemCategory').value,
            buyingPrice: document.getElementById('itemBuyingPrice').value,
            sellingPrice: document.getElementById('itemSellingPrice').value,
            qty: document.getElementById('itemStockQty').value
        };
    },

    setFormData: function(item) {
        document.getElementById('itemCode').value = item.code;
        document.getElementById('itemName').value = item.name;
        document.getElementById('itemCategory').value = item.category;
        document.getElementById('itemBuyingPrice').value = item.buyingPrice;
        document.getElementById('itemSellingPrice').value = item.sellingPrice;
        document.getElementById('itemStockQty').value = item.qty;
    },

    clearForm: function() {
        document.getElementById('itemCode').value = '';
        document.getElementById('itemName').value = '';
        document.getElementById('itemCategory').selectedIndex = 0;
        document.getElementById('itemBuyingPrice').value = '';
        document.getElementById('itemSellingPrice').value = '';
        document.getElementById('itemStockQty').value = '';
    }
};