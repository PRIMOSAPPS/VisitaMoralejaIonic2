import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListadoEventosPage } from './listadoeventos';

@NgModule({
  declarations: [
    ListadoEventosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListadoEventosPage),
  ],
  exports: [
    ListadoEventosPage
  ]
})
export class ListadoEventosPageModule {}
