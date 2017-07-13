import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
//import {ItemListInterface, ItemList} from '../../providers/item-list-interface/item-list-interface';
import {DetalleSitioPage} from '../detallesitio/detallesitio';

//import {SitiosSqLite} from '../../providers/dao/sitios-sq-lite/sitios-sq-lite';
//import { ImagenesSqLite } from '../../providers/dao/imagenes-sitio-sqlite/imagenes-sitio-sqlite';

import { EjemploDao } from '../../providers/dao/ejemplodao/ejemplodao';

//import {Base64} from '../../providers/base-64';

import { AlertController } from 'ionic-angular';

/**
 * Generated class for the ListasitiosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-listasitios',
  templateUrl: 'listasitios.html',
  //providers: [SitiosSqLite, ImagenesSqLite],
  providers: [EjemploDao],
})
export class ListaSitiosPage {

  sitios: Array<any>;
  idCategoria: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private ejemploDao: EjemploDao) {
    this.idCategoria = navParams.get('idCategoria');
  }

  ionViewDidLoad() {
    this.cargarSitios();
    console.log('ionViewDidLoad ListasitiosPage');
  }

  cargarSitios() {
    this.ejemploDao.getSitiosByIdCategoria(this.idCategoria).
      then(sitios => {this.sitios = sitios}).
      catch(err => {console.error("[ejemploDao.getSitiosByIdCategoria] Error al cargar los sitios: " + err);});
  }

  sitioSeleccionado(event, sitio) {
    this.navCtrl.setRoot(DetalleSitioPage, {
      sitio: sitio
    });
  }

}
