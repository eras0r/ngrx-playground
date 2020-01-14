import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {TodosState} from '../../todos.reducer';
import {Observable} from 'rxjs';
import {Todo} from '../../todos.model';
import {selectTodos} from '../../todos.selectors';
import {editTodo, initNewTodo, removeCompletedTodos, saveTodo} from '../../todos.actions';

@Component({
  selector: 'app-todos-container',
  templateUrl: './todos-container.component.html',
  styleUrls: ['./todos-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosContainerComponent implements OnInit {

  todos$: Observable<Todo[]>;

  constructor(private store: Store<TodosState>) {
  }

  ngOnInit() {
    this.todos$ = this.store.pipe(select(selectTodos));
  }

  initNewTodo() {
    this.store.dispatch(initNewTodo());
  }

  setEditedTodo(editedTodo: Todo): void {
    this.store.dispatch(editTodo({editedTodo}));
  }

  changeTodo(savedTodo: Todo): void {
    this.store.dispatch(saveTodo({savedTodo}));
  }

  removeCompleted(): void {
    this.store.dispatch(removeCompletedTodos());
  }

}
