import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Flight } from './flight.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FlightService {
  flightChanged = new Subject<Flight[]>();
  flightAdded = new Subject<Flight>();
  flightUpdated = new Subject<Flight>();
  flightDeleted = new Subject<string>();

  constructor(private http: Http) { }

  getFlights(): Observable<Flight[]> {
    const url = `${environment.apiUrl}/flight`;
    return this.http.get(url, this.getRequestOptions())
      .map(r => r.json())
      .map((flight: Flight[]) => {
        return flight.map(flight => new Flight(flight._id, flight.name));
      });
  }

  getFlight(id: string): Observable<Flight> {
    const url = `${environment.apiUrl}/flight/${id}`;
    return this.http.get(url, this.getRequestOptions())
      .map(r => r.json())
      .map((flight: Flight) => {
        return new Flight(flight._id, flight.name);
      });
  }

  addFlight(flight: Flight): Observable<Flight> {
    const url = `${environment.apiUrl}/flight`;
    const data = JSON.stringify(flight);
    return this.http.post(url, data, this.getRequestOptions())
      .map(r => r.json())
      .map((savedFlight: Flight) => {
        return new Flight(savedFlight._id, savedFlight.name);
      });
  }

  updateFlight(id: string, flight: Flight): Observable<Flight> {
    const url = `${environment.apiUrl}/flight/${id}`;
    const data = JSON.stringify(flight);
    return this.http.put(url, data, this.getRequestOptions())
      .map(r => r.json())
      .map((savedFlight: Flight) => {
        return new Flight(savedFlight._id, savedFlight.name);
      });
  }

  deleteFlight(id: string) {
    const url = `${environment.apiUrl}/flight/${id}`;
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