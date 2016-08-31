var numCorrect;
var numIncorrect;
var numUnanswered;
var questionNum;

var questions = {
	"questionArray":
	[
		{
			question: "This is question 1",
			answers: ['a', 'b', 'c', 'd'],
			correctIndex: 0
		},
		{
			question: "This is question 2",
			answers: ['a', 'b', 'c', 'd'],
			correctIndex: 0
		},
		{
			question: "This is question 3",
			answers: ['a', 'b', 'c', 'd'],
			correctIndex: 0
		},
		{
			question: "This is question 4",
			answers: ['a', 'b', 'c', 'd'],
			correctIndex: 0
		},
		{
			question: "This is question 5",
			answers: ['a', 'b', 'c', 'd'],
			correctIndex: 0
		},
		{
			question: "This is question 6",
			answers: ['a', 'b', 'c', 'd'],
			correctIndex: 0
		},
		{
			question: "This is question 7",
			answers: ['a', 'b', 'c', 'd'],
			correctIndex: 0
		},
		{
			question: "This is question 8",
			answers: ['a', 'b', 'c', 'd'],
			correctIndex: 0
		},
		{
			question: "This is question 9",
			answers: ['a', 'b', 'c', 'd'],
			correctIndex: 0
		},
		{
			question: "This is question 10",
			answers: ['a', 'b', 'c', 'd'],
			correctIndex: 0
		}
	]
}
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
	}
}

function game() {
	numCorrect = 0;
	numIncorrect = 0;
	numUnanswered = 0;
	questionNum = 0;

	$("#startButton").on("click",function() {
		$("#startButton").hide();
		newQuestion();
	});

	function newQuestion() {
		timer.reset();
		
		$("#timer").html("Time Remaining: " + timer.time);
		$("#result").empty();
		$("#result-image").empty();

		$("#question").html(questions.questionArray[questionNum].question);
		for (i=0;i<4;i++) {
			$("#choices").append("<button class='answerChoice' data-val='"+i+"'>" + questions.questionArray[questionNum].answers[i] + "</button><br>");
		}

		timer.start();
		var timesUp = setTimeout(function() {answerpage(5, false)}, 10000);

		$(".answerChoice").on("click", function() {
			$("#question").empty();
			$("#choices").empty();
			var answerIndex = $(this).data('val');
			timer.stop();
			answerPage(answerIndex, true);
		});
	}

	function answerPage(answerIndex, answered) {
		if (answerIndex == questions.questionArray[questionNum].correctIndex) {
			$("#result").html("Correct!");
			numCorrect++;
		}
		else if (answered == false) {
			$("#result").html("Time's Up!");
			numUnanswered++;
		}
		else {
			$("#result").html("Wrong!");
			numIncorrect++;
		}
		questionNum++;
		if (questionNum < 10) {
			var nextQuestion = setTimeout(newQuestion, 4000);
		}
		else {
			var nextQuestion = setTimeout(resultsPage, 4000);
		}
	}

	function resultsPage() {
		$("#result").empty();
		$("#result-image").empty();

		$("#final-result").html("Survey Complete!  Here are your results:");
		$("#final-stats").html("Correct answers: " + numCorrect + "<br>Incorrect answers: " + numIncorrect + "<br>Unanswered questions: " + numUnanswered);

		$("#play-again").html("<button id='newGame'>Play Again</button>");

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

