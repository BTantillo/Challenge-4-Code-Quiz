var timerEl = document.getElementById('countdown');
var mainEl = document.getElementById('main');
var startBtn = document.getElementById('start');

var message =
  'Time has run out! Your score is ';
var words = message.split(' ');

// Timer that counts down from 60
function startquiz() {
  var timeLeft = 60;
 displayNextQuestion();

  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function() {
    // As long as the `timeLeft` is greater than 1
    if (timeLeft > 1) {
      // Set the `textContent` of `timerEl` to show the remaining seconds
      timerEl.textContent = timeLeft + ' seconds remaining';
      // Decrement `timeLeft` by 1
      timeLeft--;
    } else if (timeLeft === 1) {
      // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
      timerEl.textContent = timeLeft + ' second remaining';
      timeLeft--;
    } else {
      // Once `timeLeft` gets to 0, set `timerEl` to an empty string
      timerEl.textContent = '';
      // Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);
      // Call the `displayMessage()` function
      displayMessage();
    }
  }, 1000);
}

// Displays the message one word at a time
function displayMessage() {
  var wordCount = 0;

  // Uses the `setInterval()` method to call a function to be executed every 300 milliseconds
  var msgInterval = setInterval(function() {
    if (words[wordCount] === undefined) {
      clearInterval(msgInterval);
    } else {
      mainEl.textContent = words[wordCount];
      wordCount++;
    }
  }, 300);
}

startBtn.onclick = startquiz;
function handleAnswerClick(event) {
    event.preventDefault();
    // answerQuestion(question.answers[i].isCorrect)
    var answerButton = event.target
    console.log(answerButton)
    answerQuestion(answerButton.getAttribute("isCorrect"))
} 
function displayNextQuestion() {
    var question = questions[currentQuestion]
    var questionTitleEl = document.createElement("h1")
    questionTitleEl.textContent = question.title
    document.getElementById("question").appendChild(questionTitleEl)

    for (var i = 0; i < question.answers.length; i++) {
        var answerEl = document.createElement("button")
        answerEl.textContent = question.answers[i].title
        answerEl.setAttribute("isCorrect", question.answers[i].isCorrect)
        document.getElementById("question").appendChild(answerEl)
        answerEl.addEventListener('click', handleAnswerClick)

    
    }
};
var points = 0
var currentQuestion = 0
var questions = [
    {
        title: "There are nine planets in our solar system", 
        answers: [
            {
                title: "yes", isCorrect: false
            }, 
            {
                title: "no", isCorrect: true
            }, 
        ]
    }
]

function answerQuestion (isCorrectString){
var isCorrect = (isCorrectString === 'true');
    console.log(isCorrect)
if (isCorrect) {
    console.log("You got it right!")
}
else {
    console.log("wrong!")
}
currentQuestion++; 
// TODO:if currentQuestion is greater than questions.length, end quiz.  displayNextQuestion()
}


