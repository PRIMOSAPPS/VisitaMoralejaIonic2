
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListadoSitiosEventoPage } from './listadositiosevento';

@NgModule({
  declarations: [
    ListadoSitiosEventoPage,
  ],
  imports: [
    IonicPageModule.forChild(ListadoSitiosEventoPage),
  ],
  exports: [
    ListadoSitiosEventoPage
  ]
})
export class ListadoSitiosEventoPageModule {}
