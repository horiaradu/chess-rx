import GameState from "./models/game-state";

export function renderLetters(state: GameState) {
  const { letters } = state;
  const lettersElement = document.getElementById("letters");
  if (!lettersElement) { return; }

  lettersElement.innerHTML = letters.map((l) => `<li>${l}</li>`).join("");
}

export function renderWord(state: GameState) {
  const { word } = state;

  const wordElement = document.getElementById("word");
  if (!wordElement) { return; }

  wordElement.innerHTML = word.split("")
    .join(" ");
}
