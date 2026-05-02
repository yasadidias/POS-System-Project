

const LoginController = {
    handleLogin: function() {
        const credentials = LoginView.getCredentials();

        if (!credentials.username || !credentials.password) {
            LoginView.showMessage('Please enter both Username and Password!');
            return;
        }

        if (credentials.username === "yasadi" && credentials.password === "1234") {
            LoginView.showMessage('Login Successful! Welcome to Cuddle Blooms.');
            DashboardController.handleNavigation('dashboard-section');
        } else {
            LoginView.showMessage('Invalid Username or Password! Please try again.');
        }
    }
};