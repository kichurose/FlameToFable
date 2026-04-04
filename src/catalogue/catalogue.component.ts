import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SearchComponent } from '../search/search.component';

interface CatalogueProduct {
  id: string;
  name: string;
  price?: string;
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
    'ocean': {
      id: 'ocean',
      name: 'Ocean Candle',
      image: './ocean.jpg'
    },
    'heartofroses': {
      id: 'heartofroses',
      name: 'Heart of Roses Candle',
      image: './heartofroses.jpg'
    },
    'magic': {
      id: 'magic',
      name: 'Magic Candle',
      image: './magic.jpg'
    },
    'rose-candle': {
      id: 'rose-candle',
      name: 'Rose Candle',
      image: './rose.jpg'
    },
    'rose-design-2': {
      id: 'rose-design-2',
      name: 'Rose Design 2',
      image: './rosedesign2.jpg'
    },
    'heart-candle': {
      id: 'heart-candle',
      name: 'Heart Candle',
      image: './heart.jpg'
    },
    'angel-wings': {
      id: 'angel-wings',
      name: 'Angel Wings Candle',
      image: './angelwings.jpg'
    },
    'watermelon': {
      id: 'watermelon',
      name: 'Watermelon Candle',
      image: './watermelon.jpg'
    },
    'cloud': {
      id: 'cloud',
      name: 'Cloud Candle',
      image: './cloud.jpg'
    },
    'berry-bliss': {
      id: 'berry-bliss',
      name: 'Berry Bliss Candle',
      image: './berry-bliss.jpg'
    },
    'latte-coffee': {
      id: 'latte-coffee',
      name: 'Latte Coffee Candle',
      image: './coffee.jpg'
    },
    'vanilla-chocolate': {
      id: 'vanilla-chocolate',
      name: 'Vanilla Chocolate Candle',
      image: './vanilla.jpg'
    },
    'christmastree2': {
      id: 'christmastree2',
      name: 'Christmas Tree (Pack of 2)',
      image: './christmastree2.jpg'
    },
    'baby-jesus': {
      id: 'baby-jesus',
      name: 'Baby Jesus Candle',
      image: './Baby-Jesus.jpg'
    },
    'christmas-candle': {
      id: 'christmas-candle',
      name: 'Christmas Candle',
      image: './christmas.jpg',
      
    },
    'christmas-candle-2': {
      id: 'christmas-candle-2',
      name: 'Christmas Candle 2',
      image: './christmas2.jpg',
      
    },
    'christmas-collection': {
      id: 'christmas-collection',
      name: 'Christmas Collection Pack of 3',
      image: './christmas-collection.jpg'
    },
    'reindeer': {
      id: 'reindeer',
      name: 'Reindeer Candle',
      image: './reindeer.jpg'
    },
    'reindeer-pack': {
      id: 'reindeer-pack',
      name: 'Reindeer Pack of 2',
      image: './reindeer-pack.jpg'
    },
    'stack-hearts': {
      id: 'stack-hearts',
      name: 'Stack Hearts Candle',
      image: './stack-hearts.jpg'
    },
    'car-candle': {
      id: 'car-candle',
      name: 'Car Candle',
      image: './Car.jpg'
    },
    'peony-bloom': {
      id: 'peony-bloom',
      name: 'Peony Bloom Candle',
      image: './peony.jpg'
    },
    'daisy-love': {
      id: 'daisy-love',
      name: 'Daisy Love Candle',
      image: './daisy.jpg'
    },
    'sunflower': {
      id: 'sunflower',
      name: 'Sunflower Candle',
      image: './daisy1.jpg'
    },
    'icedmacha': {
      id: 'icedmacha',
      name: 'Iced Matcha Candle',
      image: './icedmacha.jpg'
    }
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

  openModal(productId: string) {
    this.router.navigate(['/product', productId]);
  }

  enquireOnWhatsApp(product: CatalogueProduct, event: Event) {
    event.stopPropagation(); // Prevent card click
    
    const phoneNumber = '917994209092';
    const message = `Hi! I'm interested in the ${product.name}. Can you provide more details about availability and delivery?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  }
}
