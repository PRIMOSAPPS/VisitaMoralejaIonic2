import { ImagenEvento } from '../imagenes/imagenevento';

export class Evento {
  id: number;
  nombre: string;
  texto: string;
  descripcion: string;
  nombreIcono: string;
  logotipo: ImagenEvento;
  longitud: number;
  latitud: number;
  zoomInicial: number;
  inicio: Date;
  fin: Date;
  activo: boolean;
  ultimaActualizacion: Date;
  imagenes: Array<ImagenEvento>;
  /*
  id: number;
  idEvento: number;
  idCategoriaEvento: number;
  esSitioRegistrado: boolean;
  idSitioRegistrado: number;
  nombre: string;
  texto: string;
  descripcion: string;
  nombreIcono: string;
  icono: Imagen;
  longitud: number;
  latitud: number;
  activo: boolean;
  ultimaActualizacion: Date;
  */
}
