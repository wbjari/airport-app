import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Rental } from './rental.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RentalService {
  rentalChanged = new Subject<Rental[]>();
  rentalAdded = new Subject<Rental>();
  rentalUpdated = new Subject<Rental>();
  rentalDeleted = new Subject<string>();

  constructor(private http: Http) { }

  getRentals(): Observable<Rental[]> {
    const url = `${environment.apiUrl}/rental`;
    return this.http.get(url, this.getRequestOptions())
      .map(r => r.json())
      .map((rental: Rental[]) => {
        return rental.map(rental => new Rental(rental._id, rental.name));
      });
  }

  getRental(id: string): Observable<Rental> {
    const url = `${environment.apiUrl}/rental/${id}`;
    return this.http.get(url, this.getRequestOptions())
      .map(r => r.json())
      .map((rental: Rental) => {
        return new Rental(rental._id, rental.name);
      });
  }

  addRental(rental: Rental): Observable<Rental> {
    const url = `${environment.apiUrl}/rental`;
    const data = JSON.stringify(rental);
    return this.http.post(url, data, this.getRequestOptions())
      .map(r => r.json())
      .map((savedRental: Rental) => {
        return new Rental(savedRental._id, savedRental.name);
      });
  }

  updateRental(id: string, rental: Rental): Observable<Rental> {
    const url = `${environment.apiUrl}/rental/${id}`;
    const data = JSON.stringify(rental);
    return this.http.put(url, data, this.getRequestOptions())
      .map(r => r.json())
      .map((savedRental: Rental) => {
        return new Rental(savedRental._id, savedRental.name);
      });
  }

  deleteRental(id: string) {
    const url = `${environment.apiUrl}/rental/${id}`;
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
