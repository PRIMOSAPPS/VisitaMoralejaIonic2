import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Cabecera } from '../components/cabecera/cabecera';
import { PreferenciasPage } from '../pages/preferencias/preferencias';

import { ListaSitiosPage } from '../pages/listasitios/listasitios';
import { ListadoSitiosPage } from '../pages/listado/listadositios';
import { DetalleSitioPage } from '../pages/detallesitio/detallesitio';
import { InicioEventoPage } from '../pages/inicioevento/inicioevento';
import { ListadoEventosPage } from '../pages/listado/listadoeventos';
import { ListadoSitiosEventoPage } from '../pages/listado/listadositiosevento';

import { MapaPage } from '../pages/mapa/mapa';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    Cabecera,
    PreferenciasPage,
    ListaSitiosPage,
    DetalleSitioPage,
    MapaPage,
    InicioEventoPage,
    ListadoSitiosPage,
    ListadoEventosPage,
    ListadoSitiosEventoPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    Cabecera,
    PreferenciasPage,
    ListaSitiosPage,
    DetalleSitioPage,
    MapaPage,
    InicioEventoPage,
    ListadoSitiosPage,
    ListadoEventosPage,
    ListadoSitiosEventoPage
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
