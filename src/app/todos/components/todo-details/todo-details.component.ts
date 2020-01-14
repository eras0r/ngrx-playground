import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Todo} from '../../todos.model';
import {FormGroupState} from 'ngrx-forms';
import {TodoDetailsFormState} from '../../todos.reducer';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoDetailsComponent implements OnInit {

  @Input()
  formState: FormGroupState<TodoDetailsFormState>;

  @Output()
  saveTodo = new EventEmitter<Todo>();

  constructor() {
  }

  ngOnInit() {
  }

  validateAndSaveTodo(): void {
    if (this.formState.isValid) {
      this.saveTodo.emit(this.formState.value);
    } else {
      // TODO show warning
      console.warn('Form is invalid, errors: ', this.formState.errors);
    }
  }

}
