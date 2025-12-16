import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogueComponent } from '../catalogue/catalogue.component';
import { BestSellersComponent } from '../best-sellers/best-sellers.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CatalogueComponent, BestSellersComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor() { }
}
