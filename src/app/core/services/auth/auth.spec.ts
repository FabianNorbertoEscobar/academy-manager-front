import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { AuthService } from './auth';
import { API_URL } from '../../utils/constants';
import { Role, User } from './model/User';
import { Store } from '@ngrx/store';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let router: jasmine.SpyObj<Router>;
  let store: jasmine.SpyObj<Store<any>>;

  const mockUser: User = {
    id: '1',
    email: 'test@example.com',
    password: 'password123',
    username: 'testuser',
    role: Role.ADMIN
  };

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    store = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    store.select.and.returnValue(of(null));

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy },
        { provide: Store, useValue: store }
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
    store.dispatch.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login successfully with valid credentials', (done) => {
    service.login(mockUser.email, mockUser.password).then((user) => {
      expect(user).toEqual(mockUser);
      expect(localStorage.getItem('token')).toBe(`${mockUser.email}&${mockUser.password}`);
      expect(store.dispatch).toHaveBeenCalledWith(jasmine.objectContaining({ payload: mockUser }));
      done();
    }).catch((err) => {
      fail(err);
      done();
    });

    const req = httpMock.expectOne(`${API_URL}/users`);
    expect(req.request.method).toBe('GET');
    req.flush([mockUser]);
  });

  it('should error on login with invalid email', (done) => {
    service.login('invalid@example.com', mockUser.password).then(() => {
      fail('Expected an error');
      done();
    }).catch((err: Error) => {
      expect(err.message).toBe('Email inválido');
      expect(localStorage.getItem('token')).toBeNull();
      expect(store.dispatch).not.toHaveBeenCalled();
      done();
    });

    const req = httpMock.expectOne(`${API_URL}/users`);
    req.flush([mockUser]);
  });

  it('should error on login with invalid password', (done) => {
    service.login(mockUser.email, 'wrongpassword').then(() => {
      fail('Expected an error');
      done();
    }).catch((err: Error) => {
      expect(err.message).toBe('Contraseña inválida');
      expect(localStorage.getItem('token')).toBeNull();
      expect(store.dispatch).not.toHaveBeenCalled();
      done();
    });

    const req = httpMock.expectOne(`${API_URL}/users`);
    req.flush([mockUser]);
  });

  it('should logout and clear user data', () => {
    localStorage.setItem('token', `${mockUser.email}&${mockUser.password}`);

    service.logout();

    expect(localStorage.getItem('token')).toBeNull();
    expect(store.dispatch).toHaveBeenCalledWith(jasmine.objectContaining({ payload: null }));
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should return true if user is authenticated', () => {
    localStorage.setItem('token', `${mockUser.email}&${mockUser.password}`);

    const result = service.isAuthenticated();

    expect(result).toBe(true);
  });

  it('should return false if user is not authenticated', () => {
    const result = service.isAuthenticated();

    expect(result).toBe(false);
  });
});
