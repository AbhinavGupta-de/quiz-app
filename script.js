const startButton = document.querySelector('.start-btn');
const quizContainer = document.querySelector('.quiz-container');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const quizHeading = document.querySelector('.quiz-heading');
const progressBar = document.getElementById('progress-bar');
const scoreElement = document.getElementById('score');
const feat = document.querySelector('.feat');
const home = document.querySelector('#home-btn');

const questions = [
	{
		question: 'What is the capital of France?',
		answers: [
			{ text: 'Berlin', correct: false },
			{ text: 'Madrid', correct: false },
			{
				text: 'Paris',
				correct: true,
			},
			{ text: 'Lisbon', correct: false },
		],
	},
	{
		question: 'Who is the CEO of Tesla?',
		answers: [
			{ text: 'Jeff Bezos', correct: false },
			{ text: 'Elon Musk', correct: true },
			{
				text: 'Bill Gates',
				correct: false,
			},
			{ text: 'Tony Stark', correct: false },
		],
	},
	{
		question: 'What is the largest planet in our solar system?',
		answers: [
			{ text: 'Earth', correct: false },
			{ text: 'Jupiter', correct: true },
			{
				text: 'Mars',
				correct: false,
			},
			{ text: 'Saturn', correct: false },
		],
	},
	{
		question: 'What is the boiling point of water?',
		answers: [
			{ text: '90°C', correct: false },
			{ text: '100°C', correct: true },
			{
				text: '110°C',
				correct: false,
			},
			{ text: '120°C', correct: false },
		],
	},
	{
		question: 'Who wrote "To Kill a Mockingbird"?',
		answers: [
			{ text: 'Harper Lee', correct: true },
			{ text: 'J.K. Rowling', correct: false },
			{
				text: 'Ernest Hemingway',
				correct: false,
			},
			{ text: 'Mark Twain', correct: false },
		],
	},
];

let shuffledQuestions, currentQuestionIndex, score;

startButton.addEventListener('click', startQuiz);
home.addEventListener('click', () => {
	location.reload();
});

function startQuiz() {
	startButton.classList.add('hidden');
	quizHeading.classList.add('hidden');
	home.classList.add('hidden');
	feat.classList.remove('hidden');
	shuffledQuestions = questions.sort(() => Math.random() - 0.5);
	currentQuestionIndex = 0;
	score = 0;
	quizContainer.classList.remove('hidden');
	progressBar.classList.remove('hidden');
	scoreElement.classList.remove('hidden');
	setNextQuestion();
}

function setNextQuestion() {
	resetState();
	showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
	questionElement.innerText = `Question ${currentQuestionIndex + 1}: ${
		question.question
	}`;
	question.answers.forEach((answer, index) => {
		const button = document.createElement('button');
		button.classList.add('btn');
		if (answer.correct) {
			button.dataset.correct = answer.correct;
		}
		button.addEventListener('click', selectAnswer);

		const optionNumber = document.createElement('div');
		optionNumber.innerText = `Option ${index + 1}`;
		optionNumber.classList.add('option-number');

		const optionText = document.createElement('div');
		optionText.innerText = answer.text;
		optionText.classList.add('option-text');

		button.appendChild(optionNumber);
		button.appendChild(optionText);

		answerButtonsElement.appendChild(button);
	});

	const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
	progressBar.style.width = progress + '%';
}

function resetState() {
	questionElement.classList.remove('result');
	while (answerButtonsElement.firstChild) {
		answerButtonsElement.removeChild(answerButtonsElement.firstChild);
	}
	scoreElement.innerText = `Score: ${score}`;
	progressBar.style.width = '0%';
}

function selectAnswer(e) {
	const selectedButton = e.target.closest('button');
	const correct = selectedButton.dataset.correct;
	if (correct === 'true') {
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
	progressBar.classList.add('hidden');
	scoreElement.classList.add('hidden');
	feat.classList.add('hidden');
	home.classList.remove('hidden');
}
