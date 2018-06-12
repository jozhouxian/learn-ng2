import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {AuthFormComponent} from './auth-form.component';
import {AuthRememberComponent} from './auth-remember.component';
import {AuthMessageComponent} from './auth-message.component';

@NgModule({
  declarations: [
    AuthFormComponent,
    AuthRememberComponent,
    AuthMessageComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ],
  exports: [
    AuthFormComponent,
    AuthRememberComponent
  ]
})

export class AuthFormModule {
}
