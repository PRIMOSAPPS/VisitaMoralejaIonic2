
import { ImagenCategoriaEvento } from '../imagenes/imagencategoriaevento';

export class CategoriaEvento {
  id: number;
  idEvento: number;
  nombre: string;
  texto: string;
  nombreIcono: string;
  icono: ImagenCategoriaEvento;
  activo: boolean;
  ultimaActualizacion: Date;


}
