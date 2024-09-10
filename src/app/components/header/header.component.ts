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
    this.currencyService.getRatesUSD().subscribe(data => {
      this.usdToUah = data.rates.UAH;
    });

    this.currencyService.getRatesEUR().subscribe(data => {
      this.eurToUah = data.rates.UAH;
    });
  }
}
