import {Component} from '@angular/core';

@Component({
  selector: 'auth-message',
  template: `
    <div>you will be logged in for {{loggedDays}} days</div>
  `
})

export class AuthMessageComponent {
  loggedDays: number;
  constructor(){
    this.loggedDays = 7;
  }
}
