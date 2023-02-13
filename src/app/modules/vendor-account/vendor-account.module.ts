import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorAccountRoutingModule } from './vendor-account-routing.module';
import { VendorAccountComponent } from './vendor-account.component';
import { InfoComponent } from './info/info.component';
import { ProduitComponent } from './produit/produit.component';
import { StatComponent } from './stat/stat.component';
import { AddProductComponent } from './add-product/add-product.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TransportComponent } from './transport/transport.component';






@NgModule({
  declarations: [
    VendorAccountComponent,
    InfoComponent,
    ProduitComponent,
    StatComponent,
    AddProductComponent,
    TransportComponent
  ],
  imports: [
    CommonModule,
    VendorAccountRoutingModule,
    InlineSVGModule,
    NgApexchartsModule,
    Ng2TelInputModule,
    ReactiveFormsModule,
    NgbModule

    
  ]

})


export class VendorAccountModule { }
