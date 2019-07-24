import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_ENDPOINT } from '../config/config';
import { URL_ENUMERADOS } from '../config/config';
import { Generic } from '../models/Generic';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private urlEndPoint: string = URL_ENDPOINT;
  private urlEndPointEnum: string = URL_ENUMERADOS;

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  private header = new HttpHeaders()
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE')
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json; charset=utf-8');

  constructor(private http: HttpClient) {}

  getItem(action: string, id: number): Observable<Generic> {
    return this.http.get<Generic>(`${this.urlEndPoint + action}/${id}`);
  }

  getEnumerados(action: string): Observable<Generic[]> {
    return this.http.get<Generic[]>(`${this.urlEndPointEnum + action}`);
  }

  getItems(action: string): Observable<Generic[]> {
    return this.http.get<Generic[]>(`${this.urlEndPoint + action}`);
  }

  getItemsById(action: string, id: number): Observable<Generic[]> {
    return this.http.get<Generic[]>(`${this.urlEndPoint + action}/${id}`);
  }

  create(action: string, item: Generic): Observable<Generic> {
    return this.http.post<Generic>(this.urlEndPoint + action, item, { headers: this.httpHeaders });
  }

  update(action: string, item: Generic): Observable<Generic> {
    return this.http.put<Generic>(`${this.urlEndPoint + action}/${item.id}`, item, { headers: this.httpHeaders });
  }

  delete(action: string, id: number): Observable<Generic> {
    return this.http.delete<Generic>(`${this.urlEndPoint + action}/${id}`, { headers: this.httpHeaders });
  }

  deleteIdString(action: string, id: string): Observable<Generic> {
    return this.http.delete<Generic>(`${this.urlEndPoint + action}/${id}`, { headers: this.httpHeaders });
  }
  deleteIdNumber(action: string, id: number): Observable<Generic> {
    return this.delete(action, id);
  }
}
