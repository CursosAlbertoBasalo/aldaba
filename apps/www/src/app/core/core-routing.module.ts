import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('@ab/home').then((module) => module.HomeModule),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('@ab/search').then((module) => module.SearchModule),
  },
  {
    path: 'not-found',
    loadChildren: () =>
      import('@ab/not-found').then((module) => module.NotFoundModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
