import {Shallow} from 'shallow-render';
import {Store} from '@ngrx/store';

import {TodosContainerComponent} from './todos-container.component';
import {provideMockStore} from '@ngrx/store/testing';
import {TodosState} from '../../todos.reducer';
import {TodosModule} from '../../todos.module';
import {initNewTodo, removeCompletedTodos} from '../../todos.actions';
import {TodosListComponent} from '../../components/todos-list/todos-list.component';

// TODO focus
fdescribe('TodosContainerComponent', () => {
  const initialState: TodosState = {todos: [], editedTodo: null};

  let shallow: Shallow<TodosContainerComponent>;

  beforeEach(() => {
    shallow = new Shallow(TodosContainerComponent, TodosModule)
      .provideMock(provideMockStore({
        initialState: {todos: initialState}
      }));
  });

  it('should contain a app-todo-details-container component', async () => {
    const {fixture, find} = await shallow.render();
    const todoDetailsElem = find('app-todo-details-container');

    expect(todoDetailsElem).toBeDefined();
  });

  it('should contain a todo-list component', async () => {
    const {fixture, find} = await shallow.render();
    const todosListElem = find('app-todos-list');
    const todosListComp = todosListElem.componentInstance as TodosListComponent;

    expect(todosListElem).toBeDefined();
    expect(todosListComp.todos).toEqual(initialState.todos);
  });

  it('should dispatch the removeCompleted action when clicking on the remove completed button', async () => {
    const {fixture, find} = await shallow.render();
    const buttonElem = find('#remove-completed');

    const store = fixture.debugElement.injector.get<Store<TodosState>>(Store);
    spyOn(store, 'dispatch');

    buttonElem.nativeElement.click();

    expect(store.dispatch).toHaveBeenCalledWith(removeCompletedTodos());
  });

  it('should dispatch the initNewTodo action when clicking on the new Todo button', async () => {
    const {fixture, find} = await shallow.render();
    const buttonElem = find('#init-new');

    const store = fixture.debugElement.injector.get<Store<TodosState>>(Store);
    spyOn(store, 'dispatch');

    buttonElem.nativeElement.click();

    expect(store.dispatch).toHaveBeenCalledWith(initNewTodo());
  });

});
