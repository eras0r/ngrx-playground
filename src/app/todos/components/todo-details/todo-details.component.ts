import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Todo} from '../../todos.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoDetailsComponent implements OnInit {

  private _todo: Todo;

  @Output()
  saveTodo = new EventEmitter<Todo>();

  todoFormGroup: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
  }

  validateAndSaveTodo(): void {
    if (this.todoFormGroup.valid) {
      this.saveTodo.emit(this.todoFormGroup.value);
    } else {
      // TODO show warning
      console.warn('Form is invalid');
    }
  }

  get todo(): Todo {
    return this._todo;
  }

  @Input()
  set todo(value: Todo) {
    this._todo = value;
    if (value) {
      this.todoFormGroup = this.fb.group({
        id: [value.id],
        name: [value.name, Validators.required],
        completed: [value.completed]
      });
    }
  }

}
