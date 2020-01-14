import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Todo} from '../../todos.model';
import {saveTodo} from '../../todos.actions';
import {selectTodoDetailsForm} from '../../todos.selectors';
import {Observable} from 'rxjs';
import {FormGroupState} from 'ngrx-forms';
import {TodoDetailsFormState, TodosState} from '../../todos.reducer';

@Component({
  selector: 'app-todo-details-container',
  templateUrl: './todo-details-container.component.html',
  styleUrls: ['./todo-details-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoDetailsContainerComponent implements OnInit {

  todoDetailsForm$: Observable<FormGroupState<TodoDetailsFormState>>;

  constructor(private store: Store<TodosState>) {
  }

  ngOnInit() {
    this.todoDetailsForm$ = this.store.pipe(select(selectTodoDetailsForm));
  }

  saveTodo(todo: Todo): void {
    this.store.dispatch(saveTodo({savedTodo: todo}));
  }

}
