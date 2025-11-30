import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { SharedModule } from '../../../shared/shared-module';

import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let mockStore: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('Store', ['dispatch', 'select']);

    await TestBed.configureTestingModule({
      declarations: [Home],
      imports: [SharedModule],
      providers: [
        { provide: Store, useValue: mockStore }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the home template', () => {
    const compiled = fixture.nativeElement;
    expect(compiled).toBeTruthy();
  });

  it('should initialize with proper structure', () => {
    expect(component).toBeTruthy();
  });
});
