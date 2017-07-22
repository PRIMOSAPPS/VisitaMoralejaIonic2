import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SafeHtml } from '@angular/platform-browser';

import { UtilFecha } from '../../providers/util-fecha';

import { EjemploEventosDao } from '../../providers/dao/ejemplodao/ejemploeventosdao';

import { Evento } from '../../dto/eventos/evento/evento';
import { ActividadEvento } from '../../dto/eventos/actividadevento/actividadevento';

import { DetalleActividadPage } from '../detalleactividad/detalleactividad';

/**
 * Generated class for the ListadogrupoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-listadogrupo',
  templateUrl: 'listadogrupo.html',
  providers: [EjemploEventosDao],
})
export class ListadoGrupoPage {

  /*
  grupos: Array<any>;
  shownGroupBorrar: any;

  diseases = [
      { title: "Type 1 Diabetes", description: "Type 1 diabetes is an autoimmune disease in which the body’s immune system attacks and destroys the beta cells in the pancreas that make insulin." },
      { title: "Multiple Sclerosis", description: "Multiple sclerosis (MS) is an autoimmune disease in which the body's immune system mistakenly attacks myelin, the fatty substance that surrounds and protects the nerve fibers in the central nervous system." },
      { title: "Crohn's & Colitis", description: "Crohn's disease and ulcerative colitis (UC), both also known as inflammatory bowel diseases (IBD), are autoimmune diseases in which the body's immune system attacks the intestines." },
      { title: "Lupus", description: "Systemic lupus erythematosus (lupus) is a chronic, systemic autoimmune disease which can damage any part of the body, including the heart, joints, skin, lungs, blood vessels, liver, kidneys and nervous system." },
      { title: "Rheumatoid Arthritis", description: "Rheumatoid arthritis (RA) is an autoimmune disease in which the body's immune system mistakenly begins to attack its own tissues, primarily the synovium, the membrane that lines the joints." }
    ];
  */

  evento: Evento;
  actividades: Array<ActividadEvento>;
  gruposAct: Array<any>;
  idEvento: number;
  grupoMostrado: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private ejemploDao: EjemploEventosDao) {
    this.idEvento = navParams.get('idEvento');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListadogrupoPage');

    this.ejemploDao.getEventoById(this.idEvento).then(evento => {
      this.evento = evento;
      this.ejemploDao.getActividadesEventoByIdEvento(this.idEvento).
        then(actividades => {
          this.actividades = actividades;
          console.log("Leidas las actividades: " + actividades);
          this.agruparActividades();
        }).
        catch(err => {console.error("[ejemploDao.getSitiosEventoByIdEvento] Error al cargar las actividades del evento: " + err);});
    })
      .catch(err => {console.error("[ejemploDao.getEventoById] Error al cargar el evento: " + err);});


      /*
    this.grupos = new Array();

    for (var i = 0; i < 10; i++) {
      this.grupos[i] = {
        name: i,
        items: Array<string>()
      };
      for (var j = 0; j < 3; j++) {
        this.grupos[i].items.push(i + '-' + j);
      }
    }
    */
  }

  private agruparActividades() {
    //console.log("------------------- AGRUPAR ACTIVIDADES: " + this.actividades.length);
    var objGrupo = {};
    var arrOrdenar = new Array();
    for(var i=0; i<this.actividades.length; i++) {
      var actividad = this.actividades[i];
      var fecha = actividad.inicio;
      var fechaAdaptada = this.adaptarFecha(fecha);
      //console.log("------------------- FECHA ADAPTADA: " + fechaAdaptada);
      var indiceAsociativo = this.getIndiceAsociativo(fechaAdaptada);
      var grupo = objGrupo[indiceAsociativo];
      if(!grupo) {
        grupo = {};
        grupo.milliseconds = fechaAdaptada.getTime();
        grupo.etiqueta = this.getEtiquetaFecha(fecha);
        grupo.items = new Array();

        arrOrdenar.push(indiceAsociativo);
        objGrupo[indiceAsociativo] = grupo;
      }
      var item = <any>{};
      item.actividad = actividad;
      item.logotipo = actividad.logotipo;
      item.texto = this.getTextoItem(actividad);
      grupo.items.push(item);
    }

    this.ordenarAsignarObjeto(objGrupo, arrOrdenar);
  }

  private getTextoItem(actividad: ActividadEvento): SafeHtml {
    //(SafeHtml)actividad.nombre;// + "(" + UtilFecha.toHour(actividad.inicio) + "-" + UtilFecha.toHour(actividad.fin) + ")";
    return actividad.nombre + "  (" + UtilFecha.toHour(actividad.inicio) + "-" + UtilFecha.toHour(actividad.fin) + ")";
  }

  private getIndiceAsociativo(fecha: Date): string {
    return fecha.getFullYear() + "/" + fecha.getMonth() + "/" + fecha.getDate();
  }

  private ordenarAsignarObjeto(obj, arrOrdenar: Array<number>) {
    arrOrdenar.sort();
    this.gruposAct = new Array();

    for(var i=0; i<arrOrdenar.length; i++) {
      var indice = arrOrdenar[i];
      var grupo = obj[indice];
      this.gruposAct.push(grupo);
      grupo.items.sort(function(act1, act2) {
        return act1.actividad.inicio.getTime() - act2.actividad.inicio.getTime();
      });
    }
  }

  private adaptarFecha(fecha: Date): Date {
    var resul = new Date();
    resul.setTime(fecha.getTime());
    resul.setHours(0);
    resul.setMinutes(0);
    resul.setSeconds(0);
    resul.setMilliseconds(0);

    return resul;
  }

  private getEtiquetaFecha(fecha: Date) {
    return fecha.getDate() + "/" + fecha.getMonth() + "/" + fecha.getFullYear();
  }


  toggleGroup(event, group) {
    if (this.isGroupShown(group)) {
      this.grupoMostrado = null;
    } else {
      this.grupoMostrado = group;
    }
  }

  itemClicked(event, item) {
    console.log("Clicado un item: " + item);
    this.navCtrl.setRoot(DetalleActividadPage, {
      actividad: item.actividad
    });
  }

  isGroupShown(group) {
    return this.grupoMostrado === group;
  }

/*
  toggleGroupBorrar(event, group) {
    if (this.isGroupShown(group)) {
      this.shownGroupBorrar = null;
    } else {
      this.shownGroupBorrar = group;
    }
  }

  isGroupShownBorrar(group) {
    return this.shownGroupBorrar === group;
  }
*/
}
