import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DetalleActividadPage } from '../detalleactividad/detalleactividad';

import { ActividadEvento } from '../../dto/eventos/actividadevento/actividadevento';

//import { EjemploEventosDao } from '../../providers/dao/ejemplodao/ejemploeventosdao';

@Component({
  templateUrl: './listadoactividadesmapaevento.html'
})
export class ListadoActividadesMapaEventoPage {

    idEvento: number;
    items: Array<ActividadEvento>;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.idEvento = navParams.get('idEvento');
      this.items = navParams.get('actividades');
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad ListasitiosPage');
    }

    itemSeleccionado(event, actividad) {
      this.navCtrl.setRoot(DetalleActividadPage, {
        actividad: actividad
      });
    }
}
