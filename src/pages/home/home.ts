import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//import { ListaSitiosPage } from '../listasitios/listasitios';
import { ListadoSitiosPage } from '../listado/listadositios';
import { MapaPage } from '../mapa/mapa';
//import { InicioEventoPage } from '../inicioevento/inicioevento';
import { ListadoEventosPage } from '../listado/listadoeventos';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  static readonly ID_CATEGORIA_CONOCE = 1;
  static readonly ID_CATEGORIA_TOMAR_ALGO = 2;
  static readonly ID_CATEGORIA_COMER = 3;
  static readonly ID_CATEGORIA_DE_COMPRAS = 4;
  static readonly ID_CATEGORIA_SERVICIOS_REPARACIONES = 5;

  constructor(public navCtrl: NavController) {

  }

  irListaSitios(event, idCategoria) {
    this.navCtrl.push(ListadoSitiosPage, {
      idCategoria: idCategoria
    });
  }

  irConoce(event) { this.irListaSitios(event, HomePage.ID_CATEGORIA_CONOCE); }
  irTomarAlgo(event) { this.irListaSitios(event, HomePage.ID_CATEGORIA_TOMAR_ALGO); }
  irComer(event) { this.irListaSitios(event, HomePage.ID_CATEGORIA_COMER); }
  irDeCompras(event) { this.irListaSitios(event, HomePage.ID_CATEGORIA_DE_COMPRAS); }
  irServiciosReparaciones(event) { this.irListaSitios(event, HomePage.ID_CATEGORIA_SERVICIOS_REPARACIONES); }

  irEventos(event) {
    this.navCtrl.push(ListadoEventosPage);
  }

}
