import {TodosListEntryComponent} from './todos-list-entry.component';
import {Todo} from '../../todos.model';
import {Shallow} from 'shallow-render';
import {TodosModule} from '../../todos.module';
import {findSelector} from '../../../core/test-utils.spec';

describe('TodosListEntryComponent', () => {

  let shallow: Shallow<TodosListEntryComponent>;

  const todo: Todo = {
    id: '1',
    name: 'some todo',
    completed: false
  };

  beforeEach(async () => {
    shallow = new Shallow(TodosListEntryComponent, TodosModule);
  });

  function getTodoNameElement(find: findSelector) {
    return find('#todo-name').nativeElement as HTMLElement;
  }

  function getCompletedCheckboxElement(find: findSelector) {
    return find('#todo-completed').nativeElement as HTMLElement;
  }

  it('should show the name of the todo within todo.input', async () => {
    const {fixture, find} = await shallow.render({bind: {todo}});

    const outputElem = getTodoNameElement(find);
    expect(outputElem.textContent).toContain(todo.name);
  });

  it('should emit todoChanged with the changed todo when clicking the completed checkbox', async () => {
    const {fixture, find, outputs} = await shallow.render({bind: {todo}});

    getCompletedCheckboxElement(find).click();
    fixture.detectChanges();

    expect(outputs.todoToggled.emit).toHaveBeenCalledWith(todo);
  });

});
