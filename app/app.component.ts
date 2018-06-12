import { Component } from '@angular/core';
import { User} from "./auth-form/auth-form.interface";

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
    <div class="app">
      <auth-form (submitted)="login($event)">
        <h3>Login User</h3>
        <button type="submit">Login</button>
        <auth-remember (checked)="rememberUser($event)"></auth-remember>
      </auth-form>
    </div>
  `
})
export class AppComponent {
  createUser(user: User){
    console.log('auth-form create user ', user);
  }

  login(user: User){
    console.log('auth-form login user ', user);
  }

  rememberUser(evt: any){
    console.log('auth-form message: ',evt);
  }
}