// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AuthGuard } from '@ab/auth';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const notFoundRoute = {
  path: '**',
  redirectTo: 'not-found',
};
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@ab/home').then((module) => module.HomeModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('@ab/auth').then((module) => module.AuthModule),
  },
  {
    path: 'category',
    loadChildren: () =>
      import('@ab/category').then((module) => module.CategoryModule),
  },
  {
    path: 'not-found',
    loadChildren: () =>
      import('@ab/not-found').then((module) => module.NotFoundModule),
  },
  {
    path: 'resource',
    loadChildren: () =>
      import('@ab/resource').then((module) => module.ResourceModule),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('@ab/search').then((module) => module.SearchModule),
  },
  {
    path: 'resource-new',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('@ab/resource-new').then((module) => module.ResourceNewModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot([...routes, notFoundRoute])],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
