import {v4 as uuid} from 'uuid';
import {Action} from '@ngrx/store';
import {reducer, TodosState} from './todos.reducer';
import * as TodosActions from './todos.actions';
import {Todo} from './todos.model';

describe('Todos Reducer', () => {

  const testUuid = 'test-uuid';

  let previousState: TodosState;

  let newState: TodosState;

  let action: Action;

  beforeEach(() => {
    previousState = {
      todos: [
        {id: '1', name: 'some task', completed: false},
        {id: '2', name: 'some completed task', completed: true},
        {id: '3', name: 'just finish it', completed: false},
        {id: '4', name: 'I am done', completed: true}
      ],
      editedTodo: null
    };

    spyOn(uuid, 'v4').and.returnValue(testUuid);
  });

  describe(TodosActions.loadTodosSuccess.type, () => {

    const todos: Todo[] = [
      {id: '1', name: 'some task', completed: false},
      {id: '2', name: 'some other task', completed: false},
    ];

    beforeEach(() => {
      action = TodosActions.loadTodosSuccess({todos});
      newState = reducer(previousState, action);
    });

    it('should copy the state', () => {
      expect(newState).not.toBe(previousState);
    });

    it('should set the todos to the loaded todos', () => {
      expect(newState.todos).toBe(todos);
    });
  });

  describe(TodosActions.initNewTodo.type, () => {

    beforeEach(() => {
      action = TodosActions.initNewTodo();
      newState = reducer(previousState, action);
    });

    it('should set the editedTodo', () => {
      expect(newState.editedTodo).toBeTruthy();
    });

    it('should properly init the editedTodo', () => {
      expect(newState.editedTodo.id).toEqual(testUuid);
      expect(newState.editedTodo.name).toEqual('');
      expect(newState.editedTodo.completed).toEqual(false);
    });

  });

  describe(TodosActions.editTodo.type, () => {

    const editedTodo: Todo = {
      id: uuid(),
      name: 'some todo',
      completed: false
    };

    beforeEach(() => {
      action = TodosActions.editTodo({editedTodo});
      newState = reducer(previousState, action);
    });

    it('should set the editedTodo', () => {
      expect(newState.editedTodo).toEqual(editedTodo);
    });

  });

  describe(TodosActions.saveTodo.type, () => {

    let savedTodo: Todo;

    describe('with a new todo', () => {

      beforeEach(() => {
        savedTodo = {
          id: '42',
          completed: false,
          name: 'newly added Todo'
        };

        action = TodosActions.saveTodo({savedTodo});
        newState = reducer(previousState, action);
      });

      it('should copy the state', () => {
        expect(newState).not.toBe(previousState);
      });

      it('should copy the todos', () => {
        expect(newState.todos).not.toBe(previousState.todos);
      });

      it('should contain one more todo than in previous state', () => {
        expect(newState.todos.length).toBe(previousState.todos.length + 1);
      });

      it('should contain the savedTodo within todos', () => {
        expect(newState.todos).toContain(savedTodo);
      });

    });

    describe('with an existing todo', () => {

      beforeEach(() => {
        savedTodo = previousState.todos[0];
        savedTodo.completed = true;
        savedTodo.name += ' OK';

        action = TodosActions.saveTodo({savedTodo});
        newState = reducer(previousState, action);
      });

      it('should still contain the same number of todos as in previous state', () => {
        expect(newState.todos.length).toBe(previousState.todos.length);
      });

      it('should update the todo based on the id', () => {
        const updatedTodo = newState.todos.find((t) => t.id === savedTodo.id);
        expect(updatedTodo).toEqual(savedTodo);
      });

    });

  });

  describe(TodosActions.removeCompletedTodos.type, () => {

    describe('with completed todos', () => {

      beforeEach(() => {
        action = TodosActions.removeCompletedTodos();
        newState = reducer(previousState, action);
      });

      it('should copy the state', () => {
        expect(newState).not.toBe(previousState);
      });

      it('should copy the todos', () => {
        expect(newState.todos).not.toBe(previousState.todos);
      });

      it('should contain the proper number of todos', () => {
        expect(newState.todos.length).toBe(2);
      });

      it('should not contain any completed todos', () => {
        const todos = newState.todos.filter((t) => t.completed);
        expect(todos.length).toBe(0);
      });

      it('should still contain the not completed todos', () => {
        previousState.todos.filter((t) => !t.completed)
          .forEach((t) => expect(newState.todos).toContain(t));
      });

    });

    describe('without completed todos', () => {

      beforeEach(() => {
        // mark all todos in previous state as not completed
        previousState.todos.forEach((t) => t.completed = false);
        action = TodosActions.removeCompletedTodos();
        newState = reducer(previousState, action);
      });

      it('should copy the state', () => {
        expect(newState).not.toBe(previousState);
      });

      it('should copy the todos', () => {
        expect(newState.todos).not.toBe(previousState.todos);
      });

      it('should contain the proper number of todos', () => {
        expect(newState.todos.length).toBe(previousState.todos.length);
      });

      it('should still contain the todos from previous state', () => {
        previousState.todos.forEach((t) => expect(newState.todos).toContain(t));
      });

    });

  });

});
