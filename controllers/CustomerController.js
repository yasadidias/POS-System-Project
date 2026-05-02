/**
 * controllers/CustomerController.js
 */

const CustomerController = {
    currentPage: 1,
    itemsPerPage: 5,
    selectedCustomerId: null,
    filteredData: [],

    init: function() {
        this.filteredData = [...customers];
        this.updateView();
    },

    updateView: function() {
        CustomerView.renderTable(this.filteredData, this.currentPage, this.itemsPerPage);
    },

    register: function() {
        const formData = CustomerView.getFormData();
        if (!formData.name || !formData.contact || !formData.address) {
            alert('Validation Error: All fields are required!');
            return;
        }

        const newId = 'C00' + (customers.length + 1);
        const newCustomer = {
            id: newId,
            name: formData.name,
            contact: formData.contact,
            address: formData.address
        };
        
        customers.push(newCustomer);
        this.filteredData = [...customers];
        this.updateView();
        CustomerView.clearForm();
        DashboardController.updateStats();
        alert('Success: New customer has been registered.');
    },

    loadDetails: function(id) {
        const customer = customers.find(c => c.id === id);
        if (customer) {
            this.selectedCustomerId = id;
            CustomerView.setFormData(customer);
        }
    },

    update: function() {
        if (!this.selectedCustomerId) {
            alert('Selection Error: Please select a customer first!');
            return;
        }

        const formData = CustomerView.getFormData();
        const index = customers.findIndex(c => c.id === this.selectedCustomerId);
        
        if (index !== -1) {
            customers[index].name = formData.name;
            customers[index].contact = formData.contact;
            customers[index].address = formData.address;
            
            this.filteredData = [...customers];
            this.updateView();
            CustomerView.clearForm();
            this.selectedCustomerId = null;
            alert('Success: Customer information updated.');
        }
    },

    delete: function(id) {
        if (confirm('Security Warning: Are you sure you want to delete?')) {
            const index = customers.findIndex(c => c.id === id);
            if (index !== -1) {
                customers.splice(index, 1);
                this.filteredData = [...customers];
                this.updateView();
                DashboardController.updateStats();
            }
        }
    },

    search: function(term) {
        const lowerTerm = term.toLowerCase();
        this.filteredData = customers.filter(c => 
            c.id.toLowerCase().includes(lowerTerm) || 
            c.name.toLowerCase().includes(lowerTerm)
        );
        this.currentPage = 1;
        this.updateView();
    },

    nextPage: function() {
        const totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
        if (this.currentPage < totalPages) {
            this.currentPage++;
            this.updateView();
        }
    },

    previousPage: function() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.updateView();
        }
    }
};