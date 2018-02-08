import 'bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { never } from 'rxjs/observable/never';
import { map } from 'rxjs/operators/map';
import { filter } from 'rxjs/operators/filter';
import { withLatestFrom } from 'rxjs/operators/withLatestFrom';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

interface GameState {
  word: string,
  letters: Array<string>
}
const initialState = { word: 'house', letters: [] }

function inputObservable(): Observable<string> {
  const letterInput = document.getElementById('letter-input');
  if (!letterInput) {
    return never<string>();
  }

  return fromEvent<KeyboardEvent>(letterInput, 'keyup').pipe(
    map(e => (<HTMLInputElement>e.target).value),
    filter(s => s.length > 0),
    distinctUntilChanged()
  );
}

function renderLetters(state: GameState) {
  const { letters } = state;
  const lettersElement = document.getElementById('letters');
  if (!lettersElement) return;

  lettersElement.innerHTML = letters.map(l => `<li>${l}</li>`).join("");
}

function renderWord(state: GameState) {
  const { word } = state;

  const wordElement = document.getElementById('word');
  if (!wordElement) return;

  wordElement.innerHTML = word.split("")
    .map(l => "_")
    .join(" ")
}

const stateSubject = new BehaviorSubject<GameState>(initialState);

inputObservable()
  .pipe(
  withLatestFrom(stateSubject)
  )
  .subscribe(([key, currentState]) => {
    stateSubject.next({ ...currentState, letters: [key, ...currentState.letters] });
  });

stateSubject
  .subscribe(state => {
    renderLetters(state);
    renderWord(state);
  })