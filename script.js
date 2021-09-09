var timerEl = document.getElementById("countdown");
var mainEl = document.getElementById("main");
var startBtn = document.getElementById("start");
var questionTitleEl = document.getElementById("questionTitle");
var submitButton = document.getElementById("submitButton")
var timeLeft = 60;
var message = "Time has run out! Your score is ";
var words = message.split(" ");

// Timer that counts down from 60
function startquiz() {
  
  displayNextQuestion();
  document.getElementById("startMessage").style.display = "none";

  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {
    // As long as the `timeLeft` is greater than 1
    if (timeLeft > 1) {
      // Set the `textContent` of `timerEl` to show the remaining seconds
      timerEl.textContent = timeLeft + " seconds remaining";
      // Decrement `timeLeft` by 1
      timeLeft--;
    } else if (timeLeft === 1) {
      // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
      timerEl.textContent = timeLeft + " second remaining";
      timeLeft--;
    } else {
      // Once `timeLeft` gets to 0, set `timerEl` to an empty string
      timerEl.textContent = "";
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
  var msgInterval = setInterval(function () {
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
  var answerButton = event.target;
  console.log(answerButton);
  answerQuestion(answerButton.getAttribute("isCorrect"));
  if (currentQuestion > questions.length) {
    console.log("quiz over")
    quizOver();
  } else {
    displayNextQuestion();
  }
}
function quizOver(){
  document.getElementById("question").style.display = "none";
  document.getElementById("quizOver").style.display = "block";
  var initials = document.getElementById("initials");
  submitButton.addEventListener("click", ()=>{
    console.log(initials.value)
  }) 
  localStorage.setItem("Initials")
}


function displayNextQuestion() {
  if (currentQuestion >= questions.length){
    quizOver();
  } else {
    console.log(currentQuestion)
    console.log(questions.length)
  var question = questions[currentQuestion];
  console.log(question)
  questionTitleEl.textContent = question.title;
  // document.getElementById("question").appendChild(questionTitleEl);
  document.getElementById("questionAnswers").innerHTML = ""
  for (var i = 0; i < question.answers.length; i++) {
    var answerEl = document.createElement("button");
    answerEl.textContent = question.answers[i].title;
    answerEl.setAttribute("isCorrect", question.answers[i].isCorrect);
    document.getElementById("questionAnswers").appendChild(answerEl);
    answerEl.addEventListener("click", handleAnswerClick);
  }
}
}
var points = 0;
var currentQuestion = 0;
var questions = [
  {
    title: "There are nine planets in our solar system",
    answers: [
      {
        title: "yes",
        isCorrect: false,
      },
      {
        title: "no",
        isCorrect: true,
      },
    ],
  },
  {
    title: "There are 50 states in the United States",
    answers: [
      {
        title: "yes",
        isCorrect: true,
      },
      { title: "no", isCorrect: false },
    ],
  },
];

function answerQuestion(isCorrectString) {
  var isCorrect = isCorrectString === "true";
  console.log(isCorrect);
  if (isCorrect) {
    console.log("You got it right!");
    points++;
  } else {
    console.log("wrong!");
    timeLeft = timeLeft - 10;
  }
  currentQuestion++;



  // TODO:if currentQuestion is greater than questions.length, end quiz.  displayNextQuestion()
}
