import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ResourceNewPage } from './resource-new.page';
import { ResourceNewComponent } from './resource-new/resource-new.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
  ],
  declarations: [ResourceNewPage, ResourceNewComponent],
})
export class ResourceNewModule {}
