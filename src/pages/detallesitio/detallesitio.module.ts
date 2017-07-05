import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleSitioPage } from './detallesitio';

@NgModule({
  declarations: [
    DetalleSitioPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleSitioPage),
  ],
  exports: [
    DetalleSitioPage
  ]
})
export class DetallesitioPageModule {}
