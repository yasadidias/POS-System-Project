/**
 * views/CustomerView.js
 */

const CustomerView = {
    // Render the table with paginated data
    renderTable: function(customersList, currentPage, itemsPerPage) {
        const tbody = document.getElementById('customersTableBody');
        if (!tbody) return;
        tbody.innerHTML = '';

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedData = customersList.slice(startIndex, endIndex);

        if (paginatedData.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 20px;">No customers available to display.</td></tr>';
        } else {
            paginatedData.forEach(customer => {
                const row = `
                    <tr>
                        <td>${customer.id}</td>
                        <td>${customer.name}</td>
                        <td>${customer.contact}</td>
                        <td>${customer.address}</td>
                        <td>
                            <button class="action-btn action-edit" title="Edit" data-id="${customer.id}">
                                <i class="fa-solid fa-pen"></i>
                            </button>
                            <button class="action-btn action-delete" title="Delete" data-id="${customer.id}">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </td>
                    </tr>`;
                tbody.innerHTML += row;
            });
        }
        this.updatePaginationInfo(currentPage, customersList.length, itemsPerPage);
    },

    updatePaginationInfo: function(currentPage, totalItems, itemsPerPage) {
        const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
        const info = document.getElementById('pageInfo');
        if (info) info.innerText = `${currentPage} / ${totalPages}`;
    },

    getFormData: function() {
        return {
            id: document.getElementById('customerId').value,
            name: document.getElementById('customerName').value.trim(),
            contact: document.getElementById('customerContact').value.trim(),
            address: document.getElementById('customerAddress').value.trim()
        };
    },

    setFormData: function(customer) {
        document.getElementById('customerId').value = customer.id;
        document.getElementById('customerName').value = customer.name;
        document.getElementById('customerContact').value = customer.contact;
        document.getElementById('customerAddress').value = customer.address;
    },

    clearForm: function() {
        document.getElementById('customerId').value = '';
        document.getElementById('customerName').value = '';
        document.getElementById('customerContact').value = '';
        document.getElementById('customerAddress').value = '';
    }
};