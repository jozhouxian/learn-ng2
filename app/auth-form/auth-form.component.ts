import {Component, Renderer, EventEmitter, ElementRef, Output, ViewChild, AfterViewInit, ContentChild, AfterContentInit, ChangeDetectorRef} from '@angular/core';

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
  title: string;

  constructor(
    private ref: ChangeDetectorRef,
    private renderer: Renderer
  ){
    this.showMessage = false;
    this.title = 'Login';
  };

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

    // method 1 use nativeElement
    // this.email.nativeElement.setAttribute('placeholder', 'please enter email address');
    // this.email.nativeElement.classList.add('email');
    // this.email.nativeElement.focus();

    // method 2 use renderer recommended
    this.renderer.setElementAttribute(this.email.nativeElement,'placeholder','pls enter email address');
    this.renderer.setElementClass(this.email.nativeElement,'email',true);
    this.renderer.invokeElementMethod(this.email.nativeElement,'focus');

  }

  ngAfterContentInit(){
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
