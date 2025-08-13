// Get the form
const form = document.getElementById('signupForm');
const inputs = form.querySelectorAll('input');
const successMessage = document.getElementById('success-message');

// Function to show an error message 
function showError(input, message) {
  const error = input.nextElementSibling; // assumes error message is in a <span> right after the input
  error.textContent = message;
  input.classList.add('invalid'); // apply red border or similar styling
}

// Function to clear the error message 
function clearError(input) {
  const error = input.nextElementSibling;
  error.textContent = '';
  input.classList.remove('invalid');
}

// Function to validate a single input
function validateInput(input) {
  const value = input.value.trim(); // remove spaces
  const type = input.getAttribute('type');
  const name = input.getAttribute('name');

  // 1. Check if field is empty
  if (!value) {
    return showError(input, `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`);
  }

  // 2. Validate email format and domain
  if (type === 'email') {
    const validEmail = /^[^\s@]+@(gmail\.com|hotmail\.com|yahoo\.com|outlook\.com)$/i;
    if (!validEmail.test(value)) {
      return showError(input, 'Enter a valid email ending with @gmail.com, @hotmail.com, etc.');
    }
  }

  // 3. Validate phone number (exactly 8 digits)
  if (name === 'phone') {
    if (!/^\d{8}$/.test(value)) {
      return showError(input, 'Phone number must be exactly 8 digits.');
    }
  }

  // 4. Validate password strength
  if (name === 'password') {
    const rules = [
      { regex: /.{8,}/, message: 'at least 8 characters' },
      { regex: /[A-Z]/, message: 'an uppercase letter' },
      { regex: /[a-z]/, message: 'a lowercase letter' },
      { regex: /\d/, message: 'a digit' },
      { regex: /[!@#$&*]/, message: 'a special character (!,@,#,$,&,*)' },
    ];

    const failed = rules.filter(rule => !rule.regex.test(value));
    if (failed.length > 0) {
      const messages = failed.map(rule => rule.message);
      return showError(input, `Password must contain ${messages.join(', ')}.`);
    }
  }

  // clear any previous messages
  clearError(input);
}

// When user clicks on an input field
inputs.forEach((input) => {
  input.addEventListener('blur', () => validateInput(input)); // validate when leaving input
  input.addEventListener('focus', () => clearError(input));   // clear error on focus
});

// When user submits the form
form.addEventListener('submit', (e) => {
  e.preventDefault(); // prevent default form submission
  let isValid = true;

  // Validate all inputs
  inputs.forEach((input) => {
    validateInput(input);
    if (input.classList.contains('invalid')) {
      isValid = false;
    }
  });

  // Show success message if all fields are valid
  if (isValid) {
    successMessage.textContent = 'Form submitted successfully!';
    form.reset(); // clear form fields
  } else {
    successMessage.textContent = ''; // no success message if errors
  }
});
