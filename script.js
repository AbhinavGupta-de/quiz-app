const startButton = document.querySelector('.start-btn');
const quizContainer = document.querySelector('.quiz-container');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const quizHeading = document.querySelector('.quiz-heading');

const questions = [
	{
		question: 'What is the capital of France?',
		answers: [
			{ text: 'Berlin', correct: false },
			{ text: 'Madrid', correct: false },
			{ text: 'Paris', correct: true },
			{ text: 'Lisbon', correct: false },
		],
	},
	{
		question: 'Who is the CEO of Tesla?',
		answers: [
			{ text: 'Jeff Bezos', correct: false },
			{ text: 'Elon Musk', correct: true },
			{ text: 'Bill Gates', correct: false },
			{ text: 'Tony Stark', correct: false },
		],
	},
	{
		question: 'What is the largest planet in our solar system?',
		answers: [
			{ text: 'Earth', correct: false },
			{ text: 'Jupiter', correct: true },
			{ text: 'Mars', correct: false },
			{ text: 'Saturn', correct: false },
		],
	},
	{
		question: 'What is the boiling point of water?',
		answers: [
			{ text: '90°C', correct: false },
			{ text: '100°C', correct: true },
			{ text: '110°C', correct: false },
			{ text: '120°C', correct: false },
		],
	},
	{
		question: 'Who wrote "To Kill a Mockingbird"?',
		answers: [
			{ text: 'Harper Lee', correct: true },
			{ text: 'J.K. Rowling', correct: false },
			{ text: 'Ernest Hemingway', correct: false },
			{ text: 'Mark Twain', correct: false },
		],
	},
];

let shuffledQuestions, currentQuestionIndex, score;

startButton.addEventListener('click', startQuiz);

function startQuiz() {
	startButton.classList.add('hidden');
	quizHeading.classList.add('hidden');
	shuffledQuestions = questions.sort(() => Math.random() - 0.5);
	currentQuestionIndex = 0;
	score = 0;
	quizContainer.classList.remove('hidden');
	setNextQuestion();
}

function setNextQuestion() {
	resetState();
	showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
	questionElement.innerText = question.question;
	question.answers.forEach((answer) => {
		const button = document.createElement('button');
		button.innerText = answer.text;
		button.classList.add('btn');
		if (answer.correct) {
			button.dataset.correct = answer.correct;
		}
		button.addEventListener('click', selectAnswer);
		answerButtonsElement.appendChild(button);
	});
}

function resetState() {
	questionElement.classList.remove('result');
	while (answerButtonsElement.firstChild) {
		answerButtonsElement.removeChild(answerButtonsElement.firstChild);
	}
}

function selectAnswer(e) {
	const selectedButton = e.target;
	const correct = selectedButton.dataset.correct;
	if (correct) {
		score++;
	}
	currentQuestionIndex++;
	if (currentQuestionIndex < shuffledQuestions.length) {
		setNextQuestion();
	} else {
		showScore();
	}
}

function showScore() {
	resetState();
	questionElement.innerText = `Quiz Finished! Your score is ${score} out of ${questions.length}.`;
	startButton.innerText = 'Restart Quiz';
	startButton.classList.remove('hidden');
	questionElement.classList.add('result');
}
