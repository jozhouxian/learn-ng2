import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[credit-card]'
})

export class CreditCardDirective {
  constructor(private eleRef: ElementRef) {}

  @HostBinding('style.border') border: string;

  @HostListener('input',['$event'])
  onKeyDown(event: KeyboardEvent){
    const input = event.target as HTMLInputElement;

    let trimmed = input.value.replace(/\s+/g,'');
    if (trimmed.length > 16){
      trimmed = trimmed.substr(0,16);
    }

    let arr: string[] = [];
    for(let i = 0; i<trimmed.length; i+=4){
      arr.push(trimmed.substr(i,4));
    }

    input.value = arr.join(' ');
    this.border = '';
    if(/[^\d]+/.test(trimmed)){
      this.border = '1px solid red';
    }
  }
}
