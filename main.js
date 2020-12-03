document.getElementById('skipbtn').style.display = 'none';
document.getElementById('submitbtn').style.display = 'none';
document.getElementById('page2_view').style.display = 'none';

var questions = ['what is my name?', 'where do you live?', 'what is your age?', 'where do you work?', 'what are your hobbies?'];

//Checking if input string is empty or not for mode 0.
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

//checking input of answers for mode 1.
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
    return false;
}

//for mode 3.
document.getElementById('skipbtn').onclick = function () {
    var Name = document.getElementById('userName').value;
    var Password = document.getElementById('password').value;

    if (Name == '' || Password == '') {
        document.getElementById('loginInstruction').innerHTML = 'Please fill in the details.';
    }
    else {
        mode = 2;
        serialJSON['name'] = Name;
        serialJSON['password'] = Password;

        successful(mode, serialJSON);
    }
    return false;
}

//post request.
var serialJSON = {};
var mode;

function successful(mode) {

    serialJSON['mode'] = mode;

    $.ajax({
        url: "https://script.google.com/macros/s/AKfycbxaAS7i8roOove79HVNrCiPn_4ZQ-4JCrAXsptqH35l4W_7HRwE/exec",
        type: 'POST',
        data: serialJSON,

        success: function (res) {

            //Wrong username and password.
            if (res.ReturnedStatus == 0) {
                document.getElementById('loginInstruction').innerHTML = 'wrong credentials';
            }

            //correct username and password.
            else if (res.ReturnedStatus == 1) {
                if (mode == 0) {
                    //if already played and won
                    if (res.WinStatus == 1) {
                        window.location.replace('Final-pg.html');
                    }
                    //if already played and lost.
                    else if (res.Attempts >= 5) {
                        window.location.replace('Final-pg.html');
                    }
                    //to start/continue playing. 
                    else {
                        document.getElementById('Que').innerHTML = questions[res.current_question];

                        document.getElementById('attemptsInstruction').innerHTML = `${res.Attempts} no.of attempts used out of 5.`;

                        document.getElementById('loginbtn').style.display = 'none';
                        document.getElementById('skipbtn').style.display = 'inline';
                        document.getElementById('submitbtn').style.display = 'inline';
                        document.getElementById('page2_view').style.display = 'block';

                        document.getElementById('hangman_pic').src = `../Tech_Forage-Hangman/Images/man_${res.Attempts}.png`;

                        if (res.SkipStatus == 1) {
                            document.getElementById('skipbtn').style.display = 'none';
                            document.getElementById('Ans').value = '';
                        }
                        else if (res.Attempts == 4) {
                            document.getElementById('skipbtn').style.display = 'none';
                            document.getElementById('attemptsInstruction').innerHTML = `${res.Attempts} no.of attempts used out of 5.`;
                            document.getElementById('Ans').value = '';
                        }
                    }
                }

                else if (mode == 1) {
                    if (res.Attempts == 4) {
                        document.getElementById('skipbtn').style.display = 'none';
                        document.getElementById('attemptsInstruction').innerHTML = `${res.Attempts} no.of attempts used out of 5.`;
                        document.getElementById('Ans').value = '';
                    }
                    //correct answer
                    if (res.Ans_Status == 1) {
                        if (res.WinStatus == 1 || res.current_question == 5) {
                            window.location.replace('Final-pg.html');
                            //alert('You have clered the round!');
                        }
                        else {
                            document.getElementById('Que').innerHTML = questions[res.current_question];
                            document.getElementById('Ans').value = '';
                            document.getElementById('attemptsInstruction').innerHTML = `${res.Attempts} no.of attempts used out of 5.`;

                        }
                    }
                    //else if  ..wrong answer
                    else if (res.Ans_Status == 0) {
                        if (res.Attempts >= 5) {
                            window.location.replace('Final-pg.html');
                        }
                        //pic update.
                        else {
                            document.getElementById('hangman_pic').src = `../Tech_Forage-Hangman/Images/man_${res.Attempts}.png`;
                            document.getElementById('Ans').value = '';
                            document.getElementById('attemptsInstruction').innerHTML = `${res.Attempts} no.of attempts used out of 5.`;
                        }
                    }
                }

                else if (mode == 2) {
                    if (res.Attempts == 4) {
                        document.getElementById('skipbtn').style.display = 'none';
                    }
                    else if (res.WinStatus == 1) {
                        window.location.replace('Final-pg.html');
                    }
                    else if (res.SkipStatus == 1 || res.Attempts == 5) {

                        document.getElementById('hangman_pic').src = `../Tech_Forage-Hangman/Images/man_${res.Attempts}.png`;
                        document.getElementById('attemptsInstruction').innerHTML = `${res.Attempts} no.of attempts used out of 5.`;
                        document.getElementById('skipbtn').style.display = 'none';
                        if (res.Attempts == 5) {
                            window.location.replace('Final-pg.html');
                        }
                        else { document.getElementById('Que').innerHTML = questions[res.current_question]; }
                    }

                    else if (res.SkipStatus >= 1) {
                        document.getElementById('skipbtn').style.display = 'none';
                    }
                }
            }
        },

        error: function (res) {
            alert('There has been a error! please refresh the page and try again.');
        }
    });
}