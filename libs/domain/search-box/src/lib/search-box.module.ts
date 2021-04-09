import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SearchBoxComponent } from './search-box/search-box.component';
import { SearchBoxWidget } from './search-box.widget';

@NgModule({
  imports: [CommonModule],
  declarations: [SearchBoxComponent, SearchBoxWidget],
  exports: [SearchBoxWidget],
})
export class SearchBoxModule {}
