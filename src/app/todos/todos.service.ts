import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Todo} from './todos.model';

@Injectable()
export class TodosService {

  constructor(private http: HttpClient) {
  }

  loadTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('/todos/');
  }

}
