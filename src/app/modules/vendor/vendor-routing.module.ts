import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard2 } from '../auth/services/auth.guard';
import { AddCategorieComponent } from './add-categorie/add-categorie.component';
import { AddComponent } from './add/add.component';
import { ListCategorieComponent } from './list-categorie/list-categorie.component';
import { ListComponent } from './list/list.component';
import { VendorComponent } from './vendor.component';

const routes: Routes = [
  {
    path: '',
    component: VendorComponent,
    children: [
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'add',
        component: AddComponent,
      },

      {
        canActivate: [AuthGuard2],
        path: 'categorie',
        component: ListCategorieComponent,
      },

      {
        canActivate: [AuthGuard2],
        path: 'addcategorie',
        component: AddCategorieComponent,
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
export class VendorRoutingModule { }
