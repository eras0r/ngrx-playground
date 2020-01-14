import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {SharedModule} from '../shared/shared.module';
import {TodosRoutingModule} from './todos-routing.module';
import {reducer, todosFeatureKey} from './todos.reducer';
import {TodosEffects} from './todos.effects';
import {TodosService} from './todos.service';
import {TodosListComponent} from './components/todos-list/todos-list.component';
import {TodosListEntryComponent} from './components/todos-list-entry/todos-list-entry.component';
import {TodoDetailsComponent} from './components/todo-details/todo-details.component';
import {TodosContainerComponent} from './containers/todos-container/todos-container.component';
import {TodoDetailsContainerComponent} from './containers/todo-details-container/todo-details-container.component';
import {TodosListEntryContainerComponent} from './containers/todos-list-entry-container/todos-list-entry-container.component';

@NgModule({
  declarations: [
    TodosContainerComponent,
    TodosListComponent,
    TodosListEntryComponent,
    TodoDetailsComponent,
    TodoDetailsContainerComponent,
    TodosListEntryContainerComponent
  ],
  providers: [
    TodosService
  ],
  imports: [
    CommonModule,
    SharedModule,
    TodosRoutingModule,
    StoreModule.forFeature(todosFeatureKey, reducer),
    EffectsModule.forFeature([TodosEffects])
  ]
})
export class TodosModule {
}
