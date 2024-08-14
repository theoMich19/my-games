const gameArea = document.querySelector(".game-area");
const scoreElement = document.getElementById("score");
const gridSize = 20;
const gameSize = 400;
let snake = [{ x: 2, y: 2 }];
let direction = { x: 1, y: 0 };
let interval = 200;
let moveCounter = 0;
const movesBeforeApple = 10; // Apparition d'une pomme toutes les 10 déplacements
let apples = []; // Tableau pour stocker plusieurs pommes
const maxApples = 4; // Maximum de 4 pommes en même temps
let score = 0; // Initialiser le score à 0

// Générer les cellules de la grille
for (let i = 0; i < (gameSize / gridSize) ** 2; i++) {
  const cell = document.createElement("div");
  cell.classList.add("grid-cell");
  gameArea.appendChild(cell);
}

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
});

function drawSnake() {
  document
    .querySelectorAll(".snake-segment")
    .forEach((segment) => segment.remove());

  snake.forEach((segment) => {
    const snakeSegment = document.createElement("div");
    snakeSegment.classList.add("snake-segment");
    snakeSegment.style.transform = `translate(${segment.x * gridSize}px, ${
      segment.y * gridSize
    }px)`;
    gameArea.appendChild(snakeSegment);
  });
}

function drawApples() {
  apples.forEach((apple) => {
    if (apple.element) {
      apple.element.remove();
    }

    const appleElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    appleElement.setAttribute("width", 24); // Ajustez la taille si nécessaire
    appleElement.setAttribute("height", 24); // Ajustez la taille si nécessaire
    appleElement.setAttribute("viewBox", "0 0 32 32");
    appleElement.innerHTML = `
      <circle cx="16" cy="18" r="12" fill="#e74c3c"/>
      <path fill="#2ecc71" d="M16 2c-2 0-4 2-4 4s2 4 4 4 4-2 4-4-2-4-4-4z"/>
      <path fill="#27ae60" d="M18 0c-1 0-2 1-2 2s1 2 2 2 2-1 2-2-1-2-2-2z"/>
    `;
    appleElement.style.position = "absolute";
    appleElement.style.transform = `translate(${apple.x * gridSize - 2}px, ${
      apple.y * gridSize - 3
    }px)`;
    gameArea.appendChild(appleElement);

    apple.element = appleElement;
  });
}

function generateApple() {
  if (apples.length >= maxApples) return; // Ne pas générer plus que le maximum

  let x, y;
  do {
    x = Math.floor(Math.random() * (gameSize / gridSize));
    y = Math.floor(Math.random() * (gameSize / gridSize));
  } while (
    snake.some((segment) => segment.x === x && segment.y === y) ||
    apples.some((apple) => apple.x === x && apple.y === y)
  ); // Assure que la pomme n'apparaisse pas sur le serpent ou une autre pomme

  const newApple = { x, y };
  apples.push(newApple);
  drawApples();
}

function checkAppleCollision() {
  apples = apples.filter((apple) => {
    if (snake[0].x === apple.x && snake[0].y === apple.y) {
      snake.push({ ...snake[snake.length - 1] }); // Ajouter un nouveau segment au serpent
      apple.element.remove(); // Supprimer la pomme du DOM
      score += 10; // Augmenter le score de 10 points
      scoreElement.textContent = score; // Mettre à jour l'affichage du score
      return false; // Enlever cette pomme du tableau
    }
    return true;
  });
}

function checkSelfCollision() {
  const head = snake[0];
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      alert("Game Over! You hit yourself!");
      resetGame();
      return true;
    }
  }
  return false;
}

function moveSnake() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= gameSize / gridSize ||
    head.y >= gameSize / gridSize
  ) {
    // alert("Game Over!");
    // resetGame();
    return;
  }

  snake.unshift(head);
  snake.pop();

  if (checkSelfCollision()) return;

  moveCounter++;
  if (moveCounter % movesBeforeApple === 0) {
    generateApple();
  }

  drawSnake();
  if (apples.length > 0) {
    checkAppleCollision();
    drawApples();
  }
}

function resetGame() {
  // Supprimer toutes les pommes restantes
  apples.forEach((apple) => {
    if (apple.element) {
      apple.element.remove();
    }
  });
  apples = [];
  score = 0; // Réinitialiser le score
  scoreElement.textContent = score; // Mettre à jour l'affichage du score

  // Réinitialiser le serpent et les variables
  snake = [{ x: 2, y: 2 }];
  direction = { x: 1, y: 0 };
  moveCounter = 0;
  drawSnake();
}

setInterval(() => {
  moveSnake();
}, interval);

drawSnake();
