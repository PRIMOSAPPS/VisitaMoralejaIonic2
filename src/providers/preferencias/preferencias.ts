import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

@Injectable()
export class Preferencias {

  public constructor(private storage: Storage) {}

  private static get PREF_SONIDO(): string { return 'pref_sonido'; }
  private static get PREF_VIBRAR(): string { return 'pref_vibrar'; }
  private static get PREF_LED(): string { return 'pref_led'; }

  private getPreferencia(preferencia): Promise<any> {
    return this.storage.get(preferencia);
  }

  private setPreferencia(preferencia, valor): Promise<any> {
    return this.storage.set(preferencia, valor);
  }

  public getPrefSonido(): Promise<any> {
    return this.getPreferencia(Preferencias.PREF_SONIDO);
  }

  public setPrefSonido(valor): Promise<any> {
    return this.setPreferencia(Preferencias.PREF_SONIDO, valor);
  }

  public getPrefVibrar(): Promise<any> {
    return this.getPreferencia(Preferencias.PREF_VIBRAR);
  }

  public setPrefVibrar(valor): Promise<any> {
    return this.setPreferencia(Preferencias.PREF_VIBRAR, valor);
  }

  public getPrefLed(): Promise<any> {
    return this.getPreferencia(Preferencias.PREF_LED);
  }

  public setPrefLed(valor): Promise<any> {
    return this.setPreferencia(Preferencias.PREF_LED, valor);
  }

}
