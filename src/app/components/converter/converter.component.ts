import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.css'
})
export class ConverterComponent {

  amount1: number = 0;
  amount2: number = 0;
  currency1: string = 'USD';
  currency2: string = 'UAH';

  rates: any = {};

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.loadRates();
  }

  loadRates(): void {
    this.currencyService.getRatesUSD().subscribe(data => {
      this.rates['USD'] = data.rates;
    });
    this.currencyService.getRatesEUR().subscribe(data => {
      this.rates['EUR'] = data.rates;
    });
    this.currencyService.getRatesUAH().subscribe(data => {
      this.rates['UAH'] = data.rates;
    });
  }

  // All currencies are converted relative to the USD
  convertFromInput1(): void {
    const rate1ToUSD: number = this.rates[this.currency1]['USD'];
    const rate2ToUSD: number = this.rates[this.currency2]['USD'];
    var result = (this.amount1 * rate1ToUSD) / rate2ToUSD;
    this.amount2 = Number(result.toFixed(2));
  }

  // All currencies are converted relative to the USD
  convertFromInput2(): void {
    const rate1ToUSD: number = this.rates[this.currency1]['USD'];
    const rate2ToUSD: number = this.rates[this.currency2]['USD'];
    var result = (this.amount2 * rate2ToUSD) / rate1ToUSD;
    this.amount1 = Number(result.toFixed(2));
  }

  clearIfZero(field: keyof ConverterComponent): void {
    if (this[field] === 0) {
      this[field] = null as never;
    }
  }

  restoreIfEmpty(field: keyof ConverterComponent): void {
    if (this[field] === null || this[field] === '') {
      this[field] = 0 as never;
    }
  }

}
