import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorieComponent } from './categorie/categorie.component';
import { ListComponent } from './list/list.component';
import { ProduitComponent } from './produit.component';

const routes: Routes = [
  {
    path: '',
    component:  ProduitComponent,
    children: [
      {
        path: 'categorie',
        component: CategorieComponent,
      },

      {
        path: 'list',
        component: ListComponent,
      },
   
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: '**', redirectTo: 'list', pathMatch: 'full' },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProduitRoutingModule { }
