import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DetailsPage } from '../pages/details/details';
import { RestapiService } from '../providers/restapi-service';
import { ExclusionFilterPipe } from '../pipes/exclusion-filter-pipe';
import { KeysPipe } from '../pipes/keys-pipe';
import { Storage } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailsPage,
    ExclusionFilterPipe,
    KeysPipe
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, RestapiService, Storage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
