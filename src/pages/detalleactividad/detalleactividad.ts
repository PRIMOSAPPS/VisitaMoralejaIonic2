import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SafeHtml } from '@angular/platform-browser';

import { ImagenActividadEvento } from '../../dto/eventos/imagenes/imagenactividadevento';
import { ActividadEvento } from '../../dto/eventos/actividadevento/actividadevento';

/**
 * Generated class for the DetalleactividadPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detalleactividad',
  templateUrl: 'detalleactividad.html',
})
export class DetalleActividadPage {
  opcionesSlider = {
    //effect: 'fade',
    autoplay: 5000,
    autoplayDisableOnInteraction: false,
    loop: true,
    speed: 500,
    //pager: true
  };

  actividad: ActividadEvento;
  texto: SafeHtml;
  imagenes: Array<string>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.actividad = navParams.get('actividad');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleactividadPage');
    this.texto = this.actividad.texto;
    this.asignarImagenes(this.actividad.imagenes);
  }

  private asignarImagenes(imagenes) {
    this.imagenes = new Array<string>();
    for(var i=0; i<imagenes.length; i++) {
      this.asignarImagen(imagenes[i]);
    }
  }

  private asignarImagen(imagen: ImagenActividadEvento) {
    console.log("Imagen a asignar: " + imagen);
    if (imagen != null) {
      this.imagenes.push(imagen.imagen);
    }
  }

}
