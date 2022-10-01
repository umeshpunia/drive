import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient
  ) { }

  registration(data:any){
    return this.http.post(`${environment.apiUrl}/user/register`,data)
  }

  login(data:any){
    return this.http.post(`${environment.apiUrl}/user/login`,data)
  }
  
  forget(data:any){
    return this.http.post(`${environment.apiUrl}/user/forget-password`,data)
    
  }
}
