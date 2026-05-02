/**
 * controllers/DashboardController.js
 */

const DashboardController = {
    init: function() {
        this.updateStats();
    },

    updateStats: function() {
        let totalRevenue = 0;
        allOrders.forEach(order => {
            const val = parseFloat(order.total.replace(/[^0-9.-]+/g,""));
            if(!isNaN(val)) totalRevenue += val;
        });

        DashboardView.updateCounts(
            customers.length,
            items.length,
            allOrders.length,
            totalRevenue
        );
    },

    handleNavigation: function(sectionId) {
        DashboardView.showSection(sectionId);
        
        if (sectionId === 'dashboard-section') {
            this.updateStats();
        } else if (sectionId === 'customers-section') {
            CustomerController.init();
        } else if (sectionId === 'items-section') {
            ItemController.init();
        } else if (sectionId === 'orders-section') {
            OrderController.init();
        }
    }
};