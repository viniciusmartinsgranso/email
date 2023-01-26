import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditUserModalComponent } from './edit-user-modal.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    EditUserModalComponent
  ],
  exports: [
    EditUserModalComponent
  ]
})
export class EditUserModalModule { }
