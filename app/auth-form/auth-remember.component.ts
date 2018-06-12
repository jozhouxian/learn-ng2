import {Component,Output,EventEmitter} from "@angular/core";

@Component({
  selector: 'auth-remember',
  template: `
    <label>
      <input type="checkbox" (change)="onChecked($event.target.checked)">
      Keep me logged in
    </label>
  `
})

export class AuthRememberComponent {

  @Output() checked: EventEmitter<any> = new EventEmitter<any>();

  onChecked(evt: boolean){
    this.checked.emit(evt);
  }
}
