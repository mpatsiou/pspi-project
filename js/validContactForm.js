function validation() {
  empty_comment()
  valid_form()
}

function empty_comment() {
  let comment = document.getElementById("comment")
  if(comment.value == "") {
    border_alert(comment.id)
    message_alert(comment.name, 3)
  }
  else {
    green_border(comment.id)
    delete_message(comment.name, 3)
  }
}

function valid_form() {
  let inputs = (document.getElementsByTagName("input"))
  for (i = 0; i < inputs.length; ++i) {
    if (inputs[i].value == "") {
      border_alert(inputs[i].id)
      message_alert(inputs[i].name, i + 1)
    }
    else {
      green_border(inputs[i].id)
      delete_message(inputs[i].name, i + 1)
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

function init() {
  document.getElementsByClassName("submit")[0].onclick = (validation)
}

window.onload = init
