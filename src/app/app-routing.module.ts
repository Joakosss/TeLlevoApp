import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { activadoGuard } from './guard/activado.guard';
import { desActivadoGuard } from './guard/des-activado.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./Pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
  
  {
    path: 'splash',
    loadChildren: () =>
      import('./Pages/autenticacion/splash/splash.module').then(
        (m) => m.SplashPageModule
      ),
      canActivate: [desActivadoGuard]
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./Pages/autenticacion/login/login.module').then(
        (m) => m.LoginPageModule
      ),
      canActivate: [desActivadoGuard]
  },
  {
    path: 'registro',
    loadChildren: () =>
      import('./Pages/autenticacion/registro/registro.module').then(
        (m) => m.RegistroPageModule
      ),
      canActivate: [desActivadoGuard]
  },
  {
    path: 'recupera-password',
    loadChildren: () =>
      import(
        './Pages/autenticacion/recupera-password/recupera-password.module'
      ).then((m) => m.RecuperaPasswordPageModule),
      canActivate: [desActivadoGuard]
  },

  {
    path: 'home-pasajero',
    loadChildren: () =>
      import('./Pages/pasajero/home-pasajero/home-pasajero.module').then(
        (m) => m.HomePasajeroPageModule
      ),
      canActivate: [activadoGuard],
      
  },
  {
    path: 'home-chofer',
    loadChildren: () =>
      import('./Pages/chofer/home-chofer/home-chofer.module').then(
        (m) => m.HomeChoferPageModule
      ),
      canActivate: [activadoGuard],
  },
  {
    path: 'perfil-pasajero',
    loadChildren: () =>
      import('./Pages/pasajero/perfil-pasajero/perfil-pasajero.module').then(
        (m) => m.PerfilPasajeroPageModule
      ),
      canActivate: [activadoGuard]
  },
  {
    path: 'qr-pasajero',
    loadChildren: () =>
      import('./Pages/pasajero/qr-pasajero/qr-pasajero.module').then(
        (m) => m.QrPasajeroPageModule
      ),
      canActivate: [activadoGuard]
  },
  {
    path: 'misviajes-pasajero',
    loadChildren: () =>
      import(
        './Pages/pasajero/misviajes-pasajero/misviajes-pasajero.module'
      ).then((m) => m.MisviajesPasajeroPageModule),
      canActivate: [activadoGuard]
  },
  {
    path: 'misviajes-chofer',
    loadChildren: () =>
      import('./Pages/chofer/misviajes-chofer/misviajes-chofer.module').then(
        (m) => m.MisviajesChoferPageModule
      ),
      canActivate: [activadoGuard]
  },
  {
    path: 'perfil-chofer',
    loadChildren: () =>
      import('./Pages/chofer/perfil-chofer/perfil-chofer.module').then(
        (m) => m.PerfilChoferPageModule
      ),
      canActivate: [activadoGuard]
  },
  {
    path: 'qr-chofer',
    loadChildren: () =>
      import('./Pages/chofer/qr-chofer/qr-chofer.module').then(
        (m) => m.QrChoferPageModule
      ),
      canActivate: [activadoGuard]
  },
  {
    path: 'mod-viaje',
    loadChildren: () =>
      import('./Pages/chofer/mod-viaje/mod-viaje.module').then(
        (m) => m.ModViajePageModule
      ),
      canActivate: [activadoGuard]
  },
  {
    path: 'lector-qr',
    loadChildren: () => import('./Pages/pasajero/lector-qr/lector-qr.module').then( m => m.LectorQrPageModule)
  },
  /* La página de error siempre debe quedar al final para que no genere conflictos */
  {
    path: '**',
    loadChildren: () =>
      import('./Pages/p404/p404.module').then((m) => m.P404PageModule),
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
