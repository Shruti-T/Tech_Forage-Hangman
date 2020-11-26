document.getElementById('skipbtn').style.display = 'none';
document.getElementById('submitbtn').style.display = 'none';
document.getElementById('page2_view').style.display = 'none';

var questions = ['what is my name?', 'where do you live?', 'what is your age?', 'where do you work?', 'what are your hobbies?'];


document.getElementById('loginbtn').onclick = function () {

    mode = 0;
    serialJSON['name'] = document.getElementById('userName').value;
    serialJSON['password'] = document.getElementById('password').value;

    successful(mode, serialJSON);
    return false;
};

document.getElementById('submitbtn').onclick = function () {
    console.log('works');
    mode = 1;
    serialJSON['name'] = document.getElementById('userName').value;
    serialJSON['password'] = document.getElementById('password').value;
    serialJSON['Answer'] = document.getElementById('Ans').value;

    successful(mode, serialJSON);

    return false;
}


var serialJSON = {};
var mode;

function successful(mode) {

    serialJSON['mode'] = mode;
    console.log(serialJSON);

    $.ajax({
        url: "https://script.google.com/macros/s/AKfycbxaAS7i8roOove79HVNrCiPn_4ZQ-4JCrAXsptqH35l4W_7HRwE/exec",
        type: 'POST',
        data: serialJSON,

        success: function (res) {

            if (res.ReturnedStatus == 0) {
                console.log(res);
                //document.getElementById('skipbtn').style.display = 'block';
                console.log('wrong credentials');
                document.getElementById('loginInstruction').innerHTML = 'wrong credentials';
            }
            else {
                console.log('correct credentials');
                console.log(res);
                document.getElementById('loginInstruction').innerHTML = '';
                document.getElementById('loginbtn').style.display = 'none';
                document.getElementById('skipbtn').style.display = 'inline';
                document.getElementById('submitbtn').style.display = 'inline';
                document.getElementById('page2_view').style.display = 'block';
            }

        },
        error: function (res) {
            console.log('error');
        }
    });
}



