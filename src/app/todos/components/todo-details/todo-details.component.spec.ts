import {TodoDetailsComponent} from './todo-details.component';
import {Shallow} from 'shallow-render';
import {TodosModule} from '../../todos.module';
import {findSelector} from '../../../core/test-utils.spec';
import {ComponentFixture} from '@angular/core/testing';
import {Todo} from '../../todos.model';
import {createFormGroupState, FormGroupState} from 'ngrx-forms';
import {todoDetailsFormId, TodoDetailsFormState} from '../../todos.reducer';

describe('TodoDetailsComponent', () => {

  const testUuid = 'uuid-test';

  const todo: Todo = {
    id: testUuid,
    name: '',
    completed: false
  };

  let formState: FormGroupState<TodoDetailsFormState>;

  let shallow: Shallow<TodoDetailsComponent>;

  function getNameInput(find: findSelector) {
    return find('#todo-name').nativeElement as HTMLInputElement;
  }

  function getAddButton(find: findSelector) {
    return find('#todo-add').nativeElement as HTMLButtonElement;
  }

  beforeEach(() => {
    shallow = new Shallow(TodoDetailsComponent, TodosModule);
    formState = createFormGroupState<TodoDetailsFormState>(todoDetailsFormId, todo);
  });

  describe('without invalid form state', () => {
    it('should not dispatch the addTodo action', async () => {
      formState = {...formState, isValid: false};
      const {fixture, find, outputs} = await shallow.render({bind: {formState}});

      clickAddButton(fixture, find);

      expect(outputs.saveTodo.emit).not.toHaveBeenCalled();
    });
  });

  describe('with valid form state', () => {
    it('should dispatch the addTodo action with a new todo and the right name', async () => {
      const {fixture, find, outputs} = await shallow.render({bind: {formState}});

      clickAddButton(fixture, find);

      expect(outputs.saveTodo.emit).toHaveBeenCalled();
    });
  });

  function clickAddButton(fixture: ComponentFixture<TodoDetailsComponent>, find: findSelector) {
    const addButton = getAddButton(find);
    addButton.click();
    fixture.detectChanges();
  }

});
