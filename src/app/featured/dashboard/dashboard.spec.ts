import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../../core/services/auth/auth';
import { SharedModule } from '../../shared/shared-module';
import { RouterTestingModule } from '@angular/router/testing';

import { Dashboard } from './dashboard';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);

    await TestBed.configureTestingModule({
      declarations: [Dashboard],
      imports: [SharedModule, RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    })
      .compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have menu items', () => {
    expect(component.listItems).toBeTruthy();
    expect(component.listItems.length).toBe(3);
  });

  it('should call logout on AuthService', () => {
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
  });
});
