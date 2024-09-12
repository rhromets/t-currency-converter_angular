import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, of, catchError, map } from 'rxjs';
import { CURRENCY_LIST } from '../currency-list';

interface Rates {
  [key: string]: number;
}

interface CurrencyResponse {
  rates: Rates;
}

@Injectable({
  providedIn: 'root'
})

export class CurrencyService {
  private apiUrl = 'https://open.er-api.com/v6/latest/';
  private cachedRates: { [key: string]: CurrencyResponse } = {};
  currencyList = CURRENCY_LIST;
  error: string | null = null;
  rates: { [key: string]: { [key: string]: number } | null } = {};

  constructor(private http: HttpClient) { }

  private getRates(currency: string): Observable<CurrencyResponse | null> {
    // If data has already been downloaded, return the saved data.
    if (this.cachedRates[currency]) {
      return of(this.cachedRates[currency]);
    }
    // If not cached, request the rates from API
    return this.http.get<CurrencyResponse>(`${this.apiUrl}${currency}`).pipe(
    // Save the data in cache
      tap(data => this.cachedRates[currency] = data),
      catchError(error => {
        console.error(`Error fetching rates for ${currency}:`, error);
        return of(null);
      })
    );
  }

  loadRates(currencies: string[], callback?: (currency: string, rate: number | null) => void): void {
    currencies.forEach(currency => {
      this.getRates(currency).subscribe(data => {
        if (data) {
          const rate: number = Number(data.rates['UAH'].toFixed(3));
          this.rates[currency] = data.rates;

          if (callback) {
            callback(currency, rate);
          }
        } else {
          this.rates[currency] = null;
          this.error = `Failed to load ${currency} rates.`;
          if (callback) {
            callback(currency, null);
          }
        }
      });
    });
  }

}
