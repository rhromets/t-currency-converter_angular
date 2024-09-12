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

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.currencyService.loadRates(['USD', 'EUR'], (currency: string, rate: number | null) => {
      if (currency == 'USD') {
        this.usdToUah = rate || 0;
      } else if (currency == 'EUR') {
        this.eurToUah = rate || 0;
      }
    });
  }
}
