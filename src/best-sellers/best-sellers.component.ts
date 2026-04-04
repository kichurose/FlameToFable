import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductDetails } from '../shared/interfaces';

@Component({
  selector: 'app-best-sellers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './best-sellers.component.html',
  styleUrls: ['./best-sellers.component.scss']
})
export class BestSellersComponent {
  selectedProduct: ProductDetails | null = null;

  constructor(private router: Router) {}

  // Best selling products data
  bestSellers: ProductDetails[] = [  
    {
      id: 'latte-coffee',
      name: 'Latte Coffee Candle',
      image: './coffee.jpg'
    },
    {
      id: 'berry-bliss',
      name: 'Berry Bliss Candle',
      image: './berry-bliss.jpg'
    },
    {
      id: 'vanilla-chocolate',
      name: 'Vanilla Chocolate Candle',
      image: './vanilla.jpg'
    },
    {
      id: 'rose-candle',
      name: 'Rose Candle',
      image: './rose.jpg'
    },
    {
      id: 'rose-design-2',
      name: 'Rose Design 2',
      image: './rosedesign2.jpg'
    },
    {
      id: 'heart-candle',
      name: 'Heart Candle',
      image: './heart.jpg'
    },
    {
      id: 'angel-wings',
      name: 'Angel Wings Candle',
      image: './angelwings.jpg'
    }
  ];

  onCandleClick(product: ProductDetails) {
    // Navigate to product detail page
    this.router.navigate(['/product', product.id]);
  }

  // Keep for any future use
  onCandleHover(product: ProductDetails) {
    this.selectedProduct = this.selectedProduct?.id === product.id ? null : product;
  }

  closeEnlargedView() {
    this.selectedProduct = null;
  }
}