document.getElementById('skipbtn').style.display = 'none';
document.getElementById('submitbtn').style.display = 'none';
document.getElementById('page2_view').style.display = 'none';

var questions = ['1) I have a 9 letter word, 123456789. All 9 letters can be complaint 345 is very very relevant, if you\'re 6789, you must be intelligent. What is the word ?', '2) I can\'t go left, I can\'t go right. But I do move. I\'m forever stuck in one axis. What am I?', '3) I\'ve face but I\'m not a human, I\'ve hands but i don\'t have finger, I blow air but I don\'t have mouth.', '4) Can you find the smallest positive number that is divisible by 15 that consists ONLY of ones and zeroes (e.g. 10, 11, 100, etc.)?', '5) What only runs and never walks, what has a mouth and never eats, and has a bed but never sleeps?'];

//Checking if input string is empty or not for mode 0.
document.getElementById('loginbtn').onclick = function () {
    var Name = document.getElementById('userName').value.toLowerCase().trim();
    var Password = document.getElementById('password').value.toLowerCase().trim();

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
    var Name = document.getElementById('userName').value.toLowerCase().trim();
    var Password = document.getElementById('password').value.toLowerCase().trim();
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
    var Name = document.getElementById('userName').value.toLowerCase().trim();
    var Password = document.getElementById('password').value.toLowerCase().trim();

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

    document.getElementById('loading').style.display = 'block';

    $.ajax({
        url: "https://script.google.com/macros/s/AKfycbw6AnSa1r5eMlVI4Ab8dTW0LSE3x3PNpmpAgldBVvV-RYzXBIGO94xEzA/exec",
        type: 'POST',
        data: serialJSON,

        success: function (res) {

            //Wrong username and password.
            if (res.ReturnedStatus == 0) {
                document.getElementById('loginInstruction').innerHTML = 'wrong credentials';
            }

            //correct username and password.
            else if (res.ReturnedStatus == 1) {
                document.getElementById('loginInstruction').innerHTML = '';
                if (mode == 0) {
                    //if already played and won
                    if (res.WinStatus == 1) {
                        window.location.replace('Final-pg.html');
                        //WON PAGE............
                    }
                    //if already played and lost.
                    else if (res.Attempts >= 5) {
                        window.location.replace('Final-pg2.html');
                        //FAIL PAGE.....
                    }
                    //to start/continue playing. 
                    else {
                        document.getElementById('Que').innerHTML = questions[res.current_question];

                        document.getElementById('attemptsInstruction').innerHTML = `${res.Attempts} attempts used out of 5.`;

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
                            document.getElementById('attemptsInstruction').innerHTML = `${res.Attempts} attempts used out of 5.`;
                            document.getElementById('Ans').value = '';
                        }
                    }
                }

                else if (mode == 1) {
                    if (res.Attempts == 4) {
                        document.getElementById('skipbtn').style.display = 'none';
                        document.getElementById('attemptsInstruction').innerHTML = `${res.Attempts} attempts used out of 5.`;
                        document.getElementById('Ans').value = '';
                    }
                    //correct answer
                    if (res.Ans_Status == 1) {
                        if (res.WinStatus == 1 || res.current_question == 5) {
                            window.location.replace('Final-pg.html');
                            //alert('You have clered the round!');
                            //WON PAGE....
                        }
                        else {
                            alert('Congrats! Correct Answer.')
                            document.getElementById('Que').innerHTML = questions[res.current_question];
                            document.getElementById('Ans').value = '';
                            document.getElementById('attemptsInstruction').innerHTML = `${res.Attempts} attempts used out of 5.`;

                        }
                    }
                    //else if  ..wrong answer
                    else if (res.Ans_Status == 0) {
                        if (res.Attempts >= 5) {
                            window.location.replace('Final-pg2.html');
                            //FAIL PAGE.....
                        }
                        //pic update.
                        else {
                            alert('Wrong answer! Lost an attempt.');
                            document.getElementById('hangman_pic').src = `../Tech_Forage-Hangman/Images/man_${res.Attempts}.png`;
                            document.getElementById('Ans').value = '';
                            document.getElementById('attemptsInstruction').innerHTML = `${res.Attempts} attempts used out of 5.`;
                        }
                    }
                }

                else if (mode == 2) {
                    if (res.Attempts == 4) {
                        document.getElementById('skipbtn').style.display = 'none';
                        document.getElementById('attemptsInstruction').innerHTML = `${res.Attempts} attempts used out of 5.`;
                    }
                    else if (res.WinStatus == 1) {
                        window.location.replace('Final-pg.html');
                        //WON PAGE.......
                    }
                    else if (res.SkipStatus == 1 || res.Attempts == 5) {
                        alert('Answer skipped! Lost an attempt.');
                        document.getElementById('hangman_pic').src = `../Tech_Forage-Hangman/Images/man_${res.Attempts}.png`;
                        document.getElementById('attemptsInstruction').innerHTML = `${res.Attempts} attempts used out of 5.`;
                        document.getElementById('skipbtn').style.display = 'none';
                        if (res.Attempts == 5) {
                            window.location.replace('Final-pg2.html');
                            //FAIL PAGE......
                        }
                        else { document.getElementById('Que').innerHTML = questions[res.current_question]; }
                    }

                    else if (res.SkipStatus >= 1) {
                        document.getElementById('skipbtn').style.display = 'none';
                    }
                }
            }
            document.getElementById('loading').style.display = 'none';
        },

        error: function (res) {
            alert('There has been a error! please refresh the page and try again.');
            document.getElementById('loading').style.display = 'none';
        }
    });
}