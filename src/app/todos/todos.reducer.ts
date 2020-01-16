import {v4 as uuid} from 'uuid';
import {Action, createReducer} from '@ngrx/store';
import {mutableOn} from '../core/mutable-on';
import * as TodosActions from './todos.actions';
import {Todo} from './todos.model';
import {createFormGroupState, FormGroupState, onNgrxForms, updateGroup, validate, wrapReducerWithFormStateUpdate} from 'ngrx-forms';
import {minLength, required} from 'ngrx-forms/validation';

export const todosFeatureKey = 'todos';

export const todoDetailsFormId = 'todos.details.form';

export interface TodoDetailsFormState {
  id: string;
  name: string;
  completed: boolean;
}

export interface TodosState {
  todos: Todo[];
  todoDetailsForm: FormGroupState<TodoDetailsFormState>;
}

export function initTodoFormState(): FormGroupState<TodoDetailsFormState> {
  return createFormGroupState<TodoDetailsFormState>(todoDetailsFormId, {
    id: uuid(),
    name: '',
    completed: false
  });
}

export const initialState: TodosState = {
  todos: [],
  todoDetailsForm: initTodoFormState()
};

const todosReducer = createReducer<TodosState>(
  initialState,

  // ngrx forms reducer
  onNgrxForms(),

  mutableOn(TodosActions.loadTodosSuccess, (state, {todos}) => {
    state.todos = todos;
  }),
  mutableOn(TodosActions.initNewTodo, (state: TodosState) => {
    state.todoDetailsForm = initTodoFormState();
  }),
  mutableOn(TodosActions.editTodo, (state: TodosState, {editedTodo}) => {
    state.todoDetailsForm = createFormGroupState<TodoDetailsFormState>(todoDetailsFormId, editedTodo);
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

// this function updates a form group state based on the passed
// update functions (see the sections below for more details on
// all available update functions as well as on updating groups)
export const validateTodoDetailsForm = updateGroup<TodoDetailsFormState>({
  id: validate(required),
  name: validate(required, minLength(3))
});

// wrapReducerWithFormStateUpdate calls the update function
// after the given reducer; you can wrap this reducer again
// if you have multiple forms in your state
export function reducer(state = initialState, action: Action) {
  return wrapReducerWithFormStateUpdate(
    todosReducer,
    s => s.todoDetailsForm,
    validateTodoDetailsForm
  )
  (state, action);
}
