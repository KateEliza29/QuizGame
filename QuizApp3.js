//ON SUBMIT 
// 1- Figure out how many questions needed. Feed this to URL.
// 1- Get data from API. 
// 1- Assign data to arrays. 
 
// 2- Create combined array of JSON data.- SHARED
// 2- Shuffle array.- SHARED

// 3- Allocate answers to divs. - SHARED
// 3- Display question. - SHARED

// 4- Switch from starting screen to game board.

//ON NEW QUESTION
// 1- Reset colours for new question.
// 1- Shift first element in arrays. 

// 2- Create combined array of JSON data. - SHARED
// 2- Shuffle array. - SHARED

// 3- Allocate answers to divs. - SHARED 
// 3- Display question. - SHARED
 
// ON ANSWER CLICK 
// 1- Check which div holds the answer using for loop.
// 1- Light up the correct answer in green. 
// 1- Increment the counter if necessary.
//  

var questionArray = [];
var incorrectAnswersArray = [];
var correctAnswerArray = [];
var potentialAnswersArray = [];
var counter = 0;
var questionCount = 0;

//ON SUBMIT
document.getElementById("submit").onclick = function() {
    questionCount = document.getElementById("questionCountSelector").value;
    document.getElementById("questionNumber").innerHTML = questionCount;
   
    fetch("https://opentdb.com/api.php?amount=" + questionCount + "&type=multiple")
        .then(response => response.json()) 
        .then(data => {
            for (let i=0; i<questionCount; i++) {    
                questionArray.push(data.results[i].question);
                correctAnswerArray.push(data.results[i].correct_answer);
                incorrectAnswersArray.push(data.results[i].incorrect_answers);
            }
        });
    document.getElementById("startingBoard").style.opacity = "0";  
    setTimeout(newQuestion, 3000);
    setTimeout(gameBoardChange, 3000); 
   }


//ON NEW QUESTION
document.getElementById("newQuestion").onclick = function() {
    questionArray.shift();
    correctAnswerArray.shift();
    incorrectAnswersArray.shift();
    reset();
    newQuestion();
}

//ON ANSWER BUTTON CLICK 
function answerCheck(value) {
    if (value.innerHTML == correctAnswerArray[0]) {
        document.getElementById(value.id).style.background = "linear-gradient(90deg, rgba(110,185,113,1) 0%, rgba(113,255,89,1) 49%, rgba(224,249,227,1) 100%)";
        counter++;
        document.getElementById("score").innerHTML = counter;
    }
    else {
        for (let i=0; i<4; i++) {
            if (document.getElementById("answer" + i).innerHTML == correctAnswerArray[0]) {
                document.getElementById("answer" + i).style.background = "linear-gradient(90deg, rgba(110,185,113,1) 0%, rgba(113,255,89,1) 49%, rgba(224,249,227,1) 100%)";
            }
            document.getElementById(value.id).style.background = "linear-gradient(90deg, rgba(224,249,227,1) 0%, rgba(255,64,64,1) 49%, rgba(255,0,0,1) 100%)";
        }
    }
    if (questionArray.length == 1) {
        document.getElementById("endingBoard").style.display = "flex";
        document.getElementById("finalScore").innerHTML = counter;
        document.getElementById("questionAmount").innerHTML = questionCount;
    }
}

// Combined array from JSON data- SHARED
function newQuestion() {
    potentialAnswersArray = [...incorrectAnswersArray[0], correctAnswerArray[0]];
    shuffle(potentialAnswersArray);
    for (let i=0; i<potentialAnswersArray.length; i++) {
        document.getElementById("answer" + [i]).innerHTML = potentialAnswersArray[i];
    }
    document.getElementById("questionDisplay").innerHTML = questionArray[0];
}

// Change the starting screen to the game screen.
function gameBoardChange() {
    document.getElementById("gameBoard").style.display = "block";
    document.getElementById("startingBoard").style.display = "none";
}

//Shuffle an array.
function shuffle(arr) {
    var j, x, i;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = arr[i];
        arr[i] = arr[j];
        arr[j] = x;
     }
    return arr;
}

//Reset the colours.
function reset() {
    for (let i=0; i<4; i++) {
        document.getElementById("answer" + i).style.background = "rgb(204, 204, 204)";
    }
}

//Reset the game.
function playAgain() {
    window.location.reload();
} 

document.getElementById('restart').addEventListener('click', playAgain);
