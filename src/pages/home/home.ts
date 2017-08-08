import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//import { ListaSitiosPage } from '../listasitios/listasitios';
import { ListadoSitiosPage } from '../listado/listadositios';
import { MapaPage } from '../mapa/mapa';
//import { InicioEventoPage } from '../inicioevento/inicioevento';
import { ListadoEventosPage } from '../listado/listadoeventos';
import { Constantes } from '../../otros/constantes/constantes';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {



  constructor(public navCtrl: NavController) {

  }

  irListaSitios(event, idCategoria) {
    this.navCtrl.push(ListadoSitiosPage, {
      idCategoria: idCategoria
    });
  }

  irConoce(event) { this.irListaSitios(event, Constantes.ID_CATEGORIA_CONOCE); }
  irTomarAlgo(event) { this.irListaSitios(event, Constantes.ID_CATEGORIA_TOMAR_ALGO); }
  irComer(event) { this.irListaSitios(event, Constantes.ID_CATEGORIA_COMER); }
  irDeCompras(event) { this.irListaSitios(event, Constantes.ID_CATEGORIA_DE_COMPRAS); }
  irServiciosReparaciones(event) { this.irListaSitios(event, Constantes.ID_CATEGORIA_SERVICIOS_REPARACIONES); }

  irEventos(event) {
    this.navCtrl.push(ListadoEventosPage);
  }

}
