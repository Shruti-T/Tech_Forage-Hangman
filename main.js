document.getElementById('skipbtn').style.display = 'none';
document.getElementById('submitbtn').style.display = 'none';
document.getElementById('page2_view').style.display = 'none';

var questions = ['what is my name?', 'where do you live?', 'what is your age?', 'where do you work?', 'what are your hobbies?'];
//var hangman_Pics = ['../Tech_Forage-Hangman/Images/man_0.png', '../Tech_Forage-Hangman/Images/man_1.png', '../Tech_Forage-Hangman/Images/man_2.png', '../Tech_Forage-Hangman/Images/man_3.png', '../Tech_Forage-Hangman/Images/man_4.png']

document.getElementById('loginbtn').onclick = function () {
    var Name = document.getElementById('userName').value;
    var Password = document.getElementById('password').value;

    if (Name == '' || Password == '') {
        document.getElementById('loginInstruction').innerHTML = 'Please fill in the details.';
    }
    else {
        mode = 0;
        serialJSON['name'] = Name;
        serialJSON['password'] = Password;

        successful(mode, serialJSON);
    }
    return false;
};


document.getElementById('submitbtn').onclick = function () {
    var Name = document.getElementById('userName').value;
    var Password = document.getElementById('password').value;
    var Answer = document.getElementById('Ans').value.toLowerCase().trim();

    if (Name == '' || Password == '' || Answer == '') {
        document.getElementById('attemptsInstruction').innerHTML = 'Please fill in the details.';
    }
    else {
        document.getElementById('attemptsInstruction').innerHTML = '';
        mode = 1;
        serialJSON['name'] = Name;
        serialJSON['password'] = Password;
        serialJSON['Answer'] = Answer;

        successful(mode, serialJSON);
    }
    console.log(serialJSON);
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
                //document.getElementById('attemptsInstruction').innerHTML = 'wrong credentials';

            }
            else if (res.ReturnedStatus == 1) {
                console.log('correct credentials');
                console.log(res);
                if (mode == 0) {
                    document.getElementById('Que').innerHTML = questions[res.current_question];
                    document.getElementById('loginInstruction').innerHTML = '';
                    document.getElementById('loginbtn').style.display = 'none';
                    document.getElementById('skipbtn').style.display = 'inline';
                    document.getElementById('submitbtn').style.display = 'inline';
                    document.getElementById('page2_view').style.display = 'block';
                    //pic...
                    document.getElementById('hangman_pic').src = `../Tech_Forage-Hangman/Images/man_${res.Attempts}.png`;
                }
                else if (mode == 1) {
                    if (res.Ans_Status == 1) //...correct answer
                    {
                        document.getElementById('Que').innerHTML = questions[res.current_question];
                        document.getElementById('Ans').value = '';
                    }
                    else if (res.Ans_Status == 0)//else if  ..wrong answer
                    {
                        //pic update.
                        document.getElementById('hangman_pic').src = `../Tech_Forage-Hangman/Images/man_${res.Attempts}.png`;
                        document.getElementById('Ans').value = '';

                    }

                    console.log(res);
                }

            }

        },
        error: function (res) {
            console.log('error');
        }
    });
}



