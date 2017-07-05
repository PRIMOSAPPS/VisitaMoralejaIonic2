import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
//import {ItemListInterface, ItemList} from '../../providers/item-list-interface/item-list-interface';
import {DetalleSitioPage} from '../detallesitio/detallesitio';

//import {SitiosSqLite} from '../../providers/dao/sitios-sq-lite/sitios-sq-lite';
//import { ImagenesSqLite } from '../../providers/dao/imagenes-sitio-sqlite/imagenes-sitio-sqlite';

import { EjemploDao } from '../../providers/dao/ejemplodao/ejemplodao';

import {Base64} from '../../providers/base-64';

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
    this.cargarSitios();
  }
  /*
  constructor(private navCtrl: NavController, private http: Http, private sitiosSqLite : SitiosSqLite,
    private alertCtrl: AlertController) {
    this.puntoInteres = new Array();
    this.cargarSitios();
  }
  */

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListasitiosPage');
  }

  cargarSitios() {
    this.sitios = this.ejemploDao.getSitiosByIdCategoria(this.idCategoria);
    /*
    this.sitiosSqLite.getAll().then(
      (items) => { this.puntoInteres = items; },
    ).catch((ex) => { console.error("[ListPuntosInteresPage.cargar] Excepcion al cargar las notificaciones: " + ex); });
    */
  }

  /*
  cargarSitio(i: number) {
    var fich = "sitios/sitios_json_${i}.json";
    fich = "sitios/sitios_json_" + i + ".json";
    this.http.get(fich)
      .subscribe(data => {
        var datos = data.json();
        //var textoDecode = decodeURIComponent(Array.prototype.map.call(atob(datos.nombre), function(c) {return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);}).join(''));
        var textoDecode = Base64.decode(datos.nombre);
        //var item = new ItemList(textoDecode, 'flask');//datos.logotipo);
        var item = { "texto": textoDecode, "iconoBase64": 'flask' };
        this.puntoInteres.push(item);

        console.log("Cargado correctamente el sitio: " + datos.nombre + " --- " + item.texto);
      }, error => {
        console.log("Error cargando el sitio " + i);
      });
  }
  */

  sitioSeleccionado(event, sitio) {
    this.navCtrl.setRoot(DetalleSitioPage, {
      sitio: sitio
    });
  }

}
