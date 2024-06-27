import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SetProductosComponent } from './set-productos/set-productos.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    SetProductosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ], 
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
})
export class BackendModule { }
