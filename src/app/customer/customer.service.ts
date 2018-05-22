import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Customer } from './customer.model';
import { environment } from '../../environments/environment';
import { Http, Headers, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CustomerService {
  customerChanged = new Subject<Customer[]>();
  customerAdded = new Subject<Customer>();
  customerUpdated = new Subject<Customer>();
  customerDeleted = new Subject<string>();

  constructor(private http: Http) { }

  getCustomers(): Observable<Customer[]> {
    const url = `${environment.apiUrl}/customer`;
    return this.http.get(url, this.getRequestOptions())
      .map(r => r.json())
      .map((customer: Customer[]) => {
        return customer.map(customer => new Customer(customer._id, customer.name));
      });
  }

  getCustomer(id: string): Observable<Customer> {
    const url = `${environment.apiUrl}/customer/${id}`;
    return this.http.get(url, this.getRequestOptions())
      .map(r => r.json())
      .map((customer: Customer) => {
        return new Customer(customer._id, customer.name);
      });
  }

  addCustomer(customer: Customer): Observable<Customer> {
    const url = `${environment.apiUrl}/customer`;
    const data = JSON.stringify(customer);
    return this.http.post(url, data, this.getRequestOptions())
      .map(r => r.json())
      .map((savedCustomer: Customer) => {
        return new Customer(savedCustomer._id, savedCustomer.name);
      });
  }

  updateCustomer(id: string, customer: Customer): Observable<Customer> {
    const url = `${environment.apiUrl}/customer/${id}`;
    const data = JSON.stringify(customer);
    return this.http.put(url, data, this.getRequestOptions())
      .map(r => r.json())
      .map((savedCustomer: Customer) => {
        return new Customer(savedCustomer._id, savedCustomer.name);
      });
  }

  deleteCustomer(id: string) {
    const url = `${environment.apiUrl}/customer/${id}`;
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
