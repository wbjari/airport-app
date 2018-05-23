import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Security } from './security.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SecurityService {
  securityChanged = new Subject<Security[]>();
  securityAdded = new Subject<Security>();
  securityUpdated = new Subject<Security>();
  securityDeleted = new Subject<string>();

  constructor(private http: Http) { }

  getSecurities(): Observable<Security[]> {
    const url = `${environment.apiUrl}/security`;
    return this.http.get(url, this.getRequestOptions())
      .map(r => r.json())
      .map((security: Security[]) => {
        return security.map(security => new Security(security._id, security.name));
      });
  }

  getSecurity(id: string): Observable<Security> {
    const url = `${environment.apiUrl}/security/${id}`;
    return this.http.get(url, this.getRequestOptions())
      .map(r => r.json())
      .map((security: Security) => {
        return new Security(security._id, security.name);
      });
  }

  addSecurity(security: Security): Observable<Security> {
    const url = `${environment.apiUrl}/security`;
    const data = JSON.stringify(security);
    return this.http.post(url, data, this.getRequestOptions())
      .map(r => r.json())
      .map((savedSecurity: Security) => {
        return new Security(savedSecurity._id, savedSecurity.name);
      });
  }

  updateSecurity(id: string, security: Security): Observable<Security> {
    const url = `${environment.apiUrl}/security/${id}`;
    const data = JSON.stringify(security);
    return this.http.put(url, data, this.getRequestOptions())
      .map(r => r.json())
      .map((savedSecurity: Security) => {
        return new Security(savedSecurity._id, savedSecurity.name);
      });
  }

  deleteSecurity(id: string) {
    const url = `${environment.apiUrl}/security/${id}`;
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
