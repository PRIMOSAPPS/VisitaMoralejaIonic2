import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaSitiosPage } from './listasitios';

@NgModule({
  declarations: [
    ListaSitiosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaSitiosPage),
  ],
  exports: [
    ListaSitiosPage
  ]
})
export class ListaSitiosPageModule {}
