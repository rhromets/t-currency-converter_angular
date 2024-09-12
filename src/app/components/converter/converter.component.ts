import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { CURRENCY_LIST } from '../../currency-list';


@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [
    FormsModule,
    NgFor
  ],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.css'
})
export class ConverterComponent {

  amount1: number = 0;
  amount2: number = 0;
  currency1: string = 'USD';
  currency2: string = 'UAH';
  currencyList = CURRENCY_LIST;

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.currencyService.loadRates(this.currencyList.map(c => c.name));
  }

  convert(amount: number, fromCurrency: string, toCurrency: string): number {
    const rateFromToUSD = this.currencyService.rates[fromCurrency]?.['USD'];
    const rateToUSD = this.currencyService.rates[toCurrency]?.['USD'];
    if (!rateFromToUSD || !rateToUSD) return 0; 
    return (amount * rateFromToUSD) / rateToUSD;
  }

  // All currencies are converted relative to the USD
  convertFromInput(fromField: 'fromInput1' | 'fromInput2') {
    if (fromField == 'fromInput1') {
      this.amount2 = Number(this.convert(this.amount1, this.currency1, this.currency2).toFixed(2));
    } else if (fromField == 'fromInput2') {
      this.amount1 = Number(this.convert(this.amount2, this.currency2, this.currency1).toFixed(2));
    }
  }

  moderateField(field: keyof ConverterComponent, action: 'clear' | 'restore'): void {
    if (action == 'clear' && this[field] == 0) {
      this[field] = null as never;
    } else if (action == 'restore' && (this[field] == null || this[field] == '')) {
      this[field] = 0 as never;
    }
  }

}
