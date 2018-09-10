import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import Amplify, { Storage } from 'aws-amplify';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import 'hammerjs'; // Needed for Touch functionality of Material Components

import { amplifyConfig, storageConfig } from '../config/config';
import { environment } from '../environments/environment';
import { RoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthGuard } from './authguard';
import { SharedDataService } from './services/shared-data.service';
import { ApiService } from './services/api.service';
import { AwsService } from './services/aws.service';
import { ToastrModule } from 'ngx-toastr';
import { UrlExtractorService } from './services/url.extractor.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // Angular Core Module // Don't remove!
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AmplifyAngularModule,
    // Fury Core Modules
    CoreModule,
    RoutingModule,
    FormsModule,
    ToastrModule.forRoot(),
    // Register a Service Worker (optional)
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AmplifyService, AuthGuard, SharedDataService, ApiService, AwsService, UrlExtractorService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    Amplify.configure(amplifyConfig);
    Storage.configure(storageConfig);
  }
}
