import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductModalComponent, ProductDetails } from '../product-modal/product-modal.component';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [CommonModule, ProductModalComponent, SearchComponent],
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent {
  isModalOpen = false;
  selectedProduct: ProductDetails | null = null;
  searchTerm: string = '';

  // Product data dictionary
  products: { [key: string]: ProductDetails } = {
    'christmas-candle': {
      id: 'christmas-candle',
      name: 'Christmas Candle',
      price: '₹99',
      image: './christmas.jpg',
      images: ['./christmas.jpg', './christmastree.jpg', './christmas1.1.jpg'],
      description: 'Festive blend of cinnamon, pine, and warm spices to celebrate the season.',
      specifications: {
        dimensions: '3.5" × 4.2"',
        weight: '12 oz',
        wickType: 'Cotton wick',
        waxType: 'Soy blend',
        fragrance: 'Vanilla'
      },
      careInstructions: 'Trim wick to 1/4" before each use. Allow wax pool to reach edges on first burn for even melting. Burn for maximum 4 hours at a time. Keep away from drafts and flammable objects.',
      socialLinks: {
        youtube: 'https://youtube.com/shorts/ZzD0Fl2aZjQ?si=BYWF7-gmTQ3WPvBY',
        instagram: 'https://www.instagram.com/flametofable/reel/DQrACsuD0Cq/'
      }
    },
    'christmas-candle-2': {
      id: 'christmas-candle-2',
      name: 'Christmas Candle 2',
      price: '₹99',
      image: './christmas2.jpg',
      images: ['./christmas2.jpg', './christmas2.1.jpg'],
      description: 'Festive holiday candle in a unique decorative shape with warm spices and pine.',
      specifications: {
        dimensions: '4.0" × 5.0"',
        weight: '15 oz',
        wickType: 'Cotton wick',
        waxType: 'Premium soy blend',
        fragrance: 'Pine & Warm Spices'
      },
      careInstructions: 'Trim wick to 1/4" before each use. Special shape requires careful burning. Maximum 4 hours at a time.',
      socialLinks: {
        youtube: 'https://youtube.com/shorts/ZzD0Fl2aZjQ?si=BYWF7-gmTQ3WPvBY',
        instagram: 'https://www.instagram.com/flametofable'
      }
    },
    'berry-bliss': {
      id: 'berry-bliss',
      name: 'Berry Bliss',
      price: '₹299',
      image: './raspberry.jpg',
      description: 'Sweet berry medley with hints of vanilla and fresh florals.',
      specifications: {
        dimensions: '3.2" × 4.0"',
        weight: '10 oz',
        wickType: 'Cotton wick',
        waxType: 'Natural soy',
        fragrance: 'Mixed Berries & Vanilla'
      },
      careInstructions: 'Trim wick to 1/4" before lighting. Allow wax pool to reach edges on first burn. Never leave unattended.',
      socialLinks: {
        youtube: 'https://www.youtube.com/shorts/kFKx4aVFvyY',
        instagram: 'https://www.instagram.com/flametofable'
      }
    },
    'latte-coffee': {
      id: 'latte-coffee',
      name: 'Latte Coffee Candle',
      price: '₹299',
      image: './coffee.jpg',
      description: 'Rich coffee aroma with creamy milk and a hint of caramel sweetness',
      specifications: {
        dimensions: '3.8" × 4.5"',
        weight: '14 oz',
        wickType: 'Cotton wick',
        waxType: 'Premium soy wax',
        fragrance: 'Coffee & Caramel'
      },
      careInstructions: 'Trim wick to 1/4" before each use. Burn for maximum 4 hours at a time. Keep away from children and pets.',
      socialLinks: {
        youtube: 'https://www.youtube.com/shorts/3Rdw5xenhyY',
        instagram: 'https://www.instagram.com/flametofable'
      }
    },
     'raspberry-mocha': {
      id: 'raspberry-mocha',
      name: 'Raspberry Mocha Candle',
      price: '₹299',
      image: './raspberry2.jpg',
      description: 'Rich mocha coffee blend with sweet raspberry notes for a luxurious experience',
      specifications: {
        dimensions: '3.8" × 4.5"',
        weight: '14 oz',
        wickType: 'Cotton wick',
        waxType: 'Premium soy wax',
        fragrance: 'Raspberry & Mocha Coffee'
      },
      careInstructions: 'Luxurious scent ideal for cozy evenings. Burn for maximum 4 hours. Allow full wax pool on first burn.',
      socialLinks: {
        youtube: 'https://www.youtube.com/shorts/kFKx4aVFvyY',
        instagram: 'https://www.instagram.com/flametofable'
      }
    },
   
    'sunflower': {
      id: 'sunflower',
      name: 'Sunflower Candle',
      price: '₹25',
      image: './IMG20251103093957.jpg',
      description: 'Bright and cheerful fragrance with warm sunflower and honey tones',
      specifications: {
        dimensions: '2.0" × 2.5"',
        weight: '3 oz',
        wickType: 'Cotton wick',
        waxType: 'Soy blend',
        fragrance: 'Sunflower & Honey'
      },
      careInstructions: 'Perfect for tea light use. Burn for maximum 1-2 hours. Never leave unattended.',
      socialLinks: {
        youtube: 'https://www.youtube.com/@FlameToFable/shorts',
        instagram: 'https://www.instagram.com/flametofable'
      }
    },
    'peony-bloom': {
      id: 'peony-bloom',
      name: 'Peony Bloom',
      price: '₹150',
      image: './peony.jpg',
      description: 'Elegant floral scent with soft peony petals and morning dew',
      specifications: {
        dimensions: '3.0" × 3.5"',
        weight: '8 oz',
        wickType: 'Cotton wick',
        waxType: 'Premium soy wax',
        fragrance: 'Peony & Morning Dew'
      },
      careInstructions: 'Perfect for living room or office. Trim wick regularly. Burn for maximum 3 hours.',
      socialLinks: {
        youtube: 'https://www.youtube.com/shorts/JxkEyzbNAME',
        instagram: 'https://www.instagram.com/flametofable'
      }
    },
    'daisy-love': {
      id: 'daisy-love',
      name: 'Daisy Love',
      price: '₹25',
      image: './daisy.jpg',
      images: ['./daisy.jpg', './daisy1.jpg'],
      description: 'Sweet and delicate fragrance with fresh daisy and green meadow notes',
      specifications: {
        dimensions: '2.0" × 2.5"',
        weight: '3 oz',
        wickType: 'Cotton wick',
        waxType: 'Soy blend',
        fragrance: 'Fresh Daisy & Green Meadow'
      },
      careInstructions: 'Great for small spaces. Burn for maximum 1-2 hours. Keep wick trimmed to 1/4".',
      socialLinks: {
        youtube: 'https://www.youtube.com/shorts/Fb-h9MMKOGQ',
        instagram: 'https://www.instagram.com/flametofable'
      }
    },
    'vanilla-chocolate': {
      id: 'vanilla-chocolate',
      name: 'Vanilla Chocolate Loaded Candle',
      price: '₹299',
      image: './vanilla.jpg',
      images: ['./vanilla.jpg'],
      description: 'Decadent blend of rich vanilla and creamy chocolate for ultimate indulgence',
      specifications: {
        dimensions: '3.8" × 4.5"',
        weight: '14 oz',
        wickType: 'Cotton wick',
        waxType: 'Premium soy wax',
        fragrance: 'Vanilla & Dark Chocolate'
      },
      careInstructions: 'Rich fragrance perfect for evening relaxation. Burn for maximum 4 hours. Keep away from heat sources.',
      socialLinks: {
        youtube: 'https://www.youtube.com/shorts/HyNhNQuhblo',
        instagram: 'https://www.instagram.com/flametofable'
      }
    },
   
    'stack-hearts': {
      id: 'stack-hearts',
      name: 'Stack of Hearts',
      price: '₹99',
      image: './stackheart.jpg',
      images: ['./stackheart.jpg', './heart.jpg'],
      description: 'Romantic fragrance with rose petals and sweet vanilla for special moments',
      specifications: {
        dimensions: '2.8" × 3.2"',
        weight: '7 oz',
        wickType: 'Cotton wick',
        waxType: 'Natural soy',
        fragrance: 'Rose Petals & Vanilla'
      },
      careInstructions: 'Perfect for romantic occasions. Burn for maximum 3 hours. Keep away from drafts.',
      socialLinks: {
        youtube: 'https://www.youtube.com/shorts/nFS8N-cmjcM',
        instagram: 'https://www.instagram.com/flametofable'
      }
    },
     'watermelon': {
      id: 'watermelon',
      name: 'Watermelon Candle',
      price: '₹150',
      image: './watermelon.jpg',
      description: 'Fresh and juicy summer fragrance with crisp watermelon notes (120ml)',
      specifications: {
        dimensions: '2.5" × 3.0"',
        weight: '6 oz',
        wickType: 'Cotton wick',
        waxType: 'Natural soy',
        fragrance: 'Fresh Watermelon'
      },
      careInstructions: 'Perfect for small spaces. Burn for maximum 2-3 hours at a time. Ensure wick is centered.',
      socialLinks: {
        youtube: 'https://www.youtube.com/shorts/kdJb4vdchkM',
        instagram: 'https://www.instagram.com/flametofable'
      }
    },
    'cloud': {
      id: 'cloud',
      name: 'Cloud Candle',
      price: '₹150',
      image: './cloud.jpg',
      description: 'Light and airy scent with soft cotton and clean linen notes (120ml)',
      specifications: {
        dimensions: '2.5" × 3.0"',
        weight: '6 oz',
        wickType: 'Cotton wick',
        waxType: 'Natural soy',
        fragrance: 'Cotton & Clean Linen'
      },
      careInstructions: 'Ideal for bedroom or bathroom. Burn for maximum 2-3 hours. Store in cool, dry place.',
      socialLinks: {
        youtube: 'https://www.youtube.com/shorts/-X35yDQKrT4',
        instagram: 'https://www.instagram.com/flametofable'
      }
    },
    
  };

  // Single source of truth for original prices
  private readonly originalPrices: { [key: string]: number } = {
    'christmas-candle': 199,
    'christmas-candle-2': 199,
    'stack-hearts': 199,
    'peony-bloom': 299,
    'daisy-love': 50,
    'sunflower': 50,
    'berry-bliss': 499,
    'latte-coffee': 499,
    'vanilla-chocolate': 499,
    'raspberry-mocha': 499,
    'watermelon': 199,
    'cloud': 199,   
  };

  // Helper methods for generic template
  getProductsArray(): ProductDetails[] {
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

  isSaleItem(product: ProductDetails): boolean {
    const priceStr = product.price.replace('₹', '');
    const currentPrice = parseInt(priceStr);
    const originalPrice = this.originalPrices[product.id] || currentPrice;
    return originalPrice > currentPrice;
  }

  hasDiscountPricing(product: ProductDetails): boolean {
    const priceStr = product.price.replace('₹', '');
    const currentPrice = parseInt(priceStr);
    const originalPrice = this.originalPrices[product.id] || currentPrice;
    return originalPrice > currentPrice;
  }

  isChristmasCandle(product: ProductDetails): boolean {
    return product.id === 'christmas-candle' || product.id === 'christmas-candle-2';
  }

  hasMultipleImages(product: ProductDetails): boolean {
    return !!(product.images && product.images.length > 1);
  }

  calculateDiscount(product: ProductDetails): string {
    const priceStr = product.price.replace('₹', '');
    const currentPrice = parseInt(priceStr);
    const originalPrice = this.originalPrices[product.id] || currentPrice;
    const discountPercent = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
    return `${discountPercent}% OFF`;
  }

  getOriginalPrice(product: ProductDetails): string {
    const priceStr = product.price.replace('₹', '');
    const currentPrice = parseInt(priceStr);
    const originalPrice = this.originalPrices[product.id] || currentPrice;
    return originalPrice.toString();
  }

  openModal(productId: string) {
    this.selectedProduct = this.products[productId];
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedProduct = null;
  }
}
