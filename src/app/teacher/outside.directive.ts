import {Directive, ElementRef} from '@angular/core';
import {resolveGlobs} from "tslint/lib/files/resolution";

@Directive({
  selector: '[appOutside]',
  host: {
    '(document:click)': 'onClick($event)',
  }
})
export class OutsideDirective {
  firstClick = true;

  constructor(private elementRef: ElementRef) {
  }

  onClick(event) {
    // tslint:disable-next-line:max-line-length
    if (this.elementRef.nativeElement.style.display === 'block' && !this.elementRef.nativeElement.contains(event.target) && !this.firstClick) {
      this.elementRef.nativeElement.style.display = 'none';
      this.firstClick = true;
      return;
    }
    // tslint:disable-next-line:max-line-length
    if (this.elementRef.nativeElement.style.display === 'block' && !this.elementRef.nativeElement.contains(event.target) && this.firstClick) {
        this.elementRef.nativeElement.style.display = 'block';
        this.firstClick = false;
    }
  }
}
