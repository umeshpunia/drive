import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogin = new BehaviorSubject<boolean>(false);
  login: boolean = false;

  constructor(private http: HttpClient) {
    this.isLoginMethod();
  }

  registration(data: any) {
    return this.http.post(`${environment.apiUrl}/user/register`, data);
  }

  loginUser(data: any) {
    return this.http.post(`${environment.apiUrl}/user/login`, data);
  }

  forget(data: any) {
    return this.http.post(`${environment.apiUrl}/user/forget-password`, data);
  }

  private isLoginMethod() {
    this.isLogin.subscribe((res) => {
      if (res) {
        this.login = true;
      } else {
        this.login = false;
      }
      console.log(res);
    });
  }
}
