import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BreadcrumbsModule } from '../../breadcrumbs/breadcrumbs.module';
import { ScrollbarModule } from '../scrollbar/scrollbar.module';
import { SnackbarModule } from '../snackbar/snackbar.module';
import { ChipListModule } from '../chiplist/chiplist.module';
import { PagePaddingDirective } from './page-padding.directive';
import { PageDirective } from './page.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PageDirective, PagePaddingDirective],
  exports: [
    PageDirective,
    PagePaddingDirective,
    ScrollbarModule,
    BreadcrumbsModule,
    SnackbarModule,
    ChipListModule
  ]
})
export class PageModule {
}
