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

        // If all validations pass, submit the form
        loginForm.submit();
    });

    // Get the registration form
    const registrationForm = document.getElementById('registration-form');

    // Add event listener for form submission
    registrationForm.addEventListener('submit', function(event) {
        // Prevent the default form submission
        event.preventDefault();

        // Validate first name
        const firstNameInput = document.getElementById('firstNameInput');
        const firstNameValue = firstNameInput.value.trim();
        if (!isValidName(firstNameValue)) {
            displayError('Invalid first name');
            return;
        }

        // Validate last name
        const lastNameInput = document.getElementById('lastNameInput');
        const lastNameValue = lastNameInput.value.trim();
        if (!isValidName(lastNameValue)) {
            displayError('Invalid last name');
            return;
        }

        // Validate usern name
        const userNameInput = document.getElementById('usernameInput');
        const userNameValue = userNameInput.value.trim();
        if (!isValidName(userNameValue)) {
            displayError('Invalid user name');
            return;
        }

        // Validate email address
        const emailInput = document.getElementById('emailAddressInput');
        const emailValue = emailInput.value.trim();
        if (!isValidEmail(emailValue)) {
            displayError('Invalid email address');
            return;
        }

        // Validate password
        const passwordInput = document.getElementById('passwordInput');
        const passwordValue = passwordInput.value;
        if (!isValidPassword(passwordValue)) {
            displayError('Invalid password');
            return;
        }

        // Validate confirm password
        const confirmPasswordInput = document.getElementById('confirmPasswordInput');
        const confirmPasswordValue = confirmPasswordInput.value;
        
        if (passwordValue !== confirmPasswordValue) {
            displayError('Passwords do not match');
            return;
        }

        // Validate role dropdown
        const roleInput = document.getElementById('roleInput');
        const roleValue = roleInput.value;
        if (roleValue !== 'admin' && roleValue !== 'user') {
            displayError('Invalid role');
            return;
        }

        // If all validations pass, submit the form
        registrationForm.submit();
    });

   

    // Function to validate email address
    function isValidEmail(email) {
        // Implement your email validation logic here
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Function to validate name
    function isValidName(name) {
        // Implement your name validation logic here
        return /^[a-zA-Z]+$/.test(name);
    }

    // Function to validate password
    function isValidPassword(password) {
        // Implement your password validation logic here
        // Check password length and complexity
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    }

    // Function to display error message
    function displayError(message) {
        // Display the error message on the page
        const errorDiv = document.getElementById('error-message');
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }
});
