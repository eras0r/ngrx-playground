import {createFeatureSelector, createSelector} from '@ngrx/store';
import {todosFeatureKey, TodosState} from './todos.reducer';

export const selectTodosState = createFeatureSelector<TodosState>(
  todosFeatureKey
);

export const selectTodos = createSelector(
  selectTodosState,
  (state: TodosState) => state.todos
);

export const selectTodoDetailsForm = createSelector(
  selectTodosState,
  (state: TodosState) => state.todoDetailsForm
);
