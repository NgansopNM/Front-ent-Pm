import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [  
  {
    path: '',
    redirectTo: 'home',  
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'produit',
    loadChildren: () => import('./produit/produit.module').then(m => m.ProduitPageModule)
  },
  {
    path: 'montres',
    loadChildren: () => import('./montres/montres.module').then( m => m.MontresPageModule)
  },
  {
    path: 'machines',
    loadChildren: () => import('./machines/machines.module').then( m => m.MachinesPageModule)
  },
  
  {
    path: 'autres',
    loadChildren: () => import('./autres/autres.module').then( m => m.AutresPageModule)
  },
  {
    path: 'detail-produit/:id',
    loadChildren: () => import('./detail-produit/detail-produit.module').then( m => m.DetailProduitPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'supports',
    loadChildren: () => import('./supports/supports.module').then( m => m.SupportsPageModule)
  },  {
    path: 'panier',
    loadChildren: () => import('./panier/panier.module').then( m => m.PanierPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }