import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class FetchAllUsersService {

  baseUrl = 'https://127.0.0.1:8080';
  users: User[];

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get(`${this.baseUrl}/api/check.php`).pipe(
      map((res) => {
// tslint:disable-next-line: no-string-literal
        this.users = res['data'];
        return this.users;
    }),
    catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }

}

