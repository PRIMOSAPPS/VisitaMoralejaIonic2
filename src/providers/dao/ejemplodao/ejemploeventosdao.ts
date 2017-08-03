import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Base64 } from '../../base-64';

import { UtilFecha } from '../../util-fecha';
import { UtilTipos } from '../../util-tipos';

import 'rxjs/Rx'

import { Coordenada } from '../../../dto/coordenada/coordenada';
import { Evento } from '../../../dto/eventos/evento/evento';
import { Imagen } from '../../../dto/imagen/imagen';
import { ImagenEvento } from '../../../dto/eventos/imagenes/imagenevento';
import { ImagenActividadEvento } from '../../../dto/eventos/imagenes/imagenactividadevento';
import { SitioEvento } from '../../../dto/eventos/sitioevento/sitioevento';
import { ActividadEvento } from '../../../dto/eventos/actividadevento/actividadevento';
import { FormaEvento } from '../../../dto/eventos/formaevento/formaevento';
import { CategoriaEvento } from '../../../dto/eventos/categoriaevento/categoriaevento';
import { ImagenCategoriaEvento } from '../../../dto/eventos/imagenes/imagencategoriaevento';


type CallBackLeerJson = (resul: any) => any;

@Injectable()
export class EjemploEventosDao {

  private static get SEPARADOR_PUNTO_MARKER() {return ";";}
  private static get SEPARADOR_VALORES_COORDENADA() {return ",";}
  private static get SEPARADOR_COORDENADAS() {return " ";}

  eventos: Array<Evento>;

  constructor(private http: Http) {
  }

  getEventosActualizables(): Promise<any> {
    var fich = "assets/pruebas/eventos/eventosActualizables.js";
    return this.leerFicheroStr(fich);
    /*
    this.leerFicheroStr().then(valor => {
      }
    ).catch();
    */
  }

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

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


  getEventoById(idEvento: number): Promise<any> {
    return this.cargarEvento(idEvento);
  }

  /**
  Carga el evento con identificador i
  */
  private cargarEvento(i: number): Promise<any> {
    var fich = "assets/pruebas/eventos/evento_" + i + ".js";
    var resul = new Promise((resolve, reject) => {
      this.http.get(fich).map(res => res.json()).subscribe(
        data => {
          var evento = data[0];
          var objEvento = this.leerEvento(evento);
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
    resul.latitud = parseFloat(evento.latitud);
    resul.longitud = parseFloat(evento.longitud);
    resul.zoomInicial = parseInt(evento.zoom_inicial);
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

  getActividadesEventoByIdEvento(idEvento: number): Promise<any> {
    var promesas = new Array<Promise<any>>();
    for(var i=1; i<38; i++) {
      //rutasFichero.push("assets/pruebas/eventos/actividades/actividadevento_" + idEvento + "_" + i + ".js");
      var promesa = this.leerFicheroStr("assets/pruebas/eventos/actividades/actividadevento_" + idEvento + "_" + i + ".js");
      promesas.push(promesa);
      //rutasFichero.push("assets/pruebas/eventos/actividades/actividadevento_" + idEvento + "_" + i + ".js");
    }

    var resul = new Promise((resolve, reject) => {
      Promise.all(promesas).then(values => {
        console.log("getActividadesEventoByIdEvento PASO 1");
        var promesasActividades = this.leerActividadesEventoArr(values);
        Promise.all(promesasActividades).then(actividades => {
          console.log("getActividadesEventoByIdEvento PASO 2: " + actividades.length);
          resolve(actividades);
        });
      });

      /*
      this.leerFicheros(rutasFichero, this.leerSitiosEventoArr).then(
        actividades => resolve(actividades)
      ).catch(err => reject(err));
      */
    });
    return resul;
  }

  private leerActividadesEventoArr = (actividades: Array<any>) : Array<Promise<ActividadEvento>> => {
  //private leerSitiosEventoArr(sitios: Array<any>): Array<SitioEvento> {
    console.log("[leerActividadesEventoArr] Paso 1");
    var resul = new Array<Promise<ActividadEvento>>();
    for (var i = 0; i < actividades.length; i++) {
      var actividad = actividades[i][0];
      console.log("[leerActividadesEventoArr] Paso 2: " + this);
      console.log("[leerActividadesEventoArr] actividad.id_evento: " + actividad.id_evento);
      console.log("[leerActividadesEventoArr] actividad.nombre_icono: " + actividad.nombre_icono);
      console.log("[leerActividadesEventoArr] actividad.icono: " + actividad.icono);

      var actividadEvento = this.leerActividadEvento(actividad);
      resul.push(actividadEvento);
    }
    console.log("[leerActividadesEventoArr] Paso 3");

    return resul;
  }

  private leerActividadEvento(actividad): Promise<ActividadEvento> {
    var resul = new Promise((resolve, reject) => {
      var obj = new ActividadEvento();

      obj.id = actividad.id;
      obj.idEvento = actividad.id_evento;
      obj.idCategoriaEvento = actividad.id_categoria_evento;
      obj.nombre = Base64.decode(actividad.nombre);
      obj.texto = Base64.decode(actividad.texto);
      obj.descripcion = Base64.decode(actividad.descripcion);
      obj.nombreIcono = Base64.decode(actividad.nombre_icono);
      obj.logotipo = this.crearImagenActividad(obj.id, obj.nombreIcono, true, actividad.icono);
      //obj.inicio = new Date(UtilFecha.toISO(actividad.inicio));
      //console.log("Recibida la fecha: " + UtilFecha.toISO(actividad.fin) + " ---- " + obj.inicio);
      obj.inicio = UtilFecha.toDate(actividad.inicio);
      //console.log("----------Recibida la fecha: " + UtilFecha.toISO(actividad.fin) + " ---- " + obj.inicio + " --- " + obj.inicio.getTimezoneOffset());
      //obj.fin = new Date(UtilFecha.toISO(actividad.fin));
      obj.fin = UtilFecha.toDate(actividad.fin);
      obj.longitud = actividad.longitud;
      obj.latitud = actividad.latitud;
      obj.activo = UtilTipos.toBoolean(actividad.activo);
      if (actividad.ultima_actualizacion != null) {
        obj.ultimaActualizacion = new Date(UtilFecha.toISO(actividad.ultima_actualizacion));
      } else {
        obj.ultimaActualizacion = new Date(0);
      }
      obj.imagenes = new Array();

      if(actividad.ids_imagenes != null && actividad.ids_imagenes.length > 0) {
        this.getImagenActividadesEventoByIdEventoActividad(obj.idEvento, obj.id, actividad.ids_imagenes[0])
          .then(imagen => {
            obj.imagenes.push(imagen);
            resolve(obj);
          })
          .catch(err => reject(err));
      } else {
        resolve(obj);
      }
    });

    return resul;
  }

  private crearImagenActividad(idActividad: number, nombre: string, isLogo: boolean, imagen: string): ImagenActividadEvento {
    var resul = new ImagenActividadEvento();
    resul.idActividad = idActividad;
    resul.nombre = nombre;
    resul.isLogo = isLogo;
    resul.imagen = imagen;

    return resul;
  }

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  getImagenActividadesEventoByIdEventoActividad(idEvento: number,
      idActividad: number, idImagen: number): Promise<ImagenActividadEvento> {

    var resul = new Promise((resolve, reject) => {
      var promesa = this.leerFicheroStr("assets/pruebas/eventos/imagenesactividad/imagenactividad_evento_"
        + idEvento + "_actividad_" + idActividad + "_" + idImagen + ".js");
      promesa.then(valor => {
        var val = valor[0];
        var nombreImg = Base64.decode(val.nombre);
        var imagen = this.crearImagenActividad(val.id_actividad,
          nombreImg, false, val.imagen);
        resolve(imagen);
      })
      .catch(err => reject(err));
    });
    return resul;
  }

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  getFormasByIdEvento(idEvento: number): Promise<Array<FormaEvento>> {
    var resul = new Promise((resolve, reject) => {
      this.getEventosActualizables()
        .then(eventoActualizable => {
          var formas = this.leerFormasEvento(eventoActualizable[0])
          resolve(formas);
        })
        .catch(err => reject(err));
    });
    return resul;
  }

  private leerFormasEvento(eventoActualizable): Array<FormaEvento> {
    var resul = new Array<FormaEvento>();
    var formas = eventoActualizable.formas_evento;
    for(var i=0; i<formas.length; i++) {
      var forma = formas[i];
      var formaEvento = this.leerFormaEvento(forma);
      resul.push(formaEvento);
    }
    return resul;
  }

  private leerFormaEvento(forma): FormaEvento {
    var resul = new FormaEvento();

    resul.id = forma.id;
    resul.idEvento = forma.id_evento;
    resul.idCategoriaEvento = forma.id_categoria_evento;
    resul.tipoForma = forma.tipo_forma;
    resul.colorRelleno = forma.color_relleno;
    resul.colorLinea = forma.color_linea;
    resul.grosorLinea = forma.grosor_linea;
    resul.texto = Base64.decode(forma.texto);
    console.log("Se lee la forma: " + forma.id);
    //var strCoordenadas = Base64.decode(forma.coordenadas);
    var coordenadas = this.leerCoordenadasForma(forma);
    resul.coordenadaInfoWindow = coordenadas[0];
    if(forma.tipo_forma == "punto") {
      resul.coordenadas = coordenadas;
    } else {
      resul.coordenadas = coordenadas.slice(1);
    }
    //resul.coordenadas = this.leerCoordenadasForma(forma);
    resul.activo = UtilTipos.toBoolean(forma.activo);
    resul.ultimaActualizacion = UtilFecha.toDate(forma.ultima_actualizacion);

    return resul;
  }

  //private static get SEPARADOR_PUNTO_MARKER() {return ";";}
  //private static get SEPARADOR_VALORES_COORDENADA() {return ",";}
  //private static get SEPARADOR_COORDENADAS() {return " ";}
  private leerCoordenadasForma(forma: any): Array<any> {
    var resul = new Array<any>();
    var coordenadas = Base64.decode(forma.coordenadas);

    console.log("Las coordenadas en string son: " + coordenadas);
    var coordenadas1 = coordenadas.split(EjemploEventosDao.SEPARADOR_PUNTO_MARKER);
    var cordenadasMarker = coordenadas1[0];
    var objCoordMarker = this.crearObjCoordenada(cordenadasMarker);
    resul.push(objCoordMarker);
    if(forma.tipo_forma != "punto") {
      console.log("Las coordenadas del marker son: " + coordenadas1[0]);
      console.log("Las coordenadas de la forma son: " + coordenadas1[1]);
      coordenadas1 = coordenadas1[1].split(EjemploEventosDao.SEPARADOR_COORDENADAS);
      var maxInd = (forma.tipo_forma == "linea") ? coordenadas1.length : coordenadas1.length -1;
      for(var i=0; i<maxInd; i++) {
        var coordenadaStr = coordenadas1[i];
        var objCoord = this.crearObjCoordenada(coordenadaStr);
        resul.push(objCoord);
      }
    }

    return resul;
  }

  private crearObjCoordenada(coordenadaStr: string) {
    var valoresCoord = coordenadaStr.split(EjemploEventosDao.SEPARADOR_VALORES_COORDENADA);
    /*
    var objCoord = <any>{};
    objCoord.lat = Number.parseFloat(valoresCoord[1]);
    objCoord.lng = Number.parseFloat(valoresCoord[0]);
    console.log("Creada la siguiente coordenada: " + JSON.stringify(objCoord));
    */
    var objCoord = new Coordenada(Number.parseFloat(valoresCoord[1]),
        Number.parseFloat(valoresCoord[0]));
    return objCoord;
  }


  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  getCategoriasEventoByIdEvento(idEvento: number): Promise<any> {
    var promesas = new Array<Promise<any>>();
    for(var i=1; i<5; i++) {
      var promesa = this.leerFicheroStr("assets/pruebas/eventos/categoriaevento_" + idEvento + "_" + i + ".js");
      promesas.push(promesa);
    }

    var resul = new Promise((resolve, reject) => {
      Promise.all(promesas).then(values => {
        var categorias = this.leerCategoriasEventoArr(values);
        resolve(categorias);
      });

      /*
      this.leerFicheros(rutasFichero, this.leerSitiosEventoArr).then(
        actividades => resolve(actividades)
      ).catch(err => reject(err));
      */
    });
    return resul;
  }

  private leerCategoriasEventoArr = (categorias: Array<any>) : Array<CategoriaEvento> => {
    console.log("[leerCategoriasEventoArr] INICIO");
    var resul = new Array<CategoriaEvento>();
    for (var i = 0; i < categorias.length; i++) {
      var categoria = categorias[i][0];
      var categoriaEvento = this.leerCategoriaEvento(categoria);
      resul.push(categoriaEvento);
    }
    console.log("[leerCategoriasEventoArr] FIN");

    return resul;
  }

  private leerCategoriaEvento(categoria): CategoriaEvento {
    var resul = new CategoriaEvento();

    resul.id = categoria.id;
    resul.idEvento = categoria.id_evento;
    resul.nombre = Base64.decode(categoria.nombre);
    resul.texto = Base64.decode(categoria.texto);
    resul.nombreIcono = Base64.decode(categoria.nombre_icono);
    resul.icono = this.crearImagenCategoria(resul.id, resul.nombreIcono, true, categoria.icono);

    resul.activo = UtilTipos.toBoolean(categoria.activo);
    resul.ultimaActualizacion = UtilFecha.toDate(categoria.ultima_actualizacion);

    return resul;
  }

  private crearImagenCategoria(idCategoria: number, nombre: string, isLogo: boolean, imagen: string): ImagenCategoriaEvento {
    var resul = new ImagenCategoriaEvento();
    resul.idCategoria = idCategoria;
    resul.nombre = nombre;
    resul.isLogo = isLogo;
    resul.imagen = imagen;

    return resul;
  }

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
