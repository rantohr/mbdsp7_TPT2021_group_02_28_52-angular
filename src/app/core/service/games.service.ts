import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  uri = `${environment.JAVA_SERVER_URL}/api/games`;
  nodeUri = `${environment.SERVER_URL}/api/games`;

  constructor(private http: HttpClient) { }

  get(params?: any): Observable<any> {
    return this.http.get(`${this.uri}`, { params });
  }

  getTeams(params?: any): Observable<any> {
    return this.http.get(`${environment.JAVA_SERVER_URL}/api/teams`, { params });
  }

  getById(_id: any): Observable<any> {
    return this.http.get(`${this.uri}/${_id}`);
  }

  load(): Observable<any> {
    return this.http.get(`${this.uri}/charger`);
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

  getWithFilter(params?: any): Observable<any> {
    return this.http.get(`${this.nodeUri}/get`, { params });
  }

  getUpcoming(params?: any): Observable<any> {
    return this.http.get(`${this.nodeUri}/upcoming`, { params });
  }

  getTop(params?: any): Observable<any> {
    return this.http.get(`${this.nodeUri}/top`, { params });
  }

  getResult(params?: any): Observable<any> {
    return this.http.get(`${this.nodeUri}/result`, { params });
  }

  getHistory(params?: any): Observable<any> {
    return this.http.get(`${this.nodeUri}/history`, { params });
  }

  gamesPerMonth(params?: any): Observable<any> {
    return this.http.get(`${this.nodeUri}/stats/gamesPerMonth`, { params });
  }

  victoryPerTeams(params?: any): Observable<any> {
    return this.http.get(`${this.nodeUri}/stats/victoryPerTeams`, { params });
  }

  gamesPerCities(params?: any): Observable<any> {
    return this.http.get(`${this.nodeUri}/stats/gamesPerCities`, { params });
  }

  betsPerUsers(params?: any): Observable<any> {
    return this.http.get(`${this.nodeUri}/stats/betsPerUsers`, { params });
  }

  gamblersByAge(params?: any): Observable<any> {
    return this.http.get(`${this.nodeUri}/stats/gamblersByAge`, { params });
  }

  gamblersByGender(params?: any): Observable<any> {
    return this.http.get(`${this.nodeUri}/stats/gamblersByGender`, { params });
  }

  richestGamblers(params?: any): Observable<any> {
    return this.http.get(`${this.nodeUri}/stats/richestGamblers`, { params });
  }

  profitForWebsite(params?: any): Observable<any> {
    return this.http.get(`${this.nodeUri}/stats/profitForWebsite`, { params });
  }

  betsPerGames(params?: any): Observable<any> {
    return this.http.get(`${this.nodeUri}/stats/betsPerGames`, { params });
  }

  count(params?: any): Observable<any> {
    return this.http.get(`${this.nodeUri}/stats/count`, { params });
  }

  profitPerUser(params?: any): Observable<any> {
    return this.http.get(`${this.nodeUri}/stats/profitPerUser`, { params });
  }

}
