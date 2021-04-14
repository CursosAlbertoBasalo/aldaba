import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    LayoutComponent,
    NavbarComponent,
    FooterComponent,
    NotificationComponent,
  ],
  exports: [LayoutComponent, NavbarComponent],
})
export class LayoutModule {}
