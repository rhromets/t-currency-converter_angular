import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CurrencyService {
  private apiUrlUSD = 'https://open.er-api.com/v6/latest/USD';
  private apiUrlEUR = 'https://open.er-api.com/v6/latest/EUR';
  private apiUrlUAH = 'https://open.er-api.com/v6/latest/UAH';

  constructor(private http: HttpClient) { }

  getRatesUSD(): Observable<any> {
    return this.http.get<any>(this.apiUrlUSD);
  }

  getRatesEUR(): Observable<any> {
    return this.http.get<any>(this.apiUrlEUR);
  }

  getRatesUAH(): Observable<any> {
    return this.http.get<any>(this.apiUrlUAH);
  }
}
