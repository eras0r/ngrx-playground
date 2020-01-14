import {createAction, props} from '@ngrx/store';
import {Todo} from './todos.model';

export const loadTodos = createAction(
  '[Todos] Load Todos'
);

export const loadTodosSuccess = createAction(
  '[Todos] Load Todos Success',
  props<{ todos: Todo[] }>()
);

export const loadTodosFailure = createAction(
  '[Todos] Load Todos Failure',
  props<{ error: any }>()
);

export const initNewTodo = createAction(
  '[Todos] Init new Todo'
);

export const editTodo = createAction(
  '[Todos] Edit Todo',
  props<{ editedTodo: Todo }>()
);

export const saveTodo = createAction(
  '[Todos] Save Todo',
  props<{ savedTodo: Todo }>()
);

export const toggleTodo = createAction(
  '[Todos] Toggle Todo',
  props<{ todo: Todo }>()
);

export const removeCompletedTodos = createAction(
  '[Todos] Remove completed Todos'
);
