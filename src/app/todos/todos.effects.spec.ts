import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs';
import {cold, hot} from 'jasmine-marbles';

import {TodosEffects} from './todos.effects';
import * as TodosActions from './todos.actions';
import {TodosService} from './todos.service';
import {Todo} from './todos.model';

describe('TodosEffects', () => {
  let actions$: Observable<any>;
  let effects: TodosEffects;
  let todosServiceSuccessStub: Partial<TodosService>;
  let todosServiceErrorStub: Partial<TodosService>;

  const mockTodos: Todo[] = [
    {id: '1', name: 'some todo', completed: false}
  ];

  const loadTodosError = new Error('error loading todos');

  todosServiceSuccessStub = {
    loadTodos: () => {
      return cold('--b', {b: mockTodos});
    }
  };

  todosServiceErrorStub = {
    loadTodos: () => {
      // # emits the given error
      return cold('--#', null, loadTodosError);
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodosEffects,
        {provide: TodosService, useValue: todosServiceErrorStub},
        provideMockActions(() => actions$)
      ]
    });
  });

  describe('loadTodos() success', () => {

    beforeEach(() => {
      TestBed.overrideProvider(TodosService, {useValue: todosServiceSuccessStub});
      effects = TestBed.get<TodosEffects>(TodosEffects);
    });

    it('should dispatch loadTodosSuccess action', () => {
      actions$ = hot('-a-', {
        a: TodosActions.loadTodos()
      });

      const expected = cold('---c', {
        c: TodosActions.loadTodosSuccess({todos: mockTodos})
      });

      expect(effects.loadTodos$).toBeObservable(expected);
    });


  });

  describe('loadTodos() error', () => {

    beforeEach(() => {
      TestBed.overrideProvider(TodosService, {useValue: todosServiceErrorStub});
      effects = TestBed.get<TodosEffects>(TodosEffects);
    });

    it('should dispatch loadTodosFailure action', () => {
      actions$ = hot('-a-', {
        a: TodosActions.loadTodos()
      });

      const expected = cold('---c', {
        c: TodosActions.loadTodosFailure({error: loadTodosError})
      });

      expect(effects.loadTodos$).toBeObservable(expected);
    });

  });

});
