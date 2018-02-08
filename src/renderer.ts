import GameState from "./models/game-state";

export function renderLetters(state: GameState) {
  const { letters } = state;
  const lettersElement = document.getElementById("letters");
  if (!lettersElement) {
    return;
  }

  lettersElement.innerHTML = letters.map(l => `<li>${l}</li>`).join("");
}

export function renderWord(state: GameState) {
  const { word } = state;

  const wordElement = document.getElementById("word");
  if (!wordElement) {
    return;
  }

  wordElement.innerHTML = word.join(" ");
}

export function renderLives(state: GameState) {
  const { lives } = state;

  const livesElement = document.getElementById("lives");
  if (!livesElement) {
    return;
  }

  console.log(
    Array(lives).fill(
      `<li><i class="fa fa-fw fa-heart" aria-hidden="true"></i></li>`,
    ),
  );

  if (lives !== 0) {
    livesElement.innerHTML = Array(lives)
      .fill(`<li><i class="fa fa-fw fa-heart" aria-hidden="true"></i></li>`)
      .join("");
  }
}

export function renderScore(state: GameState) {
  const { lives, word } = state;

  const won = lives !== 0 && word.every(x => x !== "_");
  const scoreElement = document.getElementById("score");
  if (!scoreElement) {
    return;
  }

  if (won) {
    scoreElement.innerHTML = "You've won!";
  } else if (lives === 0) {
    scoreElement.innerHTML = "You're dead!";
  }
}

export function enableInput(state: GameState) {
  const { lives } = state;

  if (lives === 0) {
    const input = document.getElementById("letter-input") as HTMLInputElement;
    input.disabled = true;
  }
}
