import { Imagen } from '../../imagen/imagen';

export abstract class AbstractImagenEvento {
  id: number;
  nombre: string;
  imagen: Imagen;
  activo: boolean;
  ultimaActualizacion: Date;
}
