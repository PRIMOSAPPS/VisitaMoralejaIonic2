import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SafeHtml } from '@angular/platform-browser';

import { Imagen } from '../../dto/imagen/imagen';

import { EjemploDao } from '../../providers/dao/ejemplodao/ejemplodao';

/**
 * Generated class for the InicioeventoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-inicioevento',
  templateUrl: 'inicioevento.html',
  providers: [EjemploDao],
})
export class InicioEventoPage {
  opcionesSlider = {
    //effect: 'fade',
    autoplay: 5000,
    autoplayDisableOnInteraction: false,
    loop: true,
    speed: 500,
    //pager: true
  };

  imagenes: Array<string>;
  texto: SafeHtml;

  constructor(public navCtrl: NavController, public navParams: NavParams, private ejemploDao: EjemploDao) {
    this.imagenes = new Array();
  }

  cargarImagenes() {
    this.ejemploDao.getSitioById(35).
      then(sitio => {
        this.texto = sitio.textoLargo1 + sitio.textoLargo2;
        this.borrarAsignarImagenes(sitio.imagenes);
      }).
      catch(err => {console.error("[ejemploDao.getSitiosById] Error al cargar los sitios: " + err);});
  }

  borrarAsignarImagenes(imagenes) {
    for(var i=0; i<imagenes.length; i++) {
      this.borrarAsignarImagen(imagenes[i]);
    }
  }

  borrarAsignarImagen(imagen: Imagen) {
    console.log("Imagen a asignar: " + imagen);
    if (imagen != null) {
      this.imagenes.push(imagen.imagen);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InicioeventoPage');
    this.cargarImagenes();
  }

}
