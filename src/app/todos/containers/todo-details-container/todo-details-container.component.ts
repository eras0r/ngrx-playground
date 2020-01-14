import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Todo} from '../../todos.model';
import {saveTodo} from '../../todos.actions';
import {selectEditedTodo} from '../../todos.selectors';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-todo-details-container',
  templateUrl: './todo-details-container.component.html',
  styleUrls: ['./todo-details-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoDetailsContainerComponent implements OnInit {

  editedTodo$: Observable<Todo>;

  constructor(private store: Store<any>) {
  }

  ngOnInit() {
    this.editedTodo$ = this.store.pipe(select(selectEditedTodo));
  }

  saveTodo(todo: Todo): void {
    this.store.dispatch(saveTodo({savedTodo: todo}));
  }

}
