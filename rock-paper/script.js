const userScoreElement = document.getElementById('user-score');
const computerScoreElement = document.getElementById('computer-score');
const resultMessageElement = document.getElementById('result-message');
const containerElement = document.querySelector('.container');
const choices = document.querySelectorAll('.choice');

let userScore = 0;
let computerScore = 0;

choices.forEach(choice => {
    choice.addEventListener('click', () => {
        const userChoice = choice.id;
        const computerChoice = getComputerChoice();
        const result = determineWinner(userChoice, computerChoice);
        displayResult(result, userChoice, computerChoice);
        animateResult(result);
    });
});

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return 'draw';
    } else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'win';
    } else {
        return 'lose';
    }
}

function displayResult(result, userChoice, computerChoice) {
    // Remove previous classes
    containerElement.classList.remove('win', 'lose', 'draw');
    resultMessageElement.classList.remove('win', 'lose', 'draw');

    if (result === 'win') {
        userScore++;
        resultMessageElement.textContent = `You win! ${capitalize(userChoice)} beats ${computerChoice}.`;
        resultMessageElement.classList.add('win');
        containerElement.classList.add('win');
    } else if (result === 'lose') {
        computerScore++;
        resultMessageElement.textContent = `You lose! ${capitalize(computerChoice)} beats ${userChoice}.`;
        resultMessageElement.classList.add('lose');
        containerElement.classList.add('lose');
    } else {
        resultMessageElement.textContent = `It's a draw! You both chose ${capitalize(userChoice)}.`;
        resultMessageElement.classList.add('draw');
        containerElement.classList.add('draw');
    }

    userScoreElement.textContent = userScore;
    computerScoreElement.textContent = computerScore;
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function animateResult(result) {
    resultMessageElement.style.transform = 'scale(1.5)';
    setTimeout(() => {
        resultMessageElement.style.transform = 'scale(1)';
    }, 300);
}
