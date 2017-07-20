import { Imagen } from '../../imagen/imagen';

export class SitioEvento {
  id: number;
  idEvento: number;
  idCategoriaEvento: number;
  esSitioRegistrado: boolean;
  idSitioRegistrado: number;
  nombre: string;
  texto: string;
  descripcion: string;
  nombreIcono: string;
  logotipo: Imagen;
  longitud: number;
  latitud: number;
  activo: boolean;
  ultimaActualizacion: Date;
}
