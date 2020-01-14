import produce, {Draft} from 'immer';
import {Action, ActionCreator} from '@ngrx/store';
import {ActionType} from '@ngrx/store/src/models';
import {On} from '@ngrx/store/src/reducer_creator';

/**
 * re-usable on functions for ngrx with wrap immers produce functions and allow you to simply change the state without manipulations the
 * original objects and without the hassle of (deep) cloning objects and arrays.
 *
 * Code taken from https://github.com/timdeschryver/ngrx-etc/blob/master/src/mutable-on/mutable-on.ts
 * But because ngrx-etc is incompatible with @ngrx/store 8.5.x (DisallowTypeProperty has been refactored) the relevant code has been copied.
 *
 * Warning: sometimes immer seems to manipulate (eg. when the object is a class instance) the original object, which causes problems with
 * ngrx's strictStateImmutability checks (see https://madewithlove.be/immutability-with-immer/ for more details).
 * In such cases you can see an error similar to 'ERROR TypeError: Cannot add property 0, object is not extensible'
 * within the browser's console and the state will not be changed!
 * To avoid this use interfaces and simple object rather than class instances.
 */
export type MutableOnReducer<S, C extends ActionCreator[], D = Draft<S>> = (state: D, action: ActionType<C[number]>) => void;

export function mutableOn<C1 extends ActionCreator,
  S>(
  creator1: C1,
  reducer: MutableOnReducer<S, [C1]>
): On<S>;

export function mutableOn<C1 extends ActionCreator,
  C2 extends ActionCreator,
  S>(
  creator1: C1,
  creator2: C2,
  reducer: MutableOnReducer<S, [C1, C2]>,
): On<S>;

export function mutableOn<C1 extends ActionCreator,
  C2 extends ActionCreator,
  C3 extends ActionCreator,
  S>(
  creator1: C1,
  creator2: C2,
  creator3: C3,
  reducer: MutableOnReducer<S, [C1, C2, C3]>,
): On<S>;

export function mutableOn<C1 extends ActionCreator,
  C2 extends ActionCreator,
  C3 extends ActionCreator,
  C4 extends ActionCreator,
  S>(
  creator1: C1,
  creator2: C2,
  creator3: C3,
  creator4: C4,
  reducer: MutableOnReducer<S, [C1, C2, C3, C4]>
): On<S>;

export function mutableOn<C1 extends ActionCreator,
  C2 extends ActionCreator,
  C3 extends ActionCreator,
  C4 extends ActionCreator,
  C5 extends ActionCreator,
  S>(
  creator1: C1,
  creator2: C2,
  creator3: C3,
  creator4: C4,
  creator5: C5,
  reducer: MutableOnReducer<S, [C1, C2, C3, C4, C5]>,
): On<S>;

export function mutableOn<C1 extends ActionCreator,
  C2 extends ActionCreator,
  C3 extends ActionCreator,
  C4 extends ActionCreator,
  C5 extends ActionCreator,
  C6 extends ActionCreator,
  S>(
  creator1: C1,
  creator2: C2,
  creator3: C3,
  creator4: C4,
  creator5: C5,
  creator6: C6,
  reducer: MutableOnReducer<S, [C1, C2, C3, C4, C5, C6]>,
): On<S>;

export function mutableOn<C1 extends ActionCreator,
  C2 extends ActionCreator,
  C3 extends ActionCreator,
  C4 extends ActionCreator,
  C5 extends ActionCreator,
  C6 extends ActionCreator,
  C7 extends ActionCreator,
  S>(
  creator1: C1,
  creator2: C2,
  creator3: C3,
  creator4: C4,
  creator5: C5,
  creator6: C6,
  creator7: C7,
  reducer: MutableOnReducer<S, [C1, C2, C3, C4, C5, C6, C7]>,
): On<S>;

export function mutableOn<C1 extends ActionCreator,
  C2 extends ActionCreator,
  C3 extends ActionCreator,
  C4 extends ActionCreator,
  C5 extends ActionCreator,
  C6 extends ActionCreator,
  C7 extends ActionCreator,
  C8 extends ActionCreator,
  S>(
  creator1: C1,
  creator2: C2,
  creator3: C3,
  creator4: C4,
  creator5: C5,
  creator6: C6,
  creator7: C7,
  creator8: C8,
  reducer: MutableOnReducer<S, [C1, C2, C3, C4, C5, C6, C7, C8]>,
): On<S>;

export function mutableOn<C1 extends ActionCreator,
  C2 extends ActionCreator,
  C3 extends ActionCreator,
  C4 extends ActionCreator,
  C5 extends ActionCreator,
  C6 extends ActionCreator,
  C7 extends ActionCreator,
  C8 extends ActionCreator,
  C9 extends ActionCreator,
  S>(
  creator1: C1,
  creator2: C2,
  creator3: C3,
  creator4: C4,
  creator5: C5,
  creator6: C6,
  creator7: C7,
  creator8: C8,
  creator9: C9,
  reducer: MutableOnReducer<S, [C1, C2, C3, C4, C5, C6, C7, C8, C9]>,
): On<S>;

export function mutableOn<C1 extends ActionCreator,
  C2 extends ActionCreator,
  C3 extends ActionCreator,
  C4 extends ActionCreator,
  C5 extends ActionCreator,
  C6 extends ActionCreator,
  C7 extends ActionCreator,
  C8 extends ActionCreator,
  C9 extends ActionCreator,
  C10 extends ActionCreator,
  S>(
  creator1: C1,
  creator2: C2,
  creator3: C3,
  creator4: C4,
  creator5: C5,
  creator6: C6,
  creator7: C7,
  creator8: C8,
  creator9: C9,
  creator10: C10,
  reducer: MutableOnReducer<S, [C1, C2, C3, C4, C5, C6, C7, C8, C9, C10]>,
): On<S>;

export function mutableOn<S>(
  creator: ActionCreator,
  ...rest: (ActionCreator | MutableOnReducer<S, [ActionCreator]>)[]
): On<S>;

// tslint:disable-next-line:ban-types
export function mutableOn<S>(...args: (ActionCreator | Function)[]): { reducer: Function; types: string[] } {
  // tslint:disable-next-line:ban-types
  const reducer = args.pop() as Function;
  const types = args.reduce((result, creator): string[] => [...result, (creator as ActionCreator).type], [] as string[]);

  const mutableReducer = function reduce(state: S, action: Action): S {
    const producedState = produce(state, (draft: Draft<S>): Draft<S> => reducer(draft, action));
    return producedState as S;
  };

  return {reducer: mutableReducer, types};
}
