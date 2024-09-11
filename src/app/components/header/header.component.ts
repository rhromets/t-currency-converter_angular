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
      var result = data.rates.UAH;
      this.usdToUah = result.toFixed(3);
    });

    this.currencyService.getRatesEUR().subscribe(data => {
      var result = data.rates.UAH;
      this.eurToUah = result.toFixed(3);
    });
  }
}
