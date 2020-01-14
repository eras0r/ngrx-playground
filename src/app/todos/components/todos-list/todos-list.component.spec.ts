import {TodosListComponent} from './todos-list.component';
import {Shallow} from 'shallow-render';
import {TodosModule} from '../../todos.module';
import {Todo} from '../../todos.model';
import {TodosListEntryContainerComponent} from '../../containers/todos-list-entry-container/todos-list-entry-container.component';

describe('TodosListComponent', () => {

  let shallow: Shallow<TodosListComponent>;

  const todos: Todo[] = [
    {
      id: '1',
      name: 'some todo',
      completed: false
    },
    {
      id: '2',
      name: 'some other todo',
      completed: false
    }
  ];

  beforeEach(() => {
    shallow = new Shallow(TodosListComponent, TodosModule);
  });

  it('should display a todo-list entry foreach todo', async () => {
    const {fixture, find, findComponent} = await shallow.render({bind: {todos}});

    const todoEntries = findComponent(TodosListEntryContainerComponent);
    expect(todoEntries.length).toBe(todos.length);

    let i = 0;

    // check binding foreach entry
    todoEntries.map((entry) => {
      expect(entry.todo).toBe(todos[i]);
      i++;
    });
  });

});
