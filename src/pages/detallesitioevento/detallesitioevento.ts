import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SafeHtml } from '@angular/platform-browser';

import { SitioEvento } from '../../dto/eventos/sitioevento/sitioevento';

/**
 * Generated class for the DetallesitioeventoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detallesitioevento',
  templateUrl: 'detallesitioevento.html',
})
export class DetalleSitioEventoPage {

  sitio: SitioEvento;
  texto: SafeHtml;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.sitio = navParams.get('sitio');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallesitioeventoPage');
    this.texto = this.sitio.texto;
  }

}
