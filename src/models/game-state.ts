export default interface GameState {
  word: string;
  solution: string;
  letters: string[];
}

export function initialState() {
  const solution = "house";
  return { word: Array(solution.length).join("_"), letters: [], solution };
}
