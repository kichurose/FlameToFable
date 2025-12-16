import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  // Best selling products data
  bestSellers: ProductDetails[] = [
    {
      id: 'christmas-candle',
      name: 'Christmas Candle',
      price: '₹150',
      image: './christmas.jpg'
    },
    {
      id: 'baby-jesus',
      name: 'Baby Jesus Candle',
      price: '₹200',
      image: './Baby-Jesus.jpg'
    },
    {
      id: 'latte-coffee',
      name: 'Latte Coffee Candle',
      price: '₹350',
      image: './coffee.jpg'
    },
    {
      id: 'berry-bliss',
      name: 'Berry Bliss Candle',
      price: '₹350',
      image: './berry-bliss.jpg'
    },
    {
      id: 'vanilla-chocolate',
      name: 'Vanilla Chocolate Candle',
      price: '₹350',
      image: './vanilla.jpg'
    }
  ];

  onCandleClick(product: ProductDetails) {
    this.selectedProduct = this.selectedProduct?.id === product.id ? null : product;
  }

  closeEnlargedView() {
    this.selectedProduct = null;
  }
}