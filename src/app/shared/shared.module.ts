import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgrxFormsModule} from 'ngrx-forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    FormsModule,
    ReactiveFormsModule,
    NgrxFormsModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NgrxFormsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule {
}
