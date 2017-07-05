import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
})
export class MapaPage {
  // Api --> AIzaSyBu6vZOSYKrfev_YQcEW6rOUb7IzQhC3RA
  // Api debug --> AIzaSyBtB1cUMwHp10_AO2A7j4oyMLdNLKMR2ok
  // https://www.djamware.com/post/58f4da2080aca7414e78a638/step-by-step-tutorial-of-ionic-3-angular-4-and-google-maps-directions-service

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  start = 'chicago, il';
  end = 'chicago, il';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    this.initMap();
  }

  initMap() {
    //var lat = 41.85;
    //var long = -87.65;
    var zoom = 14;
    var lat = 40.067282;
    var long = -6.659212;
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: zoom,
      center: { lat: lat, lng: long }
    });

    this.addMarker(this.map);

    this.pintarLinea(this.map);

    this.pintarPoligono(this.map);

    this.directionsDisplay.setMap(this.map);
  }

  pintarPoligono(map) {
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

  pintarLinea(map) {
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

  addMarker(map) {
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

}
