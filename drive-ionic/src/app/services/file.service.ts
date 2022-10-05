import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}

  fileUpload(data: any) {
    return this.http.post(`${environment.apiUrl}/file/upload`, data);
  }

  getFiles(email: string) {
    return this.http.post(`${environment.apiUrl}/file/get`, { email });
  }
}
