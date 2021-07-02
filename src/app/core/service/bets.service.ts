import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BetsService {

  uriJAVA = `${environment.JAVA_SERVER_URL}/api/bets`;
  uri = `${environment.SERVER_URL}/api/bets`;

  constructor(private http: HttpClient) { }

  get(params?: any): Observable<any> {
    return this.http.get(`${this.uri}`, { params });
  }

  getJava(params?: any): Observable<any> {
    return this.http.get(`${this.uriJAVA}`, { params });
  }

  create(body: any): Observable<any> {
    return this.http.post(`${this.uri}/`, body);
  }

  update(body: any): Observable<any> {
    return this.http.put(`${this.uri}/${body.id}`, body);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.uri}/${id}`);
  }

  buyToken(body?: any): Observable<any> {
    return this.http.post(`${this.uri}/buyToken`, body);
  }

  betExist(params?: any): Observable<any> {
    return this.http.get(`${this.uri}/betExist`, { params });
  }
}
