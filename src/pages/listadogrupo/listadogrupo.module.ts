import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListadoGrupoPage } from './listadogrupo';

@NgModule({
  declarations: [
    ListadoGrupoPage,
  ],
  imports: [
    IonicPageModule.forChild(ListadoGrupoPage),
  ],
  exports: [
    ListadoGrupoPage
  ]
})
export class ListadoGrupoPageModule {}
