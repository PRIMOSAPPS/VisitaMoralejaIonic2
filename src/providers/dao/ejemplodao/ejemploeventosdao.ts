import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Base64 } from '../../base-64';

import { UtilFecha } from '../../util-fecha';
import { UtilTipos } from '../../util-tipos';

import 'rxjs/Rx'

import { Sitio } from '../../../dto/sitio/sitio';
import { Imagen } from '../../../dto/imagen/imagen';

@Injectable()
export class EjemploEventosDao {

  sitios: Array<Sitio>;

  constructor(private http: Http) {
  }

  getListaSitios(): Promise<any> {

    var resul = new Promise((resolve, reject) => {
      if (this.sitios == null) {
        var promesas = new Array<Promise<any>>();
        for (var i = 1; i < 28; i++) {
          var promesa = this.cargarSitio(i);
          promesas.push(promesa);
        }

        Promise.all(promesas).then(values => {
          for (var i = 0; i < values.length; i++) {
            console.log("[getListaSitios] Encontrado el sitio: " + values[i].id);
            this.sitios = values;
            resolve(this.sitios);
          }
        }).catch(err => { console.error("[getListaSitios] Error Promises.all: " + err); });
      } else {
        resolve(this.sitios);
      }
    });

    return resul;
    /*
        var resul = new Array<Sitio>();

        for (var idC = 1; idC <= 5; idC++) {
          for (var idS = (10 * idC); idS < ((10 * idC) + 7); idS++) {
            resul.push(this.crearSitio(idS, idC));
          }
        }

        return resul;
        */
  }

  getSitiosByIdCategoria(idCategoria: number): Promise<any> {
    var resul = new Promise((resolve, reject) => {
      if (this.sitios == null) {
        this.getListaSitios().
          then(sitios => { resolve(this.filtrarSitiosByIdCategoria(idCategoria, this.sitios)); }).
          catch(err => { reject(err); });
      } else {
        resolve(this.filtrarSitiosByIdCategoria(idCategoria, this.sitios));
      }

    });
    return resul;
  }

  filtrarSitiosByIdCategoria(idCategoria: number, sitios: Array<Sitio>): Array<Sitio> {
    var resul = new Array<Sitio>();

    //var sitios = this.getListaSitios();
    for (var i = 0; i < sitios.length; i++) {
      if (sitios[i].idCategoria == idCategoria) {
        resul.push(sitios[i]);
      }
    }

    return resul;
  }

  getSitioById(idSitio: number): Promise<Sitio> {
    var resul = new Promise((resolve, reject) => {
      if (this.sitios == null) {
        this.getListaSitios().
          then(sitios => { resolve(this.filtrarSitioById(idSitio, this.sitios)); }).
          catch(err => { reject(err); });
      } else {
        resolve(this.filtrarSitioById(idSitio, this.sitios));
      }
    });
    return resul;
  }


  filtrarSitioById(idSitio: number, sitios: Array<Sitio>): Array<Sitio> {
    var resul = null;

    //var sitios = this.getListaSitios();
    for (var i = 0; i < this.sitios.length; i++) {
      if (this.sitios[i].id == idSitio) {
        resul = this.sitios[i];
        break;
      }
    }

    return resul;
  }


  /*
  private crearSitio(idSitio: number, idCategoria: number): Sitio {
    var sitio = new Sitio();

    sitio.id = idSitio;
    sitio.idCategoria = idCategoria;
    sitio.nombre = "Nombre_" + idSitio;
    sitio.textoCorto1 = "TextoCorto_1_" + idSitio;
    sitio.textoCorto2 = "TextoCorto_2_" + idSitio;
    sitio.textoCorto3 = "TextoCorto_3_" + idSitio;
    sitio.textoLargo1 = "TextoLargo_1_" + idSitio;
    sitio.textoLargo2 = "TextoLargo_2_" + idSitio;
    sitio.latitud = 40;
    sitio.longitud = -3;
    sitio.direccion = "Direccion_" + idSitio;
    sitio.poblacion = "Poblacion_" + idSitio;
    sitio.telefonosFijos = "TelefonosFijos_" + idSitio;
    sitio.telefonosMoviles = "TelefonosMoviles_" + idSitio;
    sitio.web = "Web_" + idSitio;
    sitio.email = "Email_" + idSitio;
    sitio.facebook = "Facebbok_" + idSitio;
    sitio.twitter = "Twitter_" + idSitio;
    sitio.ranking = 1;
    sitio.favorito = false;
    sitio.activo = true;

    return sitio;
  }
  */


  private cargarSitio(i: number): Promise<any> {
    var fich = "assets/pruebas/sitios/sitios_json_${i}.json";
    fich = "assets/pruebas/sitios/sitios_json_" + i + ".json";
    var resul = new Promise((resolve, reject) => {
      this.http.get(fich).map(res => res.json()).subscribe(
        data => {
          var objSitio = this.leerSitio(data);
          //console.log("[cargarSitio] Leido el sitio: " + data.idSitio);
          resolve(objSitio);
          /*
          this.sitioToBD(objSitio).then(
            () => {
              this.imagenesToBD(objSitio.imagenes, 0).then(() => {
                resolve(true);
              });
            }, (error) => {
              resolve(false);}
          );
          */
        }
      );
    });
    return resul;
  }

  private leerSitio(sitio): Sitio {
    var resul = new Sitio();
    resul.id = sitio.idSitio;
    resul.idCategoria = sitio.idCategoria;
    resul.nombre = Base64.decode(sitio.nombre);
    resul.textoCorto1 = Base64.decode(sitio.textoCorto1);
    resul.textoCorto2 = Base64.decode(sitio.textoCorto2);
    resul.textoCorto3 = Base64.decode(sitio.textoCorto3);
    resul.textoLargo1 = Base64.decode(sitio.textoLargo1);
    resul.textoLargo2 = Base64.decode(sitio.textoLargo2);
    resul.latitud = sitio.latitud;
    resul.longitud = sitio.longitud;
    resul.direccion = Base64.decode(sitio.direccion);
    resul.poblacion = Base64.decode(sitio.poblacion);
    resul.telefonosFijos = Base64.decode(sitio.telefonosFijos);
    resul.telefonosMoviles = Base64.decode(sitio.telefonosMoviles);
    resul.web = Base64.decode(sitio.web);
    resul.email = Base64.decode(sitio.email);
    resul.facebook = Base64.decode(sitio.facebook);
    resul.twitter = Base64.decode(sitio.twitter);
    resul.ranking = sitio.ranking;
    resul.favorito = false;
    resul.activo = UtilTipos.toBoolean(sitio.activo);
    if (sitio.ultima_actualizacion != null) {
      resul.ultimaActualizacion = new Date(UtilFecha.toISO(sitio.ultima_actualizacion));
    } else {
      resul.ultimaActualizacion = new Date(0);
    }
    resul.imagenes = new Array();

    if (sitio.logotipo != null && sitio.logotipo != "") {
      resul.logotipo = this.crearImagen(resul.id, sitio.nombreLogotipo, true, sitio.logotipo);
      //sitio.imagenes.push("data:image/jpeg;base64," + sitio.imagen1);
    }
    if (sitio.imagen1 != null && sitio.imagen1 != "") {
      resul.imagenes.push(this.crearImagen(resul.id, sitio.nombreImagen1, false, sitio.imagen1));
      //sitio.imagenes.push("data:image/jpeg;base64," + sitio.imagen1);
    }
    if (sitio.imagen2 != null && sitio.imagen2 != "") {
      resul.imagenes.push(this.crearImagen(resul.id, sitio.nombreImagen2, false, sitio.imagen2));
      //sitio.imagenes.push("data:image/jpeg;base64," + sitio.imagen2);
    }
    if (sitio.imagen3 != null && sitio.imagen3 != "") {
      resul.imagenes.push(this.crearImagen(resul.id, sitio.nombreImagen3, false, sitio.imagen3));
      //sitio.imagenes.push("data:image/jpeg;base64," + sitio.imagen3);
    }
    if (sitio.imagen4 != null && sitio.imagen4 != "") {
      resul.imagenes.push(this.crearImagen(resul.id, sitio.nombreImagen4, false, sitio.imagen4));
      //sitio.imagenes.push("data:image/jpeg;base64," + sitio.imagen4);
    }

    console.log("El numero de imagenes es: " + resul.imagenes.length + " en el id: " + resul.id);


    return resul;
  }

  private crearImagen(idSitio: number, nombre: string, isLogo: boolean, imagen: string): Imagen {
    var resul = new Imagen();
    resul.idSitio = idSitio;
    resul.nombre = nombre;
    resul.isLogo = isLogo;
    resul.imagen = imagen;

    return resul;
  }

}
