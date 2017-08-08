import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { ListadoSitiosPage } from '../pages/listado/listadositios';

import { Constantes } from '../otros/constantes/constantes';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, parametros: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, parametros: null },
      { title: 'List', component: ListPage, parametros: null },
      { title: 'Conoce Moraleja',  component: ListadoSitiosPage,
        parametros: {idCategoria: Constantes.ID_CATEGORIA_CONOCE}
      },
      { title: 'Comer/dormir',  component: ListadoSitiosPage,
        parametros: {idCategoria: Constantes.ID_CATEGORIA_COMER}
      },
      { title: 'Tomar algo',  component: ListadoSitiosPage,
        parametros: {idCategoria: Constantes.ID_CATEGORIA_TOMAR_ALGO}
      },
      { title: 'De compras',  component: ListadoSitiosPage,
        parametros: {idCategoria: Constantes.ID_CATEGORIA_DE_COMPRAS}
      },
      { title: 'Servicios',  component: ListadoSitiosPage,
        parametros: {idCategoria: Constantes.ID_CATEGORIA_SERVICIOS_REPARACIONES}
      },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.parametros) {
      this.nav.setRoot(page.component, page.parametros);
    } else {
      this.nav.setRoot(page.component);
    }
  }
}
