import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { TokenErrorInterceptor } from './shared/interceptor/token-error.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenErrorInterceptor,
    multi: true
  } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
