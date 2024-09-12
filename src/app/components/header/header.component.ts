import { Component } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  usdToUah: number = 0;
  eurToUah: number = 0;
  error: string | null = null; 

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.loadRates();
  }

  loadRates(): void {
    this.currencyService.getRates('USD').subscribe(data => {
      if (data) {
        this.usdToUah = Number(data.rates.UAH.toFixed(3));
      } else {
        this.error = 'Failed to load USD rates.';
      }
    });

    this.currencyService.getRates('EUR').subscribe(data => {
      if (data) {
        this.eurToUah = Number(data.rates.UAH.toFixed(3));
      } else {
        this.error = 'Failed to load EUR rates.';
      }
    });
  }
}
