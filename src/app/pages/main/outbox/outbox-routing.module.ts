import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OutboxPage } from './outbox.page';

const routes: Routes = [
  {
    path: '',
    component: OutboxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutboxPageRoutingModule {}
