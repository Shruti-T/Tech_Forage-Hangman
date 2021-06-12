document.getElementById("skipbtn").style.display = "none";
document.getElementById("submitbtn").style.display = "none";
document.getElementById("page2_view").style.display = "none";

var questions1 = [
  "1) I have ears, mouth and nose but I am not a human. Who am I?",
  "2) Can you find the smallest positive number that is divisible by 15 that consists ONLY of ones and zeroes (e.g. 10, 11, 100, etc.)? Note that you don’t need a calculator to solve the problem.",
  "3) I have a 9 letter word, 123456789. All 9 letters can be versatile, 345 is very very relevant, if you're 6789, you must be intelligent. What is the word?",
  "4) Where does Fourth always come before Third?",
  "5) Complete the series. 2  8  23  58  135  ???",
];

var questions2 = [
  "1) What can answer in any language? What can speak without a mouth? What can hear without an ear?",
  "2) What letter is next in the series? T   F   S   E   T   T   ??",
  "3) If you feed me, I live. If you give me a drink, I die. What am I? ",
  "4) I have a 10 letter word, 0123456789. All 10 letters - make something easier to notice. If you have 2345, you can buy things, if you 789 those things, hunger is in the past. Planes and trains are expected to follow their 987. What is the word?",
  "5) I Can be used to charge a phone but I do not covert AC to DC. What am I? (*This is a TWO word answer)",
];

var questions3 = [
  "1) Mr.Singh was killed on Sunday afternoon. The wife said she was reading a book. The butler said he was taking a shower. The chef said he was making breakfast. The maid said she was folding clothes, and the gardener said he was planting tomatoes. Who did it?",
  "2) I can't go left, I can't go right. But I do move. I'm forever stuck in one axis. What am I?",
  "3) Complete the series: 1   1   2   3   7   16   31   95   ???",
  "4) Where does Fourth always come before Third?",
  "5) Rose, Hema, and Robin race each other in a 100 meters race. All of them run at a constant speed throughout the race. Rose beats Hema by 20 meters. Hema beats Robin by 20 meters. How many meters does Rose beat Robin by?",
];

var questions4 = [
  "1) There are 7 girls in a bus. Each girl has 7 backpacks. In each backpack, there are 7 cats. For every cat, there are 7 kittens. How many legs are there in the bus? (Assume there is no bus driver)",
  "2) I Can be used to charge a phone but I do not covert AC to DC. What am I? (*This is a TWO word answer)",
  "3) Complete the series. 51  55  71  107  171  ??",
  "4) I have a 9 letter word, 123456789. All 9 letters can be versatile, 345 is very very relevant, if you're 6789, you must be intelligent. What is the word?",
  "5) I've face but I'm not a human. I've hands but i don't have finger. I blow air but I don't have mouth.",
];

var questions5 = [
  "1) Can you find the smallest positive number that is divisible by 15 that consists ONLY of ones and zeroes (e.g. 10, 11, 100, etc.)? Note that you don’t need a calculator to solve the problem.",
  "2) I can't go left, I can't go right. But I do move. I'm forever stuck in one axis. What am I?",
  "3) I have a 10 letter word, 0123456789. All 10 letters - make something easier to notice If you have 2345, you can buy things, If you 789 those things, hunger is in the past. Planes and trains are expected to follow their 987. What is the word?",
  "4) Complete the series: 31 30 34 7 71 ??",
  "5) Where does Fourth always come before Third?",
];

//Checking if input string is empty or not for mode 0.
document.getElementById("loginbtn").onclick = function () {
  var Name = document.getElementById("userName").value.trim();
  var Password = document.getElementById("password").value.toLowerCase().trim();

  if (Name == "" || Password == "") {
    document.getElementById("loginInstruction").innerHTML =
      "Please fill in the details.";
  } else {
    mode = 0;
    serialJSON["name"] = Name;
    serialJSON["password"] = Password;
    if (document.getElementById("page2_view").style.display == "block") {
      var Answer = document.getElementById("Ans").value.toLowerCase().trim();
      if (Answer == "") {
        alert("Fill in the answer!");
        return false;
      } else {
        serialJSON["Answer"] = Answer;
        mode = 1;
      }
    }
    successful(mode, serialJSON);
  }
  return false;
};

//checking input of answers for mode 1.
document.getElementById("submitbtn").onclick = function () {
  var Name = document.getElementById("userName").value.trim();
  var Password = document.getElementById("password").value.toLowerCase().trim();
  var Answer = document.getElementById("Ans").value.toLowerCase().trim();

  if (Name == "" || Password == "" || Answer == "") {
    alert("Please fill in all the details!");
  } else {
    document.getElementById("attemptsInstruction").innerHTML = "";
    mode = 1;
    serialJSON["name"] = Name;
    serialJSON["password"] = Password;
    serialJSON["Answer"] = Answer;

    successful(mode, serialJSON);
  }
  return false;
};

//for mode 3.
document.getElementById("skipbtn").onclick = function () {
  var Name = document.getElementById("userName").value.trim();
  var Password = document.getElementById("password").value.toLowerCase().trim();

  if (Name == "" || Password == "") {
    document.getElementById("loginInstruction").innerHTML =
      "Please fill in the details.";
  } else {
    mode = 2;
    serialJSON["name"] = Name;
    serialJSON["password"] = Password;

    successful(mode, serialJSON);
  }
  return false;
};

//post request.
var serialJSON = {};
var mode;

function successful(mode) {
  serialJSON["mode"] = mode;

  document.getElementById("loading").style.display = "block";

  $.ajax({
    url: "https://script.google.com/macros/s/AKfycbxaAS7i8roOove79HVNrCiPn_4ZQ-4JCrAXsptqH35l4W_7HRwE/exec",
    type: "POST",
    data: serialJSON,

    success: function (res) {
      //Wrong username and password.
      if (res.ReturnedStatus == 0) {
        document.getElementById("loginInstruction").innerHTML =
          "wrong credentials";
      }

      //correct username and password.
      else if (res.ReturnedStatus == 1) {
        document.getElementById("loginInstruction").innerHTML = "";
        if (mode == 0) {
          //if already played and won
          if (res.WinStatus == 1) {
            window.location.replace("Final-pg.html");
            //WON PAGE............
          }
          //if already played and lost.
          else if (res.Attempts >= 5) {
            window.location.replace("Final-pg2.html");
            //FAIL PAGE.....
          }
          //to start/continue playing.
          else {
            //Checking the group number.
            if (res.grpNo == 1) {
              document.getElementById("Que").innerHTML =
                questions1[res.current_question];
            } else if (res.grpNo == 2) {
              document.getElementById("Que").innerHTML =
                questions2[res.current_question];
            } else if (res.grpNo == 3) {
              document.getElementById("Que").innerHTML =
                questions3[res.current_question];
            } else if (res.grpNo == 4) {
              document.getElementById("Que").innerHTML =
                questions4[res.current_question];
            } else if (res.grpNo == 5) {
              document.getElementById("Que").innerHTML =
                questions5[res.current_question];
            }

            document.getElementById(
              "attemptsInstruction"
            ).innerHTML = `${res.Attempts} attempts used out of 5.`;

            document.getElementById("loginbtn").style.display = "none";
            document.getElementById("skipbtn").style.display = "inline";
            document.getElementById("submitbtn").style.display = "inline";
            document.getElementById("page2_view").style.display = "block";

            document.getElementById(
              "hangman_pic"
            ).src = `man_${res.Attempts}.png`;

            if (res.SkipStatus == 1) {
              document.getElementById("skipbtn").style.display = "none";
              document.getElementById("Ans").value = "";
            } else if (res.Attempts == 4) {
              document.getElementById("skipbtn").style.display = "none";
              document.getElementById(
                "attemptsInstruction"
              ).innerHTML = `${res.Attempts} attempts used out of 5.`;
              document.getElementById("Ans").value = "";
            }
          }
        } else if (mode == 1) {
          if (res.Attempts == 4) {
            document.getElementById("skipbtn").style.display = "none";
            document.getElementById(
              "attemptsInstruction"
            ).innerHTML = `${res.Attempts} attempts used out of 5.`;
            document.getElementById("Ans").value = "";
          }
          //correct answer
          if (res.Ans_Status == 1) {
            if (res.WinStatus == 1 || res.current_question == 5) {
              window.location.replace("Final-pg.html");
              //alert('You have clered the round!');
              //WON PAGE....
            } else {
              alert("Congrats! Correct Answer.");

              //Checking the group number.
              if (res.grpNo == 1) {
                document.getElementById("Que").innerHTML =
                  questions1[res.current_question];
              } else if (res.grpNo == 2) {
                document.getElementById("Que").innerHTML =
                  questions2[res.current_question];
              } else if (res.grpNo == 3) {
                document.getElementById("Que").innerHTML =
                  questions3[res.current_question];
              } else if (res.grpNo == 4) {
                document.getElementById("Que").innerHTML =
                  questions4[res.current_question];
              } else if (res.grpNo == 5) {
                document.getElementById("Que").innerHTML =
                  questions5[res.current_question];
              }
              document.getElementById("Ans").value = "";
              document.getElementById(
                "attemptsInstruction"
              ).innerHTML = `${res.Attempts} attempts used out of 5.`;
            }
          }
          //else if  ..wrong answer
          else if (res.Ans_Status == 0) {
            if (res.Attempts >= 5) {
              window.location.replace("Final-pg2.html");
              //FAIL PAGE.....
            }
            //pic update.
            else {
              alert("Wrong answer! Lost an attempt.");
              document.getElementById(
                "hangman_pic"
              ).src = `man_${res.Attempts}.png`;
              document.getElementById("Ans").value = "";
              document.getElementById(
                "attemptsInstruction"
              ).innerHTML = `${res.Attempts} attempts used out of 5.`;
            }
          }
        } else if (mode == 2) {
          if (res.Attempts == 4) {
            document.getElementById("skipbtn").style.display = "none";
            document.getElementById(
              "attemptsInstruction"
            ).innerHTML = `${res.Attempts} attempts used out of 5.`;
          } else if (res.WinStatus == 1) {
            window.location.replace("Final-pg.html");
            //WON PAGE.......
          } else if (res.SkipStatus == 1 || res.Attempts == 5) {
            alert("Answer skipped! Lost an attempt.");
            document.getElementById(
              "hangman_pic"
            ).src = `man_${res.Attempts}.png`;
            document.getElementById(
              "attemptsInstruction"
            ).innerHTML = `${res.Attempts} attempts used out of 5.`;
            document.getElementById("skipbtn").style.display = "none";
            if (res.Attempts == 5) {
              window.location.replace("Final-pg2.html");
              //FAIL PAGE......
            } else {
              //Checking the group number.
              if (res.grpNo == 1) {
                document.getElementById("Que").innerHTML =
                  questions1[res.current_question];
              } else if (res.grpNo == 2) {
                document.getElementById("Que").innerHTML =
                  questions2[res.current_question];
              } else if (res.grpNo == 3) {
                document.getElementById("Que").innerHTML =
                  questions3[res.current_question];
              } else if (res.grpNo == 4) {
                document.getElementById("Que").innerHTML =
                  questions4[res.current_question];
              } else if (res.grpNo == 5) {
                document.getElementById("Que").innerHTML =
                  questions5[res.current_question];
              }
            }
          } else if (res.SkipStatus >= 1) {
            document.getElementById("skipbtn").style.display = "none";
          }
        }
      }
      document.getElementById("loading").style.display = "none";
    },

    error: function (res) {
      alert("There has been a error! please refresh the page and try again.");
      document.getElementById("loading").style.display = "none";
    },
  });
}
