import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailItemComponent } from './email-item.component';



@NgModule({
  declarations: [
    EmailItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EmailItemComponent,
  ]
})
export class EmailItemModule { }
