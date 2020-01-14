import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {TodosContainerComponent} from './containers/todos-container/todos-container.component';

const routes: Routes = [
  {
    path: '',
    component: TodosContainerComponent,
    data: {title: 'app.menu.todos'}
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TodosRoutingModule {
}
