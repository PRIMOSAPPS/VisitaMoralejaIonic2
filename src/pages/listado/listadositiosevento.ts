import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ListadoPage } from './listado';
import {DetalleSitioPage} from '../detallesitio/detallesitio';

import { EjemploEventosDao } from '../../providers/dao/ejemplodao/ejemploeventosdao';

@IonicPage()
@Component({
  selector: 'page-listado',
  templateUrl: 'listado.html',
  providers: [EjemploEventosDao],
})
export class ListadoSitiosEventoPage extends ListadoPage {

    idEvento: number;

    constructor(public navCtrl: NavController, public navParams: NavParams, private ejemploDao: EjemploEventosDao) {
      super(navCtrl, navParams);
      this.idEvento = navParams.get('idEvento');
    }

    cargarListado() {
      this.ejemploDao.getSitiosEventoByIdEvento(this.idEvento).
        then(sitios => {this.items = sitios}).
        catch(err => {console.error("[ejemploDao.getSitiosEventoByIdEvento] Error al cargar los sitios del evento: " + err);});
    }

    itemSeleccionado(event, sitio) {
      this.navCtrl.setRoot(DetalleSitioPage, {
        sitio: sitio
      });
    }
}
