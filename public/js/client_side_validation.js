// In this file, you must perform all client-side validation for every single form input (and the role dropdown) on your pages. The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. If the form being submitted has all valid data, then you will allow it to submit to the server for processing. Don't forget to check that password and confirm password match on the registration form!
// client_side_validation.js

document.addEventListener('DOMContentLoaded', function() {
    // Get the login form
    const loginForm = document.getElementById('login-form');

    // Add event listener for form submission
    loginForm.addEventListener('submit', function(event) {
        // Prevent the default form submission
        event.preventDefault();

        // Validate the email address
        const emailInput = document.getElementById('emailAddressInput');
        const emailValue = emailInput.value.trim();
        if (!isValidEmail(emailValue)) {
            displayError('Invalid email address');
            return;
        }

        // Validate the password
        const passwordInput = document.getElementById('passwordInput');
        const passwordValue = passwordInput.value;
        if (!isValidPassword(passwordValue)) {
            displayError('Invalid password');
            return;
        }

     
        loginForm.submit();
    });

    
    const registrationForm = document.getElementById('registration-form');

    
    registrationForm.addEventListener('submit', function(event) {
        
        event.preventDefault();

        
        const firstNameInput = document.getElementById('firstNameInput');
        const firstNameValue = firstNameInput.value.trim();
        if (!isValidName(firstNameValue)) {
            displayError('Invalid first name');
            return;
        }

        
        const lastNameInput = document.getElementById('lastNameInput');
        const lastNameValue = lastNameInput.value.trim();
        if (!isValidName(lastNameValue)) {
            displayError('Invalid last name');
            return;
        }

       
        const userNameInput = document.getElementById('usernameInput');
        const userNameValue = userNameInput.value.trim();
        if (!isValidName(userNameValue)) {
            displayError('Invalid user name');
            return;
        }

        
        const emailInput = document.getElementById('emailAddressInput');
        const emailValue = emailInput.value.trim();
        if (!isValidEmail(emailValue)) {
            displayError('Invalid email address');
            return;
        }

        
        const passwordInput = document.getElementById('passwordInput');
        const passwordValue = passwordInput.value;
        if (!isValidPassword(passwordValue)) {
            displayError('Invalid password');
            return;
        }

        
        const confirmPasswordInput = document.getElementById('confirmPasswordInput');
        const confirmPasswordValue = confirmPasswordInput.value;
        
        if (passwordValue !== confirmPasswordValue) {
            displayError('Passwords do not match');
            return;
        }

        
        const roleInput = document.getElementById('roleInput');
        const roleValue = roleInput.value;
        if (roleValue !== 'admin' && roleValue !== 'user') {
            displayError('Invalid role');
            return;
        }

        
        registrationForm.submit();
    });

   

    
    function isValidEmail(email) {
        
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    
    function isValidName(name) {
      
        return /^[a-zA-Z]+$/.test(name);
    }

   
    function isValidPassword(password) {
        
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    }

    
    function displayError(message) {
        
        const errorDiv = document.getElementById('error-message');
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }
});