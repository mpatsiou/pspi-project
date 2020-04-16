function valid_form() {
    let form_inputs = (document.getElementsByClassName("form-inputs")[0])
    let inputs = (form_inputs.getElementsByTagName("input"))
    for (i = 0; i < inputs.length; ++i) {
      if (inputs[i].value == "") {
      }
    }
}
function check_password() {
  if (document.getElementById("signup-password") != document.getElementById("signup-password-confirm")) {
    return false
  }
  return true
}

function init() {
  document.getElementsByClassName("sumbit")[0].onclick = (valid_form)
  document.getElementsByClassName("sumbit")[0].onclick = (check_password)

}

window.onload = init
