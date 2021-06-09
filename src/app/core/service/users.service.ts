import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  uri = `${environment.SERVER_URL}/api/users`;

  constructor(private http: HttpClient) {}

  get(params?: any): Observable<any> {
    return this.http.get(`${this.uri}/`, { params });
  }

  getById(_id: any): Observable<any> {
    return this.http.get(`${this.uri}/?_id=${_id}`);
  }

  create(body: any): Observable<any> {
    return this.http.post(`${this.uri}/`, body);
  }

  update(body: any): Observable<any> {
    return this.http.put(`${this.uri}/${body._id}`, body);
  }

  delete(_id: any): Observable<any> {
    return this.http.delete(`${this.uri}/${_id}`);
  }
}
