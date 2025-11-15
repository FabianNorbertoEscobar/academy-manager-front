import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';

import { AuthService } from './auth';
import { API_URL } from '../../utils/constants';
import { Role, User } from './model/User';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let router: jasmine.SpyObj<Router>;

  const mockUser: User = {
    id: '1',
    email: 'test@example.com',
    password: 'password123',
    username: 'testuser',
    role: Role.ADMIN
  };

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login successfully with valid credentials', (done) => {
    service.login(mockUser.email, mockUser.password).then((user) => {
      expect(user).toEqual(mockUser);
      expect(localStorage.getItem('token')).toBe(mockUser.email);
      expect(service.user).toEqual(mockUser);
      expect(router.navigate).toHaveBeenCalledWith(['dashboard']);
      done();
    });

    const req = httpMock.expectOne(`${API_URL}/users`);
    expect(req.request.method).toBe('GET');
    req.flush([mockUser]);
  });

  it('should reject login with invalid email', (done) => {
    service.login('invalid@example.com', mockUser.password).catch((error) => {
      expect(error).toBe('Email inválido');
      expect(localStorage.getItem('token')).toBeNull();
      expect(router.navigate).not.toHaveBeenCalled();
      done();
    });

    const req = httpMock.expectOne(`${API_URL}/users`);
    req.flush([mockUser]);
  });

  it('should reject login with invalid password', (done) => {
    service.login(mockUser.email, 'wrongpassword').catch((error) => {
      expect(error).toBe('Contraseña inválida');
      expect(localStorage.getItem('token')).toBeNull();
      expect(router.navigate).not.toHaveBeenCalled();
      done();
    });

    const req = httpMock.expectOne(`${API_URL}/users`);
    req.flush([mockUser]);
  });

  it('should logout and clear user data', () => {
    localStorage.setItem('token', mockUser.email);
    service.user = mockUser;

    service.logout();

    expect(localStorage.getItem('token')).toBeNull();
    expect(service.user).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should return true if user is authenticated', () => {
    localStorage.setItem('token', mockUser.email);

    const result = service.isAuthenticated();

    expect(result).toBe(true);
  });

  it('should return false if user is not authenticated', () => {
    const result = service.isAuthenticated();

    expect(result).toBe(false);
  });
});
