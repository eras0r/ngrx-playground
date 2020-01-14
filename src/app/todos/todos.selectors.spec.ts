import * as fromTodos from './todos.reducer';
import {TodosState} from './todos.reducer';
import {selectTodosState} from './todos.selectors';

describe('Todos Selectors', () => {

  const todoState: TodosState = {
    todos: [],
    todoDetailsForm: null
  };

  it('should select the feature state', () => {
    const result = selectTodosState({
      [fromTodos.todosFeatureKey]: todoState
    });

    expect(result).toEqual(todoState);
  });

});
