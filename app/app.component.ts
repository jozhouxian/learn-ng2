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
      <!--two method to create embededView one-->
      <template #tmp let-name let-id="id">
        <p>{{name}} / {{id}}</p>
      </template>
      <!--two method to create embededView two-->
      <ng-container
        [ngTemplateOutlet]="tmp"
        [ngTemplateOutletContext]="tmpOutletCtx">
      </ng-container>
    </div>
    
    <div class="app">
      <form>
        <h3>Custom Directive</h3>
        <label>
          Credit Card Number
          <input
            type="text"
            name="credit-card"
            placeholder="pls enter credit-number"
            credit-card=""
          >
        </label>
        <label
          tooltip="3 digital numbers"
          #myTooltip="tooltipp"
        >
          Enter Your Security Code
          <span
            (mouseover)="myTooltip.show()"
            (mouseout)="myTooltip.hide()"
          >(?)</span>
          <input type="text">
        </label>
      </form>
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
    const authFormFactory = this.resolver.resolveComponentFactory(AuthFormComponent);
    this.component = this.entry.createComponent(authFormFactory);

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
