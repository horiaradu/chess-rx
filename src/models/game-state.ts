export default interface GameState {
  word: string;
  solution: string;
  letters: string[];
}

export function initialState() {
  const solution = "house";
  return { word: Array(solution.length + 1).join("_"), letters: [], solution };
}

export function addLetter(letter: string, state: GameState) {
  return {
    ...state,
    letters: [letter, ...state.letters],
    word: state.word.split("")
      .map((w, idx) => {
        if (w === "_" && state.solution[idx] === letter) {
          return letter;
        }
        return w;
      })
      .join(""),
  };
}
