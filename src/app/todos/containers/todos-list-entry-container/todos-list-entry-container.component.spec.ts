import {ComponentFixture} from '@angular/core/testing';

import {Store} from '@ngrx/store';
import {TodosListEntryContainerComponent} from './todos-list-entry-container.component';
import {Shallow} from 'shallow-render';
import {TodosModule} from '../../todos.module';
import {provideMockStore} from '@ngrx/store/testing';
import {TodosState} from '../../todos.reducer';

describe('TodosListEntryContainerComponent', () => {

  const initialState: TodosState = {todos: [], editedTodo: null};

  let shallow: Shallow<TodosListEntryContainerComponent>;

  beforeEach(() => {
    shallow = new Shallow(TodosListEntryContainerComponent, TodosModule)
      .provideMock(provideMockStore({
        initialState: {todos: initialState}
      }));
  });

  it('should render a todos-list-entry', async () => {
    const {instance, fixture, find} = await shallow.render();

    const store = setupStoreMock(fixture);

    const todoListEntryElem = find('app-todos-list-entry');

    expect(todoListEntryElem).toBeDefined();
  });

  function setupStoreMock(fixture: ComponentFixture<TodosListEntryContainerComponent>) {
    const store = fixture.debugElement.injector.get<Store<TodosState>>(Store);
    spyOn(store, 'dispatch');
    return store;
  }
});
