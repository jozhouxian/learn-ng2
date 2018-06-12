import {Component, EventEmitter, ElementRef, Output, ViewChild, AfterViewInit, ContentChild, AfterContentInit, ChangeDetectorRef} from '@angular/core';

import {AuthRememberComponent} from './auth-remember.component';
import {AuthMessageComponent} from './auth-message.component';

import {User} from './auth-form.interface';


@Component({
  selector: 'auth-form',
  templateUrl: './auth-form.template.html',
  styleUrls: ['./auth-form.scss']
})

export class AuthFormComponent implements AfterContentInit, AfterViewInit{

  showMessage: boolean;

  constructor(private ref: ChangeDetectorRef){
    this.showMessage = false;
  }

  @Output() submitted: EventEmitter<User> = new EventEmitter<User>();

  @ContentChild(AuthRememberComponent) remember: AuthRememberComponent;

  @ViewChild(AuthMessageComponent) messageView: AuthMessageComponent;
  @ViewChild('emailRef') email: ElementRef;

  ngAfterViewInit(){
    console.log(this.messageView);

    // method 3
    this.messageView.loggedDays = 31;
    this.ref.detectChanges();
    // method 1
    // setTimeout(
    //   ()=>this.messageView.loggedDays = 30
    // )

    this.email.nativeElement.setAttribute('placeholder', 'please enter email address');
    this.email.nativeElement.classList.add('email');
    this.email.nativeElement.focus();
  }

  ngAfterContentInit(){
    console.log(this.remember);
    if(this.remember){
      this.remember.checked.subscribe((isChecked:boolean) => {
        this.showMessage = isChecked;
      });
    }

    // method 2
    // if(this.messageView){
    //   this.messageView.loggedDays = 30;
    // }
  }

  onsubmit(value: User) {
    this.submitted.emit(value);
  }
}