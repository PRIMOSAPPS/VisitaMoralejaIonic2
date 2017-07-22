export class UtilFecha {

  private static get PATRON() {return /(\d?\d)-(\d?\d)-(\d{4})\s(\d{2}):(\d{2}):(\d{2})/g;}
  // "19-5-2016 22:32:24".replace(pattern, "$3-$2-$1T$4:$5:$6Z");
  // "19-5-2016 22:32:24".match(pattern);"};

  public static toISO(fecha: string): string {
    var particion1 = fecha.split(" ");
    var particionFecha = particion1[0].split("-");
    var particionHora = particion1[1].split(":");

    var anio = particionFecha[2];
    var mes = particionFecha[1];
    if(mes.length < 2) {
      mes = "0" + mes;
    }
    var dia = particionFecha[0];
    if(dia.length < 2) {
      dia = "0" + dia;
    }
    var hora = particionHora[0];
    var minuto = particionHora[1];
    var segundo = particionHora[2];
    return anio+"-"+mes+"-"+dia+"T"+hora+":"+minuto+":"+segundo+"Z";
    //return fecha.replace(UtilFecha.PATRON, "$3-$2-$1T$4:$5:$6Z");
  }

  public static toDate(fecha: string): Date {
    /*
    var particion1 = fecha.split(" ");
    var particionFecha = particion1[0].split("-");
    var particionHora = particion1[1].split(":");

    var anio = particionFecha[2];
    var mes = particionFecha[1];
    if(mes.length < 2) {
      mes = "0" + mes;
    }
    var dia = particionFecha[0];
    if(dia.length < 2) {
      dia = "0" + dia;
    }
    var hora = particionHora[0];
    var minuto = particionHora[1];
    var segundo = particionHora[2];
    var resul = new Date();
    resul.setUTCFullYear(parseInt(anio));
    resul.setUTCMonth(parseInt(mes));
    resul.setUTCDate(parseInt(dia));

    resul.setUTCHours(parseInt(hora));
    resul.setUTCMinutes(parseInt(minuto));
    resul.setUTCSeconds(parseInt(segundo));

    resul.setUTCMilliseconds(0);
    */
    var resul = new Date(UtilFecha.toISO(fecha));
    resul.setTime(resul.getTime() + (resul.getTimezoneOffset() * 60 * 1000));
    return resul;
    //return fecha.replace(UtilFecha.PATRON, "$3-$2-$1T$4:$5:$6Z");
  }

  public static toHour(fecha: Date): string {
    var horas = fecha.getHours().toString();
    if(horas.length == 1) {
      horas = "0" + horas;
    }
    var minutos = fecha.getMinutes().toString();
    if(minutos.length == 1) {
      minutos = "0" + minutos;
    }
    return horas + ":" + minutos;
  }
}
