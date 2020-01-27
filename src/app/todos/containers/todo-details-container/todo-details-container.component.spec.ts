import {v4 as uuid} from 'uuid';
import {ComponentFixture} from '@angular/core/testing';
import {Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {Shallow} from 'shallow-render';

import {TodoDetailsContainerComponent} from './todo-details-container.component';
import {TodosState} from '../../todos.reducer';
import {TodosModule} from '../../todos.module';
import {TodoDetailsComponent} from '../../components/todo-details/todo-details.component';
import {saveTodo} from '../../todos.actions';
import {Todo} from '../../todos.model';

// TODO focus
fdescribe('TodoDetailsContainerComponent', () => {

  const initialState: TodosState = {todos: [], editedTodo: {id: '1', name: 'shred some trails', completed: false}};

  let shallow: Shallow<TodoDetailsContainerComponent>;

  beforeEach(() => {
    shallow = new Shallow(TodoDetailsContainerComponent, TodosModule)
      .provideMock(provideMockStore({
        initialState: {todos: initialState}
      }));
  });

  it('should contain a app-todo-details component', async () => {
    const {fixture, find} = await shallow.render();
    const todosListElem = find('app-todo-details');
    const todoDetailsComp = todosListElem.componentInstance as TodoDetailsComponent;

    expect(todosListElem).toBeDefined();
    expect(todoDetailsComp.todo).toEqual(initialState.editedTodo);
  });

  it('should dispatch the saveTodo action with the given todo', async () => {
    const {instance, fixture, find} = await shallow.render();

    const store = setupStoreMock(fixture);

    const todo: Todo = {
      id: uuid(),
      name: 'some todo',
      completed: false
    };

    instance.saveTodo(todo);

    expect(store.dispatch).toHaveBeenCalledWith(saveTodo({savedTodo: todo}));
  });

  function setupStoreMock(fixture: ComponentFixture<TodoDetailsComponent>) {
    const store = fixture.debugElement.injector.get<Store<TodosState>>(Store);
    spyOn(store, 'dispatch');
    return store;
  }

});
