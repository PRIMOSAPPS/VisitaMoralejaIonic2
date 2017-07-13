import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

import { EjemploDao } from '../../providers/dao/ejemplodao/ejemplodao';

import {Base64} from '../../providers/base-64';

import { AlertController } from 'ionic-angular';

/**
 * Generated class for the ListadoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
export abstract class ListadoPage {
  /**
  @IonicPage()
  @Component({
    selector: 'page-listado',
    templateUrl: 'listado.html',
    providers: [EjemploDao],
  })
  */

    items: Array<any>;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
      this.cargarListado();
      console.log('ionViewDidLoad ListasitiosPage');
    }

    abstract cargarListado(): void;
    abstract itemSeleccionado(event, sitio : any): void;
    /*
    cargarListado() {
      this.ejemploDao.getSitiosByIdCategoria(this.idCategoria).
        then(sitios => {this.sitios = sitios}).
        catch(err => {console.error("[ejemploDao.getSitiosByIdCategoria] Error al cargar los sitios: " + err);});
    }

    itemSeleccionado(event, sitio) {
      this.navCtrl.setRoot(DetalleSitioPage, {
        sitio: sitio
      });
    }
    */
}
