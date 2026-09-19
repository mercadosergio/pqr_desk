import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./modules/home/home.page'),
  },
  {
    path: 'pqr/nuevo',
    loadComponent: () => import('./modules/pqr-form/pqr-form.page'),
  },
  {
    path: 'estadisticas',
    loadComponent: () => import('./modules/statistics/statistics.page'),
  },
  {
    path: 'pqr/:id',
    loadComponent: () => import('./modules/detail/detail.page'),
  },
];
