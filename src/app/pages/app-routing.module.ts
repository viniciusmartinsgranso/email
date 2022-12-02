import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'inbox',
    loadChildren: () => import('./main/inbox/inbox.module').then( m => m.InboxPageModule)
  },
  {
    path: 'outbox',
    loadChildren: () => import('./main/outbox/outbox.module').then( m => m.OutboxPageModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./main/favorites/favorites.module').then( m => m.FavoritesPageModule)
  },
  {
    path: 'spam',
    loadChildren: () => import('./main/spam/spam.module').then( m => m.SpamPageModule)
  },
  {
    path: 'trash',
    loadChildren: () => import('./main/trash/trash.module').then( m => m.TrashPageModule)
  },
  {
    path: 'archived',
    loadChildren: () => import('./main/archived/archived.module').then( m => m.ArchivedPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
