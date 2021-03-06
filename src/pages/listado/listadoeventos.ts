import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ListadoPage } from './listado';
import { InicioEventoPage } from '../inicioevento/inicioevento';

import { EjemploEventosDao } from '../../providers/dao/ejemplodao/ejemploeventosdao';

@IonicPage()
@Component({
  selector: 'page-listado',
  templateUrl: 'listado.html',
  providers: [EjemploEventosDao],
})
export class ListadoEventosPage extends ListadoPage {

    //idCategoria: number;

    constructor(public navCtrl: NavController, public navParams: NavParams, private ejemploDao: EjemploEventosDao) {
      super(navCtrl, navParams);
      //this.idCategoria = navParams.get('idCategoria');
    }

    cargarListado() {
      this.ejemploDao.getEventos().
        then(eventos => {console.log("Recibidos los eventos: " + eventos.length); this.items = eventos}).
        catch(err => {console.error("[ejemploDao.getEventos] Error al cargar los eventos: " + err);});
    }

    itemSeleccionado(event, evento) {
      this.navCtrl.setRoot(InicioEventoPage, {
        evento: evento
      });
    }
}
