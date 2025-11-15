import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../../utils/constants';
import { User } from './model/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersUrl = `${API_URL}/users`;
  user: User | null = null;

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.get<User[]>(this.usersUrl).subscribe({
        next: (users) => {
          const user = users.find((user) => user.email === email);

          if (!user) {
            reject('Email inválido');
            return;
          }

          if (user.password !== password) {
            reject('Contraseña inválida');
            return;
          }

          localStorage.setItem('token', user.email);
          this.user = user;
          this.router.navigate(['dashboard']);
          resolve(user);
        },
        error: (error) => {
          reject('Error al intentar iniciar sesión');
        }
      });
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.user = null;
    this.router.navigate(['login']);
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
