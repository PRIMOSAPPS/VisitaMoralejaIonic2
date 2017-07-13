import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ListadoPage } from './listado';
import {DetalleSitioPage} from '../detallesitio/detallesitio';

import { EjemploDao } from '../../providers/dao/ejemplodao/ejemplodao';

@IonicPage()
@Component({
  selector: 'page-listado',
  templateUrl: 'listado.html',
  providers: [EjemploDao],
})
export class ListadoSitiosPage extends ListadoPage {

    idCategoria: number;

    constructor(public navCtrl: NavController, public navParams: NavParams, private ejemploDao: EjemploDao) {
      super(navCtrl, navParams);
      this.idCategoria = navParams.get('idCategoria');
    }

    cargarListado() {
      this.ejemploDao.getSitiosByIdCategoria(this.idCategoria).
        then(sitios => {this.items = sitios}).
        catch(err => {console.error("[ejemploDao.getSitiosByIdCategoria] Error al cargar los sitios: " + err);});
    }

    itemSeleccionado(event, sitio) {
      this.navCtrl.setRoot(DetalleSitioPage, {
        sitio: sitio
      });
    }
}
