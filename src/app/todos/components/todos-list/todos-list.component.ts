import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Todo} from '../../todos.model';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosListComponent implements OnInit {

  @Input()
  todos: Todo [];

  @Output()
  todoChanged = new EventEmitter<Todo>();

  @Output()
  todoSelected = new EventEmitter<Todo>();

  constructor() {
  }

  ngOnInit() {
  }

}
