import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { InfoComponent } from './info/info.component';
import { ProduitComponent } from './produit/produit.component';
import { StatComponent } from './stat/stat.component';
import { TransportComponent } from './transport/transport.component';
import { VendorAccountComponent } from './vendor-account.component';

const routes: Routes = [
  {
    path: '',
    component:  VendorAccountComponent,
    children: [
      {
        path: 'info/:id',
        component: InfoComponent,
      },
      {
        path: 'produit/:id',
        component: ProduitComponent,
      },

      {
        path: 'stat/:id',
        component: StatComponent,
      },
      {
        path: 'ajout/:id',
        component: AddProductComponent,
      },

      {
        path: 'transport/:id',
        component: TransportComponent,
      },
      { path: ':id', redirectTo: 'info/:id', pathMatch: 'full' },
      { path: '**', redirectTo: 'info', pathMatch: 'full' },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorAccountRoutingModule { }
