import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProduitRoutingModule } from './produit-routing.module';
import { ProduitComponent } from './produit.component';
import { CategorieComponent } from './categorie/categorie.component';
import { ListComponent } from './list/list.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProduitComponent,
    CategorieComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    ProduitRoutingModule,
    InlineSVGModule,
    ReactiveFormsModule,
  ]
})
export class ProduitModule { }
