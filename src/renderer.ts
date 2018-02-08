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

  if (lives === 0) {
    livesElement.innerHTML = "You're dead!";
  } else {
    livesElement.innerHTML = Array(lives)
      .fill("<li><3</li>")
      .join("");
  }
}

export function enableInput(state: GameState) {
  const { lives } = state;

  if (lives === 0) {
    const input = document.getElementById("letter-input") as HTMLInputElement;
    input.disabled = true;
  }
}
