
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListadoSitiosPage } from './listadositios';

@NgModule({
  declarations: [
    ListadoSitiosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListadoSitiosPage),
  ],
  exports: [
    ListadoSitiosPage
  ]
})
export class ListadoSitiosPageModule {}
