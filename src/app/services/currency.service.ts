import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, of, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CurrencyService {
  private apiUrl = 'https://open.er-api.com/v6/latest/';
  private cachedRates: { [key: string]: any } = {};

  constructor(private http: HttpClient) { }

  getRates(currency: string): Observable<any> {
    // If data has already been downloaded, return the saved data.
    if (this.cachedRates[currency]) {
      return of(this.cachedRates[currency]);
    }

    // If data is not loaded, make a request and cache the data
    return this.http.get<any>(`${this.apiUrl}${currency}`).pipe(
      // Save tge data in cache
      tap(data => this.cachedRates[currency] = data),
      catchError(error => {
        console.error('Error fetching rates:', error);
        return of(null);
      })
    );
  }
}
