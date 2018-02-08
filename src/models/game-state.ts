export default interface GameState {
  word: string[];
  solution: string;
  letters: string[];
  lives: number;
};

export function initialState() {
  const solution = "house";
  return {
    word: Array(solution.length).fill("_"),
    letters: [],
    solution,
    lives: 3,
  };
}

export function addLetter(letter: string, state: GameState) {
  const containsLetter = state.solution.indexOf(letter) !== -1;
  return {
    ...state,
    letters: [letter, ...state.letters],
    word: state.word.map((w, idx) => {
      if (w === "_" && state.solution[idx] === letter) {
        return letter;
      }
      return w;
    }),
    lives: containsLetter ? state.lives : state.lives - 1,
  };
}
