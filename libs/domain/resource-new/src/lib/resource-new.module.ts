import { AuthGuard } from '@ab/auth';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ResourceNewPage } from './resource-new.page';
import { ResourceNewComponent } from './resource-new/resource-new.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        canActivate: [AuthGuard],
        component: ResourceNewPage,
      },
    ]),
  ],
  declarations: [ResourceNewPage, ResourceNewComponent],
})
export class ResourceNewModule {}
