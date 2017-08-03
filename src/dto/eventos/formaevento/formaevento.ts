export class FormaEvento {
  id: number;
  idEvento: number;
  idCategoriaEvento: number;
  tipoForma: string;
  colorRelleno: string;
  colorLinea: string;
  grosorLinea: string;
  texto: string;
  coordenadas: Array<any>;
  coordenadaInfoWindow: any;
  activo: boolean;
  ultimaActualizacion: Date;
}
