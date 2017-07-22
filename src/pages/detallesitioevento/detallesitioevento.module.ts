import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleSitioEventoPage } from './detallesitioevento';

@NgModule({
  declarations: [
    DetalleSitioEventoPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleSitioEventoPage),
  ],
  exports: [
    DetalleSitioEventoPage
  ]
})
export class DetalleSitioEventoPageModule {}
