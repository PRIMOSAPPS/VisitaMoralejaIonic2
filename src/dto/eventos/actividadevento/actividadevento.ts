
import { ImagenActividadEvento } from '../imagenes/imagenactividadevento';

export class ActividadEvento {
  id: number;
  idEvento: number;
  idCategoriaEvento: number;
  nombre: string;
  texto: string;
  descripcion: string;
  nombreIcono: string;
  logotipo: ImagenActividadEvento;
  imagenes: Array<ImagenActividadEvento>;
  inicio: Date;
  fin: Date;
  longitud: number;
  latitud: number;
  activo: boolean;
  ultimaActualizacion: Date;

  constructor() {
    this.imagenes = new Array();
  }
}
