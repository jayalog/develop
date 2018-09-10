import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageModule } from '../../core/common/page/page.module';
import { NotfoundComponent } from './notfound.component';
import { NotfoundRoutingModule } from './notfound-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NotfoundRoutingModule,
    PageModule,

  ],
  declarations: [NotfoundComponent],
  providers: []
})
export class NotfoundModule {
}
