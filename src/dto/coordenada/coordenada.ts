export class Coordenada {
  lat: number;
  lng: number;

  constructor(latitud: number, longitud: number) {
    this.lat = latitud;
    this.lng = longitud;
  }

  toString() {
    return this.lat.toString() + "-" + this.lng.toString();
  }
}
