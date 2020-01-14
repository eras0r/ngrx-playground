import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map} from 'rxjs/operators';
import {of} from 'rxjs';

import * as TodosActions from './todos.actions';
import {TodosService} from './todos.service';

@Injectable()
export class TodosEffects {

  loadTodos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodosActions.loadTodos),
      concatMap(() => {
          return this.todosService.loadTodos()
            .pipe(
              map(todos => TodosActions.loadTodosSuccess({todos})),
              catchError(error => of(TodosActions.loadTodosFailure({error})))
            );
        }
      ));
  });

  constructor(private actions$: Actions, private todosService: TodosService) {
  }

}
