import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MontresPageRoutingModule } from './montres-routing.module';

import { MontresPage } from './montres.page';

import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MontresPageRoutingModule,
    SharedModule
  ],
  declarations: [MontresPage]
})
export class MontresPageModule {}
