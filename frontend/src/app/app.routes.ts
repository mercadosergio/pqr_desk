import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./modules/home/home.page'),
  },
  {
    path: 'pqr/:id',
    loadComponent: () => import('./modules/detail/detail.page'),
  },
];
