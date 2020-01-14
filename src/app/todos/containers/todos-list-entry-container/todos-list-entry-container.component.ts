import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Todo} from '../../todos.model';
import {TodosState} from '../../todos.reducer';
import {editTodo, toggleTodo} from '../../todos.actions';

@Component({
  selector: 'app-todos-list-entry-container',
  templateUrl: './todos-list-entry-container.component.html',
  styleUrls: ['./todos-list-entry-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosListEntryContainerComponent implements OnInit {

  @Input()
  todo: Todo;

  constructor(private store: Store<TodosState>) {
  }

  ngOnInit() {
  }

  toggleTodo(todo: Todo) {
    this.store.dispatch(toggleTodo({todo}));
  }

  selectTodo(todo: Todo) {
    this.store.dispatch(editTodo({editedTodo: todo}));
  }

}
