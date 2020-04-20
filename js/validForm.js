function valid_form() {
  let inputs = (document.getElementsByTagName("input"))
  for (i = 0; i < inputs.length; ++i) {
    if (inputs[i].value == "") {
      border_alert(inputs[i].id)
      message_alert(inputs[i].name, i + 1)
    }
    else if (inputs[i].value != ""){
      if (inputs[i].name == "password-confirm" ||  inputs[i].name == "password" ) {
        if (!check_password()) {
          border_alert(inputs[i].id)
          var id = '#message'+ (i + 1)
          $(id).html('Passwords not matched').css('color', 'red');
        }
        else {
          delete_message(inputs[i].name, i + 1)
          green_border(inputs[i].id)
        }
      }
      else {
        delete_message(inputs[i].name, i + 1)
        green_border(inputs[i].id)
      }
    }
  }
}

function border_alert(input_id) {
  var id = "#" + input_id
  $(id).css("border-color", "red")
}

function message_alert(input_name, i) {
  var id = "#message" + i
  $(id).html("Please enter your " + input_name).css('color', 'red')
}

function green_border(input_id) {
  id = "#" + input_id
  $(id).css("border-color", "green")
}

function delete_message(input_name, i) {
  var id = "#message" + i
  $(id).empty()
}


function check_password() {
  var password1 = document.getElementById("signup-password")
  var password2 = document.getElementById("signup-password-confirm")
  if (password1.value != password2.value) {
    return false
  }
  return true
}

function init() {
  document.getElementsByClassName("submit")[0].onclick = (valid_form)

}

window.onload = init
