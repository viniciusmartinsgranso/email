import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditUserModalModule } from '../modals/edit-user-modal/edit-user-modal.module';
import { FooterComponent } from './footer.component';

@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    EditUserModalModule
  ],
  exports:[
    FooterComponent
  ]
})
export class FooterModule { }
