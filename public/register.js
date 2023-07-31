

function validate_password() {

    var pass = document.getElementById('password').value;
    var confirm_pass = document.getElementById('repeatPassword').value;
    if (pass != confirm_pass) {
        document.getElementById('wrong_pass_alert').style.color = 'red';
        document.getElementById('wrong_pass_alert').innerHTML
        = 'incorrect password';
        document.getElementById('create').disabled = true;
        document.getElementById('create').style.opacity = (0.4);
    } else {
        document.getElementById('wrong_pass_alert').style.color = 'green';
        document.getElementById('wrong_pass_alert').innerHTML =
            'Password Matched';
        document.getElementById('create').disabled = false;
        document.getElementById('create').style.opacity = (1);
    }
}

function wrong_pass_alert() {
    if (document.getElementById('password').value != "" &&
        document.getElementById('repeatPassword').value != "") {
        alert("Your response is submitted");
    } else {
        alert("Please fill all the fields");
    }
}