import "bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { fromEvent } from "rxjs/observable/fromEvent";
import { never } from "rxjs/observable/never";
import { distinctUntilChanged } from "rxjs/operators/distinctUntilChanged";
import { filter } from "rxjs/operators/filter";
import { map } from "rxjs/operators/map";
import { withLatestFrom } from "rxjs/operators/withLatestFrom";

import GameState, { addLetter, initialState } from "./models/game-state";
import { renderLetters, renderWord } from "./renderer";

function inputObservable(): Observable<string> {
  const letterInput = document.getElementById("letter-input");
  if (!letterInput) {
    return never<string>();
  }

  return fromEvent<KeyboardEvent>(letterInput, "keyup").pipe(
    map((e) => (e.target as HTMLInputElement).value),
    filter((s) => s.length > 0),
    distinctUntilChanged(),
  );
}

const stateSubject = new BehaviorSubject<GameState>(initialState());

inputObservable()
  .pipe(
  withLatestFrom(stateSubject),
  map(([key, currentState]) => addLetter(key, currentState)),
  )
  .subscribe((nextState) => stateSubject.next(nextState));

stateSubject
  .subscribe((state) => {
    renderLetters(state);
    renderWord(state);
  });
