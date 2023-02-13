import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorRoutingModule } from './vendor-routing.module';
import { VendorComponent } from './vendor.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { ListCategorieComponent } from './list-categorie/list-categorie.component';
import { AddCategorieComponent } from './add-categorie/add-categorie.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { WidgetsModule } from '../../_metronic/partials';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [
    VendorComponent,
    ListComponent,
    AddComponent,
    ListCategorieComponent,
    AddCategorieComponent
  ],
  imports: [
    CommonModule,
    VendorRoutingModule,
    InlineSVGModule,
    ReactiveFormsModule,
    Ng2TelInputModule,
    WidgetsModule,
    NgbModule
  ]
})
export class VendorModule { }
