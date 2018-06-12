import { Component, ViewContainerRef, AfterContentInit, ViewChild, ComponentFactoryResolver } from '@angular/core';

import { AuthFormComponent } from './auth-form/auth-form.component';

import { User } from './auth-form/auth-form.interface';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
    <div class="app">
      <!--auth-form (submitted)="login($event)">
        <h3>Login User</h3>
        <button type="submit">Login</button>
        <auth-remember (checked)="rememberUser($event)"></auth-remember>
      </auth-form -->

      <!-- dynamic component -->
      <div #entry></div>
    </div>
  `
})
export class AppComponent implements AfterContentInit {

  @ViewChild('entry', { read: ViewContainerRef }) entry: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) { }

  ngAfterContentInit() {
    const autoFormFactory = this.resolver.resolveComponentFactory(AuthFormComponent);
    const component = this.entry.createComponent(autoFormFactory);
  }

  createUser(user: User) {
    console.log('auth-form create user ', user);
  }

  login(user: User) {
    console.log('auth-form login user ', user);
  }

  rememberUser(evt: any) {
    console.log('auth-form message: ', evt);
  }
}
