import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Deejay } from './deejay.model';
import { Genre } from '../shared/genre.model';
import { LikeService } from '../likes/like.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DeejayService {
  deejaysChanged = new Subject<Deejay[]>();
  deejayAdded = new Subject<Deejay>();
  deejayUpdated = new Subject<Deejay>();
  deejayDeleted = new Subject<string>();

  constructor(private likeService: LikeService, private http: Http) { }

  getDeejays(): Observable<Deejay[]> {
    const url = `${environment.apiUrl}/deejays`;
    return this.http.get(url, this.getRequestOptions())
      .map(r => r.json())
      .map((deejays: Deejay[]) => {
        return deejays.map(deejay => new Deejay(deejay._id, deejay.name, deejay.age, deejay.description, deejay.imagePath, deejay.genres));
      });
  }

  getDeejay(id: string): Observable<Deejay> {
    const url = `${environment.apiUrl}/deejays/${id}`;
    return this.http.get(url, this.getRequestOptions())
      .map(r => r.json())
      .map((deejay: Deejay) => {
        return new Deejay(deejay._id, deejay.name, deejay.age, deejay.description, deejay.imagePath, deejay.genres);
      });
  }

  addDeejay(deejay: Deejay): Observable<Deejay> {
    const url = `${environment.apiUrl}/deejays`;
    const data = JSON.stringify(deejay);
    return this.http.post(url, data, this.getRequestOptions())
      .map(r => r.json())
      .map((savedDeejay: Deejay) => {
        return new Deejay(savedDeejay._id, savedDeejay.name, savedDeejay.age, savedDeejay.description, savedDeejay.imagePath, savedDeejay.genres);
      });
  }

  updateDeejay(id: string, deejay: Deejay): Observable<Deejay> {
    const url = `${environment.apiUrl}/deejays/${id}`;
    const data = JSON.stringify(deejay);
    return this.http.put(url, data, this.getRequestOptions())
      .map(r => r.json())
      .map((savedDeejay: Deejay) => {
        return new Deejay(savedDeejay._id, savedDeejay.name, savedDeejay.age, savedDeejay.description, savedDeejay.imagePath, savedDeejay.genres);
      });
  }

  deleteDeejay(id: string) {
    const url = `${environment.apiUrl}/deejays/${id}`;
    return this.http.delete(url, this.getRequestOptions())
      .map(r => r.json());
  }

  private getRequestOptions(): RequestOptionsArgs {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return {
      headers: headers
    };
  }
}
