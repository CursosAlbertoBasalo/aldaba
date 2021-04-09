import { UiModule } from '@ab/ui';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ResourcePage } from './resource.page';
import { ResourceResolver } from './resource.resolver';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: ':id',
        pathMatch: 'full',
        component: ResourcePage,
        resolve: {
          resource: ResourceResolver,
        },
      },
    ]),
    UiModule,
  ],
  declarations: [ResourcePage],
})
export class ResourceModule {}
