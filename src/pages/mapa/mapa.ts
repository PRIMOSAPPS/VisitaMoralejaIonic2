import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import { ListadoActividadesMapaEventoPage } from './listadoactividadesmapaevento';
import { DetalleActividadPage } from '../detalleactividad/detalleactividad';
import { DetalleSitioEventoPage } from '../detallesitioevento/detallesitioevento';

import { Color } from '../../dto/color/color';
import { UtilColor } from '../../providers/util-color';

import { Coordenada } from '../../dto/coordenada/coordenada';
import { Evento } from '../../dto/eventos/evento/evento';
import { ActividadEvento } from '../../dto/eventos/actividadevento/actividadevento';
import { FormaEvento } from '../../dto/eventos/formaevento/formaevento';
import { SitioEvento } from '../../dto/eventos/sitioevento/sitioevento';
import { EjemploEventosDao } from '../../providers/dao/ejemplodao/ejemploeventosdao';

declare var google;

/**
 * Generated class for the MapaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
  providers: [EjemploEventosDao],
})
export class MapaPage {
  // Api --> AIzaSyBu6vZOSYKrfev_YQcEW6rOUb7IzQhC3RA
  // Api debug --> AIzaSyBtB1cUMwHp10_AO2A7j4oyMLdNLKMR2ok
  // https://www.djamware.com/post/58f4da2080aca7414e78a638/step-by-step-tutorial-of-ionic-3-angular-4-and-google-maps-directions-service

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  /*
  start = 'chicago, il';
  end = 'chicago, il';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  */

  //actividadesAgrupCoord: Array<ActividadEvento>;
  menuVisible: boolean;
  actividadesAgrupCoord: any;
  actividadesAgrupCategoria: any;
  sitiosAgrupCategoria: any;
  categorias: any;
  sitios: Array<SitioEvento>;

  //evento: Evento;
  idEvento: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
      private modalCtrl: ModalController, private ejemploDao: EjemploEventosDao) {
    this.idEvento = navParams.get('idEvento');
  }

  ionViewDidLoad() {
    this.menuVisible = false;
    //this.actividadesAgrupCoord = new Array();
    this.actividadesAgrupCoord = {};
    this.actividadesAgrupCategoria = {};
    this.sitiosAgrupCategoria = {};
    this.ejemploDao.getEventoById(this.idEvento).then(evento => {
        //this.evento = evento;
        this.initMap(evento);
      });
  }

  mostrarOcultarMenu() {
    this.menuVisible = !this.menuVisible;
  }

  private initMap(evento: Evento) {
    //var lat = 41.85;
    //var long = -87.65;
    console.log("ZOOM INICIAL: " + evento.zoomInicial);
    //var zoom = 16;
    var zoom = evento.zoomInicial;
    //var lat = 40.067282;
    var lat = evento.latitud;
    //var long = -6.659212;
    var long = evento.longitud;
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: zoom,
      center: { lat: lat, lng: long }
    });

    //this.addMarker2(this.map);

    //this.pintarLinea2(this.map);

    //this.pintarPoligono2(this.map);
    ////////////////////////////////////////////////

    //this.directionsDisplay.setMap(this.map);

    this.pintarFormasEvento(this.map);

    this.addActividadesMapa(this.map);

    this.cargarCategorias(this.map);

    this.cargarSitios(this.map);
  }

  clickCheckboxCategoria(evento, objCat) {
    objCat.seleccionada = !objCat.seleccionada;
    this.refrescarMarkerCategorias(objCat);
  }

  private refrescarMarkerCategorias(objCat: any) {
    var key = objCat.categoria.id.toString();
    console.log("Se ha clicado la categoria: " + objCat.categoria.id + " - " + objCat.categoria.nombre);

    var actividadesCat = this.actividadesAgrupCategoria[key];
    console.log("Hay " + actividadesCat.arr.length + " actividades relacionadas.");
    for(var i=0; i<actividadesCat.arr.length; i++) {
      var marker = actividadesCat.arr[i].marker;
      marker.setVisible(objCat.seleccionada);
      //objCat.seleccionada ? marker.show() : marker.hide();
    }
    var sitiosCat = this.actividadesAgrupCategoria[key];
    for(var i=0; i<sitiosCat.arr.length; i++) {
      var marker = sitiosCat.arr[i].marker;
      marker.setVisible(objCat.seleccionada);
      //objCat.seleccionada ? marker.show() : marker.hide();
    }
  }

  private cargarCategorias(map) {
    this.ejemploDao.getCategoriasEventoByIdEvento(this.idEvento).
    then(categorias => {
      //this.categorias = categorias
      this.categorias = new Array<any>();
      for(var i=0; i<categorias.length; i++) {
        var objCat = <any>{};
        objCat.seleccionada = true;
        objCat.categoria = categorias[i];
        this.categorias.push(objCat);
      }
    })
    .catch(err => console.error(err));
  }

  private cargarSitios(map) {
    this.ejemploDao.getSitiosEventoByIdEvento(this.idEvento).
    then(sitios => {
      this.sitios = sitios;
      this.addSitiosMapa(map);
    })
    .catch(err => console.error(err));
  }

  private addSitiosMapa(map) {
    for(var i=0; i<this.sitios.length; i++) {
      var sitio = this.sitios[i];
      var imagen = this.getImageMarker(sitio.logotipo.imagen);
      console.log("Se cargan las coordenadas del sitio: " + typeof sitio.latitud + " - " + typeof sitio.longitud);
      var objCoord = new Coordenada(sitio.latitud, sitio.longitud);
      var marker = new google.maps.Marker({
        position: objCoord,
        map: map,
        icon: imagen
      });

      marker.infoWindow = this.crearInfoWindowSitio(sitio);
      marker.addListener('click', function() {
        //clickMarkerSitio(this);
        this.infoWindow.open(map, marker);
      });
      marker.infoWindow.sitio = sitio;
      var clickMarkerSitio = this.clickInfoWindowSitio;
      marker.infoWindow.addListener('click', function() {
        clickMarkerSitio(this);
      });

      this.agruparSitio(sitio, marker);
    }
  }

  private clickInfoWindowSitio = (infoWindow: any) => {
    this.navCtrl.setRoot(DetalleSitioEventoPage, {
      sitio: infoWindow.sitio
    });
  }

  private addActividadesMapa(map) {
    this.ejemploDao.getActividadesEventoByIdEvento(this.idEvento).then(arrActividades => {
      //console.log("Se añaden " + arrActividades.length);
      for(var i=0; i<arrActividades.length; i++) {
        var actividad = arrActividades[i];
        console.log("ACTIVIDAD RECUPERADA CON LOGOTIPO: " + actividad.logotipo);
        var objCoord = new Coordenada(parseFloat(actividad.latitud), parseFloat(actividad.longitud));
        //console.log("Se añade actividad " + JSON.stringify(objCoord));

        var imagen = this.getImageMarker(actividad.logotipo.imagen);
        var marker = new google.maps.Marker({
          position: objCoord,
          map: map,
          icon: imagen
        });
        marker.key = objCoord.toString();

        var clickMarkerActividad = this.clickMarkerActividad;
        marker.addListener('click', function() {
          clickMarkerActividad(this);
          //infowindow.open(map, marker);
        });

        this.agruparActividad(actividad, objCoord, marker);
      }
    });
  }

  private getImageMarker(img: string) {
    //var img = " data:image/png;base64,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";
    var image = {
      url: "data:image/png;base64," + img,
      // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(20, 32),
      scaledSize: new google.maps.Size(25, 25),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(0, 32)
    };

    return image;
  }

  private clickMarkerActividad = (marker: any) => {
  //private clickMarkerActividad(marker: any) {
    console.log("Clicado el marker latitud: " + marker.getPosition().lat());
    console.log("Clicado el marker longitud: " + marker.getPosition().lng());
    console.log("Clicado el marker toString(): " + marker.getPosition().toString());

    var coord = new Coordenada(marker.getPosition().lat(), marker.getPosition().lng());
    //console.log("-------------------------" + JSON.stringify(this.actividadesAgrupCoord));
    var arrAct = this.actividadesAgrupCoord[marker.key];
    if(arrAct) {
      console.log("Clicada actividad agrupada en: " + arrAct.arr.length + " actividades: " + marker.key);
      this.mostrarListaActividades(arrAct.arr);
    } else {
      console.error("Clicada actividad que no esta agrupada.");
    }

  }

  private mostrarListaActividades(actividades: Array<any>) {
    var actividadesEnvio = new Array<ActividadEvento>();
    for(var i=0; i<actividades.length; i++) {
      actividadesEnvio.push(actividades[i].actividad);
      console.log("Logotipo de actividad: " + actividades[i].actividad.logotipo);
      if(actividades[i].actividad) {
        console.log("Logotipo de actividad: " + actividades[i].actividad.logotipo.imagen);
      }
    }
    let profileModal = this.modalCtrl.create(ListadoActividadesMapaEventoPage,
        {idEvento: this.idEvento, actividades: actividadesEnvio});
    profileModal.present();
  }

  private agruparActividad(actividad: ActividadEvento, coordenada: Coordenada,
      marker: any) {
        var objActividadGrupo = this.crearGrupoActividad(actividad, coordenada,
            marker);
        this.agruparPorCoordenada(objActividadGrupo);
        this.agruparPorCategoria(objActividadGrupo);
  }

  private agruparSitio(sitio: SitioEvento, marker: any) {
    var objAgrup = <any>{};
    objAgrup.sitio = sitio;
    objAgrup.marker = marker;
    this.agruparSitioPorCategoria(objAgrup);
  }

  private agrupar(obj: any, key: string, arr: any) {
    var grupo = arr[key];
    if(!grupo) {
      console.log("No existe grupo para la clave: " + key);
      grupo = {};
      grupo.arr = new Array();
      arr[key] = grupo;
    } else {
      console.log("YA EXISTE grupo para la clave: " + key);
    }

    grupo.arr.push(obj);
  }

  private agruparPorCoordenada(obj: any) {
    var key = obj.coordenada.toString();
    console.log("Creada coordenada para marker: " + key);
    this.agrupar(obj, key, this.actividadesAgrupCoord);
  }

  private agruparPorCategoria(obj: any) {
    var key = obj.actividad.idCategoriaEvento.toString();
    this.agrupar(obj, key, this.actividadesAgrupCategoria);
  }

  private agruparSitioPorCategoria(objAgrup: any) {
    var key = objAgrup.sitio.idCategoriaEvento.toString();
    this.agrupar(objAgrup, key, this.sitiosAgrupCategoria);
  }

  private crearGrupoActividad(actividad: ActividadEvento, coordenada: Coordenada,
      marker: any): any {
    var objActividadGrupo = <any>{};
    objActividadGrupo.actividad = actividad;
    objActividadGrupo.coordenada = coordenada;
    objActividadGrupo.marker = marker;

    return objActividadGrupo;
  }

  private pintarFormasEvento(map) {
    this.ejemploDao.getFormasByIdEvento(this.idEvento)
      .then(arrFormas => {
        console.log("Tenemos " + arrFormas.length + "formas");
        for(var i=0; i<arrFormas.length; i++) {
          var formaEvento = arrFormas[i];
          console.log(JSON.stringify("Las coordenadas son: " + formaEvento.coordenadas));
          console.log("Forma: " + formaEvento.id + " --> " + formaEvento.tipoForma);
          if(formaEvento.tipoForma == "poligono") {
            this.pintarPoligono(formaEvento, map);
          } else if(formaEvento.tipoForma == "linea") {
            this.pintarLinea(formaEvento, map);
          } else {
            this.pintarPunto(formaEvento, map);
          }
        }
      })
      .catch(err => console.log("Error leyendo las formas: " + err));
  }

  private pintarPoligono(forma: FormaEvento, map) {
    var colorRelleno = UtilColor.toColor(forma.colorRelleno);
    var colorLinea = UtilColor.toColor(forma.colorLinea);
    var polygon = new google.maps.Polygon({
      paths: forma.coordenadas,
      strokeColor: '#' + colorLinea.valorRGB,
      strokeOpacity: colorLinea.valorAlpha,
      strokeWeight: forma.grosorLinea,
      fillColor: '#' + colorRelleno.valorRGB,
      fillOpacity: colorRelleno.valorAlpha
    });
    polygon.setMap(map);

    this.addInfoWindowForma(forma, map, polygon);
  }

  private pintarLinea(forma: FormaEvento, map) {
    var colorLinea = UtilColor.toColor(forma.colorLinea);
    var polyLine = new google.maps.Polyline({
      path: forma.coordenadas,
      geodesic: true,
      strokeColor: '#' + colorLinea.valorRGB,
      strokeOpacity: 1.0,
      strokeWeight: forma.grosorLinea
    });
    polyLine.setMap(map);

    this.addInfoWindowForma(forma, map, polyLine);
  }

  private pintarPunto(forma: FormaEvento, map) {
    console.log("Se pinta un puntooooooo: " + JSON.stringify(forma.coordenadas[0]));
    var colorRelleno = UtilColor.toColor(forma.colorRelleno);
    var colorLinea = UtilColor.toColor(forma.colorLinea);
    var circulo = new google.maps.Circle({
      center: forma.coordenadas[0],
      strokeColor: '#' + colorLinea.valorRGB,
      strokeOpacity: colorLinea.valorAlpha,
      strokeWeight: forma.grosorLinea,
      fillColor: '#' + colorRelleno.valorRGB,
      fillOpacity: colorRelleno.valorAlpha,
      radius: 5
    });
    circulo.setMap(map);

    this.addInfoWindowForma(forma, map, circulo);
  }

  private addInfoWindowForma(forma: FormaEvento, map, formaGoogle: any) {
    var infoWindow = this.crearInfoWindowForma(forma);
    var marker = new google.maps.Marker({
      position: forma.coordenadaInfoWindow,
      map: map,
      opacity: 0
    });
    formaGoogle.addListener('click', function() {
      infoWindow.open(map, marker);
    });
  }

  private crearInfoWindowForma(forma: FormaEvento): any {
    var contentString = '<div id="content">' +
      forma.texto +
      '</div>';

    return this.crearInfoWindow(contentString);
  }

  private crearInfoWindowActividad(actividad: ActividadEvento): any {
    var contentString = '<div id="content">' +
      actividad.texto +
      '</div>';

    return this.crearInfoWindow(contentString);
  }

  private crearInfoWindowSitio(sitio: SitioEvento): any {
    var contentString = '<div id="content">' +
      sitio.texto +
      '</div>';

    return this.crearInfoWindow(contentString);
  }

  private crearInfoWindow(contentString: string): any {
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    return infowindow;
  }

  /*
  pintarPoligono2(map) {
    // Define the LatLng coordinates for the polygon's path. Note that there's
    // no need to specify the final coordinates to complete the polygon, because
    // The Google Maps JavaScript API will automatically draw the closing side.
    var triangleCoords = [
      {lat: 40.067988, lng: -6.660921},
      {lat: 40.070788, lng: -6.657059},
      {lat: 40.068973, lng: -6.657746},
      {lat: 40.071017, lng: -6.656673},
      {lat: 40.067470, lng: -6.654023},
      {lat: 40.063691, lng: -6.660587}
    ];

    var bermudaTriangle = new google.maps.Polygon({
      paths: triangleCoords,
      strokeColor: '#00FF00',
      strokeOpacity: 0.8,
      strokeWeight: 3,
      fillColor: '#00FF00',
      fillOpacity: 0.35
    });
    bermudaTriangle.setMap(map);
  }

  pintarLinea2(map) {
    var flightPlanCoordinates = [
      { lat: 40.064236, lng: -6.662664 },
      { lat: 40.064933, lng: -6.661983 },
      { lat: 40.064539, lng: -6.661511 },
      { lat: 40.065237, lng: -6.660395 },
      { lat: 40.065812, lng: -6.660524 },
      { lat: 40.065303, lng: -6.658378 }
    ];
    var flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    flightPath.setMap(map);
  }

  getInfoWindow() {

    var contentString = '<div id="content">' +
      '<div id="siteNotice">' +
      '</div>' +
      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
      '<div id="bodyContent">' +
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the ' +
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
      'south west of the nearest large town, Alice Springs; 450&#160;km ' +
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
      'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
      'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
      'Aboriginal people of the area. It has many springs, waterholes, ' +
      'rock caves and ancient paintings. Uluru is listed as a World ' +
      'Heritage Site.</p>' +
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
      '(last visited June 22, 2009).</p>' +
      '</div>' +
      '</div>';

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    return infowindow;
  }

  getImageMarker() {

    var img = " data:image/png;base64,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";
    var image = {
      url: img,
      // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(20, 32),
      scaledSize: new google.maps.Size(25, 25),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(0, 32)
    };

    return image;
  }

  addMarker2(map) {
    var image = this.getImageMarker();
    var infowindow = this.getInfoWindow();
    var coordMarker = { lat: 40.062137, lng: -6.663488 };
    var marker = new google.maps.Marker({
      position: coordMarker,
      map: map,
      icon: image,
      title: "La casa"
    });
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
  }

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
  */

}
