import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { VehicleImageComponent } from './vehicle-image/vehicle-image.component';

@NgModule({
  declarations: [
    AppComponent,
    VehicleFormComponent,
    VehicleImageComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({}, {}),
    FormsModule,// Necessary for form bindings like ngModel
    ReactiveFormsModule// Necessary for reactive form bindings
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
