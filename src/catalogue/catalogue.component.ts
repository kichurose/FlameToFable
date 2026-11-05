import { candleCategories, CandleCategory, matchesCandleCategory } from '../shared/candle-categories';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
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
  imports: [CommonModule, SearchComponent, RouterLink],
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent {
  searchTerm: string = '';
  readonly categories = candleCategories;
  category: CandleCategory = 'All candles';

  constructor(private router: Router) {}

  products: { [key: string]: CatalogueProduct } = {
    'mini-bouquet': {
      "id": "mini-bouquet",
      "name": "Mini Bouquet Candle",
      "image": "/optimized/mini bouquet.jpg.webp",
      "images": [
            "/optimized/mini bouquet.jpg.webp",
            "/optimized/mini bouquets.jpg.webp"
      ]
},
    'ocean': {
      id: 'ocean',
      name: 'Ocean Candle',
      image: './optimized/ocean.jpg.webp'
    },
    'magic': {
      id: 'magic',
      name: 'Magic Candle',
      image: './optimized/magic.jpg.webp'
    },
    'sunflower-garden': {
      id: 'sunflower-garden',
      name: 'Sunflower Garden Candle',
      image: './optimized/Sunflower Garden Candle.jpg.webp',
      images: ['./optimized/Sunflower Garden Candle.jpg.webp', './optimized/Sunflower Gardern Candle.jpg.webp']
    },
    'rose-candle': {
      id: 'rose-candle',
      name: 'Rose Candle',
      image: './optimized/rose.jpg.webp'
    },
    'rose-design-2': {
      id: 'rose-design-2',
      name: 'Rose Design 2',
      image: './optimized/rosedesign2.jpg.webp'
    },
    'trio-jar': {
      id: 'trio-jar',
      name: 'Trio Jar Candle',
      image: './optimized/TrioJar.jpg.webp'
    },
    'tulip-candle': {
      id: 'tulip-candle',
      name: 'Tulip Candle',
      image: './optimized/TulipCandle.jpg.webp'
    },
    'heart-candle': {
      id: 'heart-candle',
      name: 'Heart Candle',
      image: './optimized/heart.jpg.webp'
    },
    'angel-wings': {
      id: 'angel-wings',
      name: 'Angel Wings Candle',
      image: './optimized/angelwings.jpg.webp'
    },
    'watermelon': {
      id: 'watermelon',
      name: 'Watermelon Candle',
      image: './optimized/watermelon.jpg.webp'
    },
    'cloud': {
      id: 'cloud',
      name: 'Cloud Candle',
      image: './optimized/cloud.jpg.webp'
    },
    'berry-bliss': {
      id: 'berry-bliss',
      name: 'Berry Bliss Candle',
      image: './optimized/berry-bliss.jpg.webp'
    },
    'latte-coffee': {
      id: 'latte-coffee',
      name: 'Latte Coffee Candle',
      image: './optimized/coffee.jpg.webp'
    },
    'vanilla-chocolate': {
      id: 'vanilla-chocolate',
      name: 'Vanilla Chocolate Candle',
      image: './optimized/vanilla.jpg.webp'
    },
    'christmastree2': {
      id: 'christmastree2',
      name: 'Christmas Tree (Pack of 2)',
      image: './optimized/christmastree2.jpg.webp'
    },
    'baby-jesus': {
      id: 'baby-jesus',
      name: 'Baby Jesus Candle',
      image: './optimized/Baby-Jesus.jpg.webp'
    },
    'christmas-candle': {
      id: 'christmas-candle',
      name: 'Christmas Candle',
      image: './optimized/christmas.jpg.webp',
      
    },
    'christmas-candle-2': {
      id: 'christmas-candle-2',
      name: 'Christmas Candle 2',
      image: './optimized/christmas2.jpg.webp',
      
    },
    'christmas-collection': {
      id: 'christmas-collection',
      name: 'Christmas Collection Pack of 3',
      image: './optimized/christmas-collection.jpg.webp'
    },
    'reindeer': {
      id: 'reindeer',
      name: 'Reindeer Candle',
      image: './optimized/Reindeer.jpg.webp'
    },
    'reindeer-pack': {
      id: 'reindeer-pack',
      name: 'Reindeer Pack of 2',
      image: './optimized/reindeer-pack.jpg.webp'
    },
    'stack-hearts': {
      id: 'stack-hearts',
      name: 'Stack Hearts Candle',
      image: './optimized/stack-hearts.jpg.webp'
    },
    'car-candle': {
      id: 'car-candle',
      name: 'Car Candle',
      image: './optimized/Car.jpg.webp'
    },
    'peony-bloom': {
      id: 'peony-bloom',
      name: 'Peony Bloom Candle',
      image: './optimized/peony.jpg.webp'
    },
    'daisy-love': {
      id: 'daisy-love',
      name: 'Daisy Love Candle',
      image: './optimized/daisy.jpg.webp'
    },
    'sunflower': {
      id: 'sunflower',
      name: 'Sunflower Candle',
      image: './optimized/daisy1.jpg.webp'
    },
    'icedmacha': {
      id: 'icedmacha',
      name: 'Iced Matcha Candle',
      image: './optimized/icedmacha.jpg.webp'
    },
    'heartofroses': {
      id: 'heartofroses',
      name: 'Heart of Roses Candle',
      image: './optimized/heartofroses.jpg.webp'
    },
    'butterfly': {
      "id": "butterfly",
      "name": "Butterfly Candles",
      "image": "/optimized/butterfly.jpg.webp"
}
  };

  // Helper methods for generic template
  getProductsArray(): CatalogueProduct[] {
    return Object.values(this.products).filter(product => matchesCandleCategory(product.id, this.category) && product.name.toLowerCase().includes(this.searchTerm.trim().toLowerCase()));
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
