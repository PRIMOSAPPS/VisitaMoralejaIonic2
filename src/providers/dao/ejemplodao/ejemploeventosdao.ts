import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Base64 } from '../../base-64';

import { UtilFecha } from '../../util-fecha';
import { UtilTipos } from '../../util-tipos';

import 'rxjs/Rx'

import { Evento } from '../../../dto/eventos/evento/evento';
import { Imagen } from '../../../dto/imagen/imagen';
import { ImagenEvento } from '../../../dto/eventos/imagenes/imagenevento';
import { SitioEvento } from '../../../dto/eventos/sitioevento/sitioevento';


type CallBackLeerJson = (resul: any) => any;

@Injectable()
export class EjemploEventosDao {

  eventos: Array<Evento>;

  constructor(private http: Http) {
  }

  getEventos(): Promise<any> {
    var resul = new Promise((resolve, reject) => {
      if (this.eventos == null) {
        this.cargarEvento(9).then(evento => {
          this.eventos = new Array();
          this.eventos.push(evento);
          resolve(this.eventos);
        })
          .catch(err => { console.error("[getEventos] Error Promises.then: " + err); });
      } else {
        resolve(this.eventos);
      }
    });

    return resul;
  }

  /**
  Carga el evento con identificador i
  */
  private cargarEvento(i: number): Promise<any> {
    var fich = "assets/pruebas/eventos/evento_" + i + ".js";
    var resul = new Promise((resolve, reject) => {
      this.http.get(fich).map(res => res.json()).subscribe(
        data => {
          var evento9 = data[0];
          var objEvento = this.leerEvento(evento9);
          console.log("Leido el fichero: " + fich + " el resultado es: " + objEvento.nombre);
          var idsImagenes = [42, 43, 44];
          this.leerImagenesEvento(objEvento.id, idsImagenes).then(imagenes => {
            console.log("Leidas las imagenes");
            objEvento.imagenes = imagenes;
            resolve(objEvento);
          }).catch(err => reject(err));
        }
      );
    });
    return resul;
  }

  private leerImagenesEvento(idEvento: number, idsImagenes: Array<number>): Promise<any> {
    var rutasFichero = new Array();
    for (var i = 0; i < idsImagenes.length; i++) {
      var idImagenEvento = idsImagenes[i];
      rutasFichero.push("assets/pruebas/eventos/imagenevento_" + idEvento + "_" + idImagenEvento + ".js");
    }
    var resul = new Promise((resolve, reject) => {
      this.leerFicheros(rutasFichero, this.leerImagenesEventoArr).then(
        imagenes => resolve(imagenes)
      ).catch(err => reject(err));
    });
    return resul;
  }

  // ####################################################
  /**
  Tipo de funcion para pasar a leerFichero como callback
  */
  //

  private leerFicheroStrCallback(rutaFichero: string, callback: CallBackLeerJson): Promise<any> {
    var resul = new Promise((resolve, reject) => {
      this.http.get(rutaFichero).map(res => res.json()).subscribe(
        data => {
          var objLeido = callback(data);
          resolve(objLeido);
        }
      );
    });
    return resul;
  }

  private leerFicheroStr(rutaFichero: string): Promise<any> {
    var resul = new Promise((resolve, reject) => {
      this.http.get(rutaFichero).map(res => res.json()).subscribe(
        data => resolve(data)
      );
    });
    return resul;
  }

  private leerFicheros(rutasFichero: Array<string>, callback: CallBackLeerJson): Promise<any> {
    //console.log("Ejecutando: ---------- " + callback);
    var promesas = new Array<Promise<any>>();
    for (var i = 0; i < rutasFichero.length; i++) {
      var promesa = this.leerFicheroStr(rutasFichero[i]);
      promesas.push(promesa);
    }
    var resul = new Promise((resolve, reject) => {
      Promise.all(promesas).then(values => {
        console.log("Todas las promesas ejecutadas: " + callback);
        /*
        console.log("Todas las promesas ejecutadas [values]: " + values);
        var arrImagenes = this.leerImagenesEventoArr(values);
        resolve(arrImagenes);
        */


        var resultadoCallback = callback(values);
        console.log("Se ha ejecutado la funcion callback.");
        resolve(resultadoCallback);

      }).catch(err => { console.log("Paso 1: " + err); reject(err); });
    });
    return resul;
  }
  // ####################################################

  private leerImagenesEventoArr = (imagenes: Array<any>) : Array<ImagenEvento> => {
  //private leerImagenesEventoArr(imagenes: Array<any>): Array<ImagenEvento> {
    console.log("[leerImagenesEventoArr] Paso 1");
    var resul = new Array();
    for (var i = 0; i < imagenes.length; i++) {
      var imagen = imagenes[i][0];
      console.log("[leerImagenesEventoArr] Paso 2: " + this);
      console.log("[leerImagenesEventoArr] imagen.id_evento: " + imagen.id_evento);
      console.log("[leerImagenesEventoArr] imagen.nombre_icono: " + imagen.nombre);
      console.log("[leerImagenesEventoArr] imagen.imagen: " + imagen.imagen);
      var img = this.crearImagen(imagen.id_evento,
        Base64.decode(imagen.nombre), false, imagen.imagen);
      resul.push(img);
    }
    console.log("[leerImagenesEventoArr] Paso 3");

    return resul;
  }

  private leerEvento(evento): Evento {
    var resul = new Evento();
    resul.id = evento.id;
    //console.log("[evento.nombre] " + evento.nombre);
    //console.log("[evento.texto] " + evento.texto);
    //console.log("[evento.descripcion] " + evento.descripcion);
    //console.log("[evento.nombre_icono] " + evento.nombre_icono);
    resul.nombre = Base64.decode(evento.nombre);
    resul.texto = Base64.decode(evento.texto);
    resul.descripcion = Base64.decode(evento.descripcion);
    resul.nombreIcono = Base64.decode(evento.nombre_icono);
    if (evento.icono != null && evento.icono != "") {
      resul.logotipo = this.crearImagen(resul.id, evento.nombre_icono, true, evento.icono);
      //sitio.imagenes.push("data:image/jpeg;base64," + sitio.imagen1);
    }
    resul.latitud = evento.latitud;
    resul.longitud = evento.longitud;
    resul.zoomInicial = evento.zoom_inicial;
    if (evento.inicio != null) {
      resul.inicio = new Date(UtilFecha.toISO(evento.inicio));
    } else {
      resul.inicio = new Date(0);
    }
    if (evento.fin != null) {
      resul.fin = new Date(UtilFecha.toISO(evento.fin));
    } else {
      resul.fin = new Date(0);
    }
    resul.activo = UtilTipos.toBoolean(evento.activo);
    if (evento.ultima_actualizacion != null) {
      resul.ultimaActualizacion = new Date(UtilFecha.toISO(evento.ultima_actualizacion));
    } else {
      resul.ultimaActualizacion = new Date(0);
    }
    resul.imagenes = new Array();

    return resul;
  }

  private crearImagen(idEvento: number, nombre: string, isLogo: boolean, imagen: string): ImagenEvento {
    var resul = new ImagenEvento();
    resul.idEvento = idEvento;
    resul.nombre = nombre;
    resul.isLogo = isLogo;
    resul.imagen = imagen;

    return resul;
  }

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  getSitiosEventoByIdEvento(idEvento: number): Promise<any> {
    var rutasFichero = new Array();
    var idSitioEvento = 1;
    rutasFichero.push("assets/pruebas/eventos/sitioevento_" + idEvento + "_" + idSitioEvento + ".js");
    idSitioEvento = 2;
    rutasFichero.push("assets/pruebas/eventos/sitioevento_" + idEvento + "_" + idSitioEvento + ".js");

    var resul = new Promise((resolve, reject) => {
      this.leerFicheros(rutasFichero, this.leerSitiosEventoArr).then(
        imagenes => resolve(imagenes)
      ).catch(err => reject(err));
    });
    return resul;
  }

  private leerSitiosEventoArr = (sitios: Array<any>) : Array<SitioEvento> => {
  //private leerSitiosEventoArr(sitios: Array<any>): Array<SitioEvento> {
    console.log("[leerSitiosEventoArr] Paso 1");
    var resul = new Array();
    for (var i = 0; i < sitios.length; i++) {
      var sitio = sitios[i][0];
      console.log("[leerSitiosEventoArr] Paso 2: " + this);
      console.log("[leerSitiosEventoArr] sitio.id_evento: " + sitio.id_evento);
      console.log("[leerSitiosEventoArr] sitio.nombre_icono: " + sitio.nombre_icono);
      console.log("[leerSitiosEventoArr] sitio.imagen: " + sitio.imagen);

      var sitioEvento = this.leerSitioEvento(sitio);
      resul.push(sitioEvento);
    }
    console.log("[leerImagenesEventoArr] Paso 3");

    return resul;
  }

  private leerSitioEvento(sitio): SitioEvento {
    var resul = new SitioEvento();

    resul.id = sitio.id;
    resul.idEvento = sitio.id_evento;
    resul.idCategoriaEvento = sitio.id_categoria_evento;
    resul.esSitioRegistrado = sitio.es_sitio_registrado;
    resul.idSitioRegistrado = sitio.id_sitio_registrado;
    resul.nombre = Base64.decode(sitio.nombre);
    resul.texto = Base64.decode(sitio.texto);
    resul.descripcion = Base64.decode(sitio.descripcion);
    resul.nombreIcono = Base64.decode(sitio.nombre_icono);
    resul.logotipo = this.crearImagenSitio(resul.idSitioRegistrado, resul.nombreIcono, true, sitio.icono);
    resul.longitud = sitio.longitud;
    resul.latitud = sitio.latitud;
    resul.activo = UtilTipos.toBoolean(sitio.activo);
    if (sitio.ultima_actualizacion != null) {
      resul.ultimaActualizacion = new Date(UtilFecha.toISO(sitio.ultima_actualizacion));
    } else {
      resul.ultimaActualizacion = new Date(0);
    }

    return resul;
  }

  private crearImagenSitio(idSitio: number, nombre: string, isLogo: boolean, imagen: string): Imagen {
    var resul = new Imagen();
    resul.idSitio = idSitio;
    resul.nombre = nombre;
    resul.isLogo = isLogo;
    resul.imagen = imagen;

    return resul;
  }

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

}

/*
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

private cargarSitio(i: number): Promise<any> {
  var fich = "assets/pruebas/sitios/sitios_json_${i}.json";
  fich = "assets/pruebas/sitios/sitios_json_" + i + ".json";
  var resul = new Promise((resolve, reject) => {
    this.http.get(fich).map(res => res.json()).subscribe(
      data => {
        var objSitio = this.leerSitio(data);
        //console.log("[cargarSitio] Leido el sitio: " + data.idSitio);
        resolve(objSitio);
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
*/
