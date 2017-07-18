
import { Imagen } from '../../imagen/imagen';

export class ActividadEvento {
  id: number;
  idEvento: number;
  idCategoriaEvento: number;
  nombre: string;
  texto: string;
  descripcion: string;
  nombreIcono: string;
  icono: number;
  imagenes: Array<Imagen>;
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
