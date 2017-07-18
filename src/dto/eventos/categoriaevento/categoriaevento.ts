
import { Imagen } from '../../imagen/imagen';

export class CategoriaEvento {
  id: number;
  idEvento: number;
  nombre: string;
  texto: string;
  nombreIcono: string;
  icono: Imagen;
  activo: boolean;
  ultimaActualizacion: Date;


}
