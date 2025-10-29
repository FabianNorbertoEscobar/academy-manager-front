import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHeaderFont]',
  standalone: false
})
export class HeaderFont {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement, 'font-size', '30px');
  }
}
