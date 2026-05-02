/**
 * controllers/ItemController.js
 */

const ItemController = {
    currentPage: 1,
    itemsPerPage: 5,
    selectedItemCode: null,
    filteredData: [],

    init: function() {
        this.filteredData = [...items];
        this.updateView();
    },

    updateView: function() {
        ItemView.renderTable(this.filteredData, this.currentPage, this.itemsPerPage);
    },

    add: function() {
        const formData = ItemView.getFormData();
        if (!formData.code || !formData.name || !formData.category || !formData.buyingPrice || !formData.sellingPrice || !formData.qty) {
            alert('Validation Error: Provide all item specifications!');
            return;
        }

        const existingItem = items.find(i => i.code === formData.code);
        if (existingItem) {
            alert('Error: Item code already exists.');
            return;
        }

        const newItem = {
            code: formData.code,
            name: formData.name,
            category: formData.category,
            buyingPrice: parseFloat(formData.buyingPrice),
            sellingPrice: parseFloat(formData.sellingPrice),
            qty: parseInt(formData.qty)
        };

        items.push(newItem);
        this.filteredData = [...items];
        this.updateView();
        ItemView.clearForm();
        DashboardController.updateStats();
        alert('Success: Item added.');
    },

    loadDetails: function(code) {
        const item = items.find(i => i.code === code);
        if (item) {
            this.selectedItemCode = code;
            ItemView.setFormData(item);
        }
    },

    update: function() {
        const formData = ItemView.getFormData();
        const index = items.findIndex(i => i.code === formData.code);

        if (index !== -1) {
            items[index] = {
                code: formData.code,
                name: formData.name,
                category: formData.category,
                buyingPrice: parseFloat(formData.buyingPrice),
                sellingPrice: parseFloat(formData.sellingPrice),
                qty: parseInt(formData.qty)
            };
            this.filteredData = [...items];
            this.updateView();
            ItemView.clearForm();
            alert('Success: Item updated!');
        } else {
            alert('Error: Ensure an item is selected.');
        }
    },

    delete: function(code) {
        if (confirm('Are you sure you want to delete?')) {
            const index = items.findIndex(i => i.code === code);
            if (index !== -1) {
                items.splice(index, 1);
                this.filteredData = [...items];
                this.updateView();
                DashboardController.updateStats();
            }
        }
    },

    search: function(term) {
        const lowerTerm = term.toLowerCase();
        this.filteredData = items.filter(item => 
            item.code.toLowerCase().includes(lowerTerm) || 
            item.name.toLowerCase().includes(lowerTerm)
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