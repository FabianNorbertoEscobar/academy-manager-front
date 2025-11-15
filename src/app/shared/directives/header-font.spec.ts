import { HeaderFont } from './header-font';
import { ElementRef, Renderer2 } from '@angular/core';

describe('HeaderFont', () => {
  it('should create an instance and set style on init', () => {
    const el = { nativeElement: document.createElement('h1') } as ElementRef;
    const renderer = { setStyle: jasmine.createSpy('setStyle') } as unknown as Renderer2;

    const directive = new HeaderFont(el, renderer);
    expect(directive).toBeTruthy();

    directive.ngOnInit();

    expect(renderer.setStyle).toHaveBeenCalledWith(el.nativeElement, 'font-size', '30px');
  });
});
