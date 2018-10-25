import { Directive, Renderer, ElementRef, Input } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard';
import { Platform } from 'ionic-angular';

@Directive({
  selector: '[focuser]' // Attribute selector
})
export class FocuserDirective {

  @Input() focuser: any = false;

  constructor(
    private renderer: Renderer,
    private elementRef: ElementRef,
    private platform: Platform,
    private keyboard: Keyboard
  ) {

  }

  ngAfterViewInit() {
    console.log('focuser on!');
    const element = this.elementRef.nativeElement.querySelector('input');
    console.log('element', element);
    setTimeout(() => {
      if (!this.platform.is('ios')) {
        this.renderer.invokeElementMethod(element, 'focus', []);
        this.keyboard.show();
      } else {
        console.log('is ios');
        this.renderer.invokeElementMethod(element, 'focus', []);
      }
    }, 500);
  }
}