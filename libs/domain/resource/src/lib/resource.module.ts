import { UiModule } from '@ab/ui';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ResourcePage } from './resource.page';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: ':id',
        pathMatch: 'full',
        component: ResourcePage,
      },
    ]),
    UiModule,
  ],
  declarations: [ResourcePage],
})
export class ResourceModule {}
