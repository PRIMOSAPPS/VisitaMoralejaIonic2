import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SafeHtml } from '@angular/platform-browser';

import { ImagenEvento } from '../../dto/eventos/imagenes/imagenevento';

import { Evento } from '../../dto/eventos/evento/evento';

import { EjemploDao } from '../../providers/dao/ejemplodao/ejemplodao';
import { EjemploEventosDao } from '../../providers/dao/ejemplodao/ejemploeventosdao';

import { ListadoSitiosEventoPage } from '../listado/listadositiosevento';
import { ListadoGrupoPage } from '../listadogrupo/listadogrupo';

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
  providers: [EjemploEventosDao],
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

  evento: Evento;
  imagenes: Array<string>;
  texto: SafeHtml;

  constructor(public navCtrl: NavController, public navParams: NavParams, private ejemploDao: EjemploEventosDao) {
    this.evento = navParams.get('evento');
  }

  asignarImagenes() {
    var imagenes = this.evento.imagenes;
    for(var i=0; i<imagenes.length; i++) {
      this.asignarImagen(imagenes[i]);
    }
  }

  asignarImagen(imagen: ImagenEvento) {
    console.log("Imagen a asignar: " + imagen);
    if (imagen != null) {
      this.imagenes.push(imagen.imagen);
    }
  }

  ionViewDidLoad() {
    this.imagenes = new Array();
    console.log('ionViewDidLoad InicioeventoPage');
    this.texto = this.evento.texto;
    if(this.evento.imagenes != null) {
      this.asignarImagenes();
    }
  }

  irListaSitios(event) {
    console.log("Hay que ir a ver los sitios del evento" );

    this.navCtrl.push(ListadoSitiosEventoPage, {
      idEvento: this.evento.id
    });
  }


  irListaActividades(event) {
    console.log("Hay que ir a ver las actividades del evento" );

    this.navCtrl.push(ListadoGrupoPage, {
      idEvento: this.evento.id
    });
  }

}
