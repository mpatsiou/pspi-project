$(() => {
  const login = $(".signin-form submit")[0]
  if (login) {
    $(login).click(validateLoginForm)
  }

  const register = $(".signup-form submit")[0]
  if (register) {
    $(register).click(validateRegisterForm)
  }
})

// Register form validation
const validateRegisterForm = () => {
  flushErrors()
  validateEmptyInputs()
  validateEmail()

  // Validate password
  input = $('input[type="password"]')
  if (input[0].value != input[1].value) {
    genError(input[1], 'Passwords do not match')
  }
}

// Login form validation
const validateLoginForm = () => {
  flushErrors()
  validateEmptyInputs()
  validateEmail()
}

/** 
 * Helper functions
 */

// Error on empty inputs
const validateEmptyInputs = () => {
  const isEmpty = input => input.value.length == 0

  for (const input of $('input')) {
      if (isEmpty(input)) {
        genError(input, 'Fill the above')
      }
  }
}

// Validate email
const validateEmail = () => {
  let input = $('input[name="email"]')
  let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/

  if (!regex.test(input.val())) {
    genError(input, 'Email is invalid')
  }
}

// Generate error by adding is-invalid class and generating adding error div
const genError = (input, error) => {
  //Return if error already exists
  if ($(input).next().hasClass('invalid-feedback'))
    return

  $(input).addClass('is-invalid')
  $(input).after(`<div class="invalid-feedback">${error}</div>`)
}

// Remove errors
const flushErrors = () => {
  for (const input of $('input')) {
    $(input).removeClass('is-invalid')
    $('.invalid-feedback').remove()
  }
}