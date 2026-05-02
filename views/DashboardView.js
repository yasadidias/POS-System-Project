

const DashboardView = {
    updateCounts: function(customerCount, itemCount, orderCount, revenue) {
        const totalCustElem = document.getElementById('dash-total-customers');
        if (totalCustElem) totalCustElem.innerText = customerCount;

        const totalItemElem = document.getElementById('dash-total-items');
        if (totalItemElem) totalItemElem.innerText = itemCount;

        const totalOrderElem = document.getElementById('dash-total-orders');
        if (totalOrderElem) totalOrderElem.innerText = orderCount;

        const revenueElem = document.getElementById('dash-total-revenue');
        if (revenueElem) revenueElem.innerText = `Rs. ${revenue.toLocaleString()}`;
    },

    showSection: function(sectionId) {
        document.querySelectorAll('.dashboard-wrapper').forEach(div => {
            div.style.display = 'none';
        });
        const loginContainer = document.getElementById('login-container');
        if (loginContainer) loginContainer.style.display = 'none';

        const target = document.getElementById(sectionId);
        if (target) {
            target.style.display = 'flex';
        }

        
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
            let btnText = btn.innerText.toLowerCase().trim();
            let sectionPrefix = sectionId.split('-')[0];
            if(btnText === sectionPrefix) btn.classList.add('active');
        });
    }
};