import * as fromTodos from './todos.reducer';
import {TodosState} from './todos.reducer';
import {selectTodoDetailsForm, selectTodos, selectTodosState} from './todos.selectors';

describe('Todos Selectors', () => {

  const todosState: TodosState = {
    todos: [],
    todoDetailsForm: null
  };

  it('should select the feature state', () => {
    const result = selectTodosState({
      [fromTodos.todosFeatureKey]: todosState
    });

    expect(result).toEqual(todosState);
  });

  it('select the todos', () => {
    expect(selectTodos.projector(todosState)).toEqual(todosState.todos);
  });

  it('select the todoDetailsForm', () => {
    expect(selectTodoDetailsForm.projector(todosState)).toEqual(todosState.todoDetailsForm);
  });

});
