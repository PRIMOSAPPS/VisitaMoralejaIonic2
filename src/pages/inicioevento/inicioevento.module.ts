import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InicioEventoPage } from './inicioevento';

@NgModule({
  declarations: [
    InicioEventoPage,
  ],
  imports: [
    IonicPageModule.forChild(InicioEventoPage),
  ],
  exports: [
    InicioEventoPage
  ]
})
export class InicioEventoPageModule {}
