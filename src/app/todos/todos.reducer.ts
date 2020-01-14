import {v4 as uuid} from 'uuid';
import {Action, createReducer} from '@ngrx/store';
import {mutableOn} from '../core/mutable-on';
import * as TodosActions from './todos.actions';
import {Todo} from './todos.model';

export const todosFeatureKey = 'todos';

export interface TodosState {
  todos: Todo[];
  editedTodo: Todo;
}

export const initialState: TodosState = {
  todos: [],
  editedTodo: null
};

const todosReducer = createReducer<TodosState>(
  initialState,

  mutableOn(TodosActions.loadTodosSuccess, (state, {todos}) => {
    state.todos = todos;
  }),
  mutableOn(TodosActions.initNewTodo, (state) => {
    state.editedTodo = {
      id: uuid(),
      name: '',
      completed: false
    };
  }),
  mutableOn(TodosActions.editTodo, (state, {editedTodo}) => {
    state.editedTodo = editedTodo;
  }),
  mutableOn(TodosActions.toggleTodo, (state: TodosState, {todo}) => {
    const idx = state.todos.findIndex((t) => t.id === todo.id);
    if (idx > -1) {
      state.todos[idx].completed = !state.todos[idx].completed;
    }
  }),
  mutableOn(TodosActions.saveTodo, (state, {savedTodo}) => {
    const idx = state.todos.findIndex((t) => t.id === savedTodo.id);
    if (idx > -1) {
      state.todos[idx] = savedTodo;
    } else {
      state.todos.push(savedTodo);
    }
  }),
  mutableOn(TodosActions.removeCompletedTodos, (state) => {
    state.todos = state.todos.filter((t) => !t.completed);
  })
);

export function reducer(state: TodosState | undefined, action: Action) {
  return todosReducer(state, action);
}
