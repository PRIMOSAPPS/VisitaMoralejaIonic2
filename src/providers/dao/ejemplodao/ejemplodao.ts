import { Sitio } from '../../../dto/sitio/sitio';

export class EjemploDao {

  getListaSitios(): Array<Sitio> {
    var resul = new Array<Sitio>();

    for(var idC=1; idC<=5; idC++) {
      for(var idS=(10*idC); idS<((10*idC)+7); idS++) {
        resul.push(this.crearSitio(idS, idC));
      }
    }

    return resul;
  }

  getSitiosByIdCategoria(idCategoria: number): Array<Sitio> {
    var resul = new Array<Sitio>();

    var sitios = this.getListaSitios();
    for(var i=0; i<sitios.length; i++) {
      if(sitios[i].idCategoria == idCategoria) {
        resul.push(sitios[i]);
      }
    }

    return resul;
  }

  getSitioById(idSitio: number): Sitio {
    var resul = null;

    var sitios = this.getListaSitios();
    for(var i=0; i<sitios.length; i++) {
      if(sitios[i].id == idSitio) {
        resul = sitios[i];
        break;
      }
    }

    return resul;
  }

  private crearSitio(idSitio: number, idCategoria: number): Sitio {
    var sitio = new Sitio();

    sitio.id = idSitio;
    sitio.idCategoria = idCategoria;
    sitio.nombre = "Nombre_" + idSitio;
    sitio.textoCorto1 = "TextoCorto_1_" + idSitio;
    sitio.textoCorto2 = "TextoCorto_2_" + idSitio;
    sitio.textoCorto3 = "TextoCorto_3_" + idSitio;
    sitio.textoLargo1 = "TextoLargo_1_" + idSitio;
    sitio.textoLargo2 = "TextoLargo_2_" + idSitio;
    sitio.latitud = 40;
    sitio.longitud = -3;
    sitio.direccion = "Direccion_" + idSitio;
    sitio.poblacion = "Poblacion_" + idSitio;
    sitio.telefonosFijos = "TelefonosFijos_" + idSitio;
    sitio.telefonosMoviles = "TelefonosMoviles_" + idSitio;
    sitio.web = "Web_" + idSitio;
    sitio.email = "Email_" + idSitio;
    sitio.facebook = "Facebbok_" + idSitio;
    sitio.twitter = "Twitter_" + idSitio;
    sitio.ranking = 1;
    sitio.favorito = false;
    sitio.activo = true;

    return sitio;
  }
}
