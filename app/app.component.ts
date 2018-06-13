import { Component, ComponentRef, ViewContainerRef, AfterContentInit, ViewChild, ComponentFactoryResolver, TemplateRef } from '@angular/core';

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
      <ng-container
        [ngTemplateOutlet]="tmp"
        [ngTemplateOutletContext]="tmpOutletCtx">
      </ng-container>

      <template #tmp let-name let-id="id">
        <p>{{name}} / {{id}}</p>
      </template>
    </div>
  `
})
export class AppComponent implements AfterContentInit {

  component: ComponentRef<AuthFormComponent>;

  tmpOutletCtx = {
    $implicit: 'Joe',
    id: "123"
  };

  @ViewChild('entry', { read: ViewContainerRef }) entry: ViewContainerRef;
  @ViewChild('tmp') tempRef: TemplateRef<any>;

  constructor(private resolver: ComponentFactoryResolver) { }

  ngAfterContentInit() {
    const autoFormFactory = this.resolver.resolveComponentFactory(AuthFormComponent);
    this.component = this.entry.createComponent(autoFormFactory);

    // change variable in dynamic component
    this.component.instance.title = 'Dynamic login';
    // subcribe emit event from dynamic component
    this.component.instance.submitted.subscribe(this.login);

    // init template with context
    // $implicit set the default item modal
    this.entry.createEmbeddedView(this.tempRef,{
      $implicit: 'Joe',
      id: '1235'
    });
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

  destoryComponent(){
    this.component.destroy();
  }
}
