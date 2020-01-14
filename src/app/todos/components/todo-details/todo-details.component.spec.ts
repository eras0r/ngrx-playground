import {TodoDetailsComponent} from './todo-details.component';
import {Shallow} from 'shallow-render';
import {TodosModule} from '../../todos.module';
import {findSelector} from '../../../core/test-utils.spec';
import {ComponentFixture} from '@angular/core/testing';
import {Todo} from '../../todos.model';

describe('TodoDetailsComponent', () => {

  const testUuid = 'uuid-test';

  const todo: Todo = {
    id: testUuid,
    name: '',
    completed: false
  };

  let shallow: Shallow<TodoDetailsComponent>;

  function getNameInput(find: findSelector) {
    return find('#todo-name').nativeElement as HTMLInputElement;
  }

  function getAddButton(find: findSelector) {
    return find('#todo-add').nativeElement as HTMLButtonElement;
  }

  beforeEach(() => {
    shallow = new Shallow(TodoDetailsComponent, TodosModule);
  });

  describe('without name', () => {
    it('should not dispatch the addTodo action', async () => {
      const {fixture, find, outputs} = await shallow.render({bind: {todo}});

      const newValue = '';
      changeNameValue(find, newValue);

      clickAddButton(fixture, find);

      expect(outputs.saveTodo.emit).not.toHaveBeenCalled();
    });
  });

  describe('with name', () => {
    it('should dispatch the addTodo action with a new todo and the right name', async () => {
      const {fixture, find, outputs} = await shallow.render({bind: {todo}});

      const newValue = 'do something';
      changeNameValue(find, newValue);

      clickAddButton(fixture, find);

      expect(outputs.saveTodo.emit).toHaveBeenCalled();
    });
  });

  function changeNameValue(find: findSelector, newValue: string) {
    const nameInput = getNameInput(find);
    nameInput.value = newValue;
    nameInput.dispatchEvent(new Event('input'));
  }

  function clickAddButton(fixture: ComponentFixture<TodoDetailsComponent>, find: findSelector) {
    const addButton = getAddButton(find);
    addButton.click();
    fixture.detectChanges();
  }

});
