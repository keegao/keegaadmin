import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';

import { ParterRoutingModule } from './parter-routing.module';
import { ListComponent } from './list/list.component';
import { AddParterComponent } from './add-parter/add-parter.component';
import { ParterComponent } from './parter.component';
import { ReactiveFormsModule } from '@angular/forms';
import {Ng2TelInputModule} from 'ng2-tel-input';






@NgModule({
  declarations: [
    ListComponent,
    AddParterComponent,
    ParterComponent,
    

  ],
  imports: [
    CommonModule,
    ParterRoutingModule,
    InlineSVGModule,
    ReactiveFormsModule,
    Ng2TelInputModule

  ]
})
export class ParterModule { }
