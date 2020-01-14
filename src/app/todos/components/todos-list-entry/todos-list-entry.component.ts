import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Todo} from '../../todos.model';

@Component({
  selector: 'app-todos-list-entry',
  templateUrl: './todos-list-entry.component.html',
  styleUrls: ['./todos-list-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosListEntryComponent implements OnInit {

  @Input()
  todo: Todo;

  @Output()
  todoSelected = new EventEmitter<Todo>();

  @Output()
  todoToggled = new EventEmitter<Todo>();

  constructor() {
  }

  ngOnInit() {
  }

  toggleTodo(): void {
    this.todoToggled.emit(this.todo);
  }

  toggleEditing(): void {
    this.todoSelected.emit(this.todo);
  }

}
