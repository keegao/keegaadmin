import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddParterComponent } from './add-parter/add-parter.component';
import { ListComponent } from './list/list.component';
import { ParterComponent } from './parter.component';

const routes: Routes = [
  {
    path: '',
    component: ParterComponent,
    children: [
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'add',
        component: AddParterComponent,
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
export class ParterRoutingModule { }
