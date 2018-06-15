import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AuthFormModule} from './auth-form/auth-form.module';

import {CreditCardDirective} from './credit-card/credit-card.directive';
import {TooltipDirective} from "./tooltip/tooltip.directive";

@NgModule({
  imports: [
    BrowserModule,
    AuthFormModule
  ],
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent,
    CreditCardDirective,
    TooltipDirective
  ]
})
export class AppModule {
}
