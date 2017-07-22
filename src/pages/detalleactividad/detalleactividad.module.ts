import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleActividadPage } from './detalleactividad';

@NgModule({
  declarations: [
    DetalleActividadPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleActividadPage),
  ],
  exports: [
    DetalleActividadPage
  ]
})
export class DetalleactividadPageModule {}
