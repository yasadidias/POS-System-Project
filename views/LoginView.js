

const LoginView = {
    getCredentials: function() {
        return {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };
    },

    clearForm: function() {
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    },

    showMessage: function(message) {
        alert(message);
    },

    hide: function() {
        const loginContainer = document.getElementById('login-container');
        if (loginContainer) loginContainer.style.display = 'none';
    }
};