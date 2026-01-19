import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SearchComponent } from '../search/search.component';

interface CatalogueProduct {
  id: string;
  name: string;
  price: string;
  image: string;
  images?: string[]; // For multiple images indicator
}

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [CommonModule, SearchComponent],
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent {
  searchTerm: string = '';

  constructor(private router: Router) {}

  products: { [key: string]: CatalogueProduct } = {
    'rose-candle': {
      id: 'rose-candle',
      name: 'Rose Candle',
      price: '₹350',
      image: './rose.jpg'
    },
    'rose-design-2': {
      id: 'rose-design-2',
      name: 'Rose Design 2',
      price: '₹200',
      image: './rosedesign2.jpg'
    },
    'heart-candle': {
      id: 'heart-candle',
      name: 'Heart Candle',
      price: '₹200',
      image: './heart.jpg'
    },
    'angel-wings': {
      id: 'angel-wings',
      name: 'Angel Wings Candle',
      price: '₹150',
      image: './angelwings.jpg'
    },
    'watermelon': {
      id: 'watermelon',
      name: 'Watermelon Candle',
      price: '₹200',
      image: './watermelon.jpg'
    },
    'cloud': {
      id: 'cloud',
      name: 'Cloud Candle',
      price: '₹200',
      image: './cloud.jpg'
    },
    'berry-bliss': {
      id: 'berry-bliss',
      name: 'Berry Bliss Candle',
      price: '₹350',
      image: './berry-bliss.jpg'
    },
    'latte-coffee': {
      id: 'latte-coffee',
      name: 'Latte Coffee Candle',
      price: '₹350',
      image: './coffee.jpg'
    },
    'vanilla-chocolate': {
      id: 'vanilla-chocolate',
      name: 'Vanilla Chocolate Candle',
      price: '₹350',
      image: './vanilla.jpg'
    },
    'christmastree2': {
      id: 'christmastree2',
      name: 'Christmas Tree (Pack of 2)',
      price: '₹250',
      image: './christmastree2.jpg'
    },
    'baby-jesus': {
      id: 'baby-jesus',
      name: 'Baby Jesus Candle',
      price: '₹200',
      image: './Baby-Jesus.jpg'
    },
    'christmas-candle': {
      id: 'christmas-candle',
      name: 'Christmas Candle',
      price: '₹150',
      image: './christmas.jpg',
      
    },
    'christmas-candle-2': {
      id: 'christmas-candle-2',
      name: 'Christmas Candle 2',
      price: '₹150',
      image: './christmas2.jpg',
      
    },
    'christmas-collection': {
      id: 'christmas-collection',
      name: 'Christmas Collection Pack of 3',
      price: '₹150',
      image: './christmas-collection.jpg'
    },
    'reindeer': {
      id: 'reindeer',
      name: 'Reindeer Candle',
      price: '₹50',
      image: './reindeer.jpg'
    },
    'reindeer-pack': {
      id: 'reindeer-pack',
      name: 'Reindeer Pack of 2',
      price: '₹100',
      image: './reindeer-pack.jpg'
    },
    'stack-hearts': {
      id: 'stack-hearts',
      name: 'Stack Hearts Candle',
      price: '₹100',
      image: './stack-hearts.jpg'
    },
    'car-candle': {
      id: 'car-candle',
      name: 'Car Candle',
      price: '₹50',
      image: './Car.jpg'
    },
    'peony-bloom': {
      id: 'peony-bloom',
      name: 'Peony Bloom Candle',
      price: '₹199',
      image: './peony.jpg'
    },
    'daisy-love': {
      id: 'daisy-love',
      name: 'Daisy Love Candle',
      price: '₹50',
      image: './daisy.jpg'
    },
    'sunflower': {
      id: 'sunflower',
      name: 'Sunflower Candle',
      price: '₹50',
      image: './daisy1.jpg'
    }
  };

  // Single source of truth for original prices
  private readonly originalPrices: { [key: string]: number } = {
    'christmastree2': 400,
    'christmas-candle': 200,
    'christmas-candle-2': 200,
    'stack-hearts': 200,
    'peony-bloom': 299,
    'daisy-love': 50,
    'sunflower': 50,
    'berry-bliss': 500,
    'latte-coffee': 500,
    'vanilla-chocolate': 500,
    'raspberry-mocha': 500,
    'watermelon': 200,
    'cloud': 200,
    'baby-jesus': 250,
    'reindeer': 50,
    'reindeer-pack': 100,
    'car-candle': 50,
    'christmas-collection': 150,
    'rose-candle': 150,
    'rose-design-2': 180,
    'heart-candle': 120,
    'angel-wings': 250,
  };

  // Helper methods for generic template
  getProductsArray(): CatalogueProduct[] {
    const allProducts = Object.values(this.products);
    
    if (!this.searchTerm.trim()) {
      return allProducts;
    }
    
    return allProducts.filter(product => 
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onSearchChanged(searchTerm: string) {
    this.searchTerm = searchTerm;
  }

  isSaleItem(product: CatalogueProduct): boolean {
    const priceStr = product.price.replace('₹', '');
    const currentPrice = parseInt(priceStr);
    const originalPrice = this.originalPrices[product.id] || currentPrice;
    return originalPrice > currentPrice;
  }

  hasDiscountPricing(product: CatalogueProduct): boolean {
    const priceStr = product.price.replace('₹', '');
    const currentPrice = parseInt(priceStr);
    const originalPrice = this.originalPrices[product.id] || currentPrice;
    return originalPrice > currentPrice;
  }

  isChristmasCandle(product: CatalogueProduct): boolean {
    const christmasKeywords = ['christmas', 'tree', 'holiday', 'festive', 'jesus', 'reindeer'];
    return christmasKeywords.some(keyword => 
      product.name.toLowerCase().includes(keyword) || 
      product.id.toLowerCase().includes(keyword)
    );
  }

  hasMultipleImages(product: CatalogueProduct): boolean {
    return product.images ? product.images.length > 1 : false;
  }

  calculateDiscount(product: CatalogueProduct): string {
    const priceStr = product.price.replace('₹', '');
    const currentPrice = parseInt(priceStr);
    const originalPrice = this.originalPrices[product.id] || currentPrice;
    const discountPercent = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
    return `${discountPercent}% OFF`;
  }

  getOriginalPrice(product: CatalogueProduct): string {
    const originalPrice = this.originalPrices[product.id];
    return originalPrice ? `₹${originalPrice}` : product.price;
  }

  openModal(productId: string) {
    this.router.navigate(['/product', productId]);
  }

  enquireOnWhatsApp(product: CatalogueProduct, event: Event) {
    event.stopPropagation(); // Prevent card click
    
    const phoneNumber = '7994209092';
    const message = `Hi! I'm interested in the ${product.name} (${product.price}). Can you provide more details about availability and delivery?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  }
}
