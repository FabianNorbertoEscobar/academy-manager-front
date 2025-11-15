import { NgModule } from '@angular/core';

/**
 * Lightweight mock of NoopAnimationsModule for specs in projects that don't have
 * @angular/animations installed. Use this in TestBed imports for tests that
 * would otherwise import NoopAnimationsModule from
 * '@angular/platform-browser/animations'.
 *
 * Example in a spec file:
 * import { NoopAnimationsModule } from 'src/test-utils/noop-animations-mock';
 *
 * TestBed.configureTestingModule({
 *   imports: [NoopAnimationsModule, ...]
 * })
 */
@NgModule({})
export class NoopAnimationsModule { }
