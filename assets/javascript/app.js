var numCorrect;
var numIncorrect;
var numUnanswered;
var questionNum;

var questions = {
	"questionArray":
	[
		{
			question: "What is the taste that allows us to taste savory foods?",
			answers: ['Sweet', 'Sour', 'Bitter', 'Umami'],
			correctIndex: 3
		},
		{
			question: "A tandoor is a type of what?",
			answers: ['Pot', 'Oven', 'Pastry', 'Utensil'],
			correctIndex: 1
		},
		{
			question: "What country was Guiness first brewed in?",
			answers: ['United Kingdom', 'Ireland', 'Germany', 'Russia'],
			correctIndex: 1
		},
		{
			question: "What US state did Gumbo originate from?",
			answers: ['Florida', 'Mississippi', 'Louisiana', 'South Carolina'],
			correctIndex: 2
		},
		{
			question: "What ingredient in bread causes it to rise?",
			answers: ['Baking Soda', 'Gluten', 'Salt', 'Yeast'],
			correctIndex: 3
		},
		{
			question: "Which liquor is made from the blue agave plant?",
			answers: ['Tequila', 'Rum', 'Whiskey', 'Brandy'],
			correctIndex: 0
		},
		{
			question: "The rice dish Paella originated from what country?",
			answers: ['Mexico', 'Spain', 'Portugal', 'Brazil'],
			correctIndex: 1
		},
		{
			question: "What country did bubble tea originate from?",
			answers: ['Taiwan', 'China', 'Korea', 'Vietnam'],
			correctIndex: 0
		},
		{
			question: "Where is the Coca-Cola headquarters located?",
			answers: ['New York, NY', 'Seattle, WA', 'Austin, TX', 'Atlanta, GA'],
			correctIndex: 3
		},
		{
			question: "The state of Georgia is known for what fruit?",
			answers: ['Apple', 'Banana', 'Peach', 'Mango'],
			correctIndex: 2
		}
	]
}

function game() {
	numCorrect = 0;
	numIncorrect = 0;
	numUnanswered = 0;
	questionNum = 0;

	var counter;

	var timer = {
		time: 10,
		reset: function() {
			timer.time = 10;
		},
		stop: function() {
			clearInterval(counter);
		},
		start: function() {
			counter = setInterval(timer.count, 1000);
		},
		count: function() {
			timer.time--;
			$("#timer").html("Time Remaining: " + timer.time);
			if (timer.time == 0) {
				answerPage(5, false);
			}
		}
	}
	$("#startButton").on("click",function() {
		$("#startButton").hide();
		$("#intro").hide();
		newQuestion();
	});

	function newQuestion() {
		timer.reset();

		$("#timer").html("Time Remaining: " + timer.time);
		$("#result").empty();
		$("#result-image").empty();

		$("#question").html("Question " + (questionNum + 1) + ":<br>" + questions.questionArray[questionNum].question);
		for (i=0;i<4;i++) {
			$("#choices").append("<button class='answerChoice' data-val='"+i+"'>" + questions.questionArray[questionNum].answers[i] + "</button><br>");
		}

		timer.start();

		$(".answerChoice").on("click", function() {
			var answerIndex = $(this).data('val');
			answerPage(answerIndex, true);
		});
	}

	function answerPage(answerIndex, answered) {
		$("#question").empty();
		$("#choices").empty();
		timer.stop();
		if (answerIndex == questions.questionArray[questionNum].correctIndex) {
			$("#result").html("Correct!");
			numCorrect++;
		}
		else if (answered == false) {
			$("#result").html("Time's Up!<br>The correct answer was: " + questions.questionArray[questionNum].answers[(questions.questionArray[questionNum].correctIndex)]);
			numUnanswered++;
		}
		else {
			$("#result").html("Wrong!<br>The correct answer was: " + questions.questionArray[questionNum].answers[(questions.questionArray[questionNum].correctIndex)]);
			numIncorrect++;
		}
		questionNum++;
		if (questionNum < 10) {
			var nextQuestion = setTimeout(newQuestion, 3000);
		}
		else {
			var nextQuestion = setTimeout(resultsPage, 3000);
		}
	}

	function resultsPage() {
		$("#result").empty();
		$("#result-image").empty();

		$("#final-result").html("Here are your results:");
		$("#final-stats").html("Correct answers: " + numCorrect + "<br>Incorrect answers: " + numIncorrect + "<br>Unanswered questions: " + numUnanswered);

		$("#play-again").html("<button id='newGame' class='btn btn-default'>Play Again</button>");

		$("#newGame").on("click", function() {
			$("#final-result").empty();
			$("#final-stats").empty();
			$("#play-again").empty();
			numCorrect = 0;
			numIncorrect = 0;
			numUnanswered = 0;
			questionNum = 0;
			newQuestion();
		});
	}
}

game();

