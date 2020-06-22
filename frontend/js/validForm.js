$(() => {
    const login = $(".login-form submit")[0]
    if (login) {
        $(login).click(async () => {
            validateLoginForm()
            if (hasErrors()) {
                console.log(hasErrors())
                return
            }

            const values = {}
            const inputs = $('.login-form input')
            inputs.each(function () {
                values[this.name] = $(this).val()
            })

            try {
                const res = await axios.post('http://localhost:3000/session', values)
                const { sid, user } = res.data
                console.log(sid, user)
                window.sessionStorage.setItem("sid", sid)
                window.sessionStorage.setItem("user", JSON.stringify(user))

                window.location = "./home.html";
                console.log(values)
            }
            catch (e) {
                alert('Wrong username/password')
                return
            }
        })
    }

    const register = $(".register-form submit")[0]
    if (register) {
        $(register).click(async () => {
            validateRegisterForm()
            if (hasErrors()) {
                console.log(hasErrors())
                return
            }

            const values = {}
            const inputs = $('.register-form input');
            inputs.each(function () {
                values[this.name] = $(this).val()
            });

            const res = await axios.post('http://localhost:3000/user', values)

            if (!res.status == 200) {
                alert('error')
                return
            }

            const { sid, user } = res.data
            window.sessionStorage.setItem("sid", sid)
            window.sessionStorage.setItem("user", JSON.stringify(user))

            window.location = "./home.html";
        })
    }

    const contact_form = $("form submit")[0]
    if (contact_form) {
        $(contact_form).click(validateContactForm)
    }
})

const hasErrors = () => $('.invalid-feedback').length > 0

// Register form validation
const validateRegisterForm = () => {
    flushErrors()
    validateEmptyInputs()
    validateEmail()

    // Validate password
    input = $('input[type="password"]')
    if (input[0].value != input[1].value) {
        // alert('errroorororo')
        genError(input[0], 'Passwords do not match')
    }
}

// Login form validation
const validateLoginForm = () => {
    flushErrors()
    validateEmptyInputs()
    validateEmail()
}

// Contact form validation
const validateContactForm = () => {
    flushErrors()
    validateEmptyInputs()
    validateEmail()
    validateTextarea()
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
    //Email regular expression
    let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/

    if (!regex.test(input.val())) {
        genError(input, 'Email is invalid')
    }
}

// Generate error by adding is-invalid class and generating adding error div
const genError = (input, error) => {
    //Return if error already exists
    if ($(input).next().hasClass('invalid-feedback')) {
        return
    }

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

const validateTextarea = () => {
    let text = $('textarea')[0]
    const isEmpty = text => text && text.value && text.value.length == 0
    if (isEmpty(text)) {
        genError(text, "Fill the above")
    }
}
