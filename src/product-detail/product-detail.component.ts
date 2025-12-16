import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetails } from '../shared/interfaces';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: ProductDetails | null = null;
  currentImageIndex = 0;
  isSpecsExpanded = false;

  // Product data dictionary (shared from catalogue)
  products: { [key: string]: ProductDetails } = {
    'christmastree2': {
      id: 'christmastree2',
      name: 'Christmas Tree (Pack of 2)',
      price: '₹200',
      image: './christmastree2.jpg',
      description: 'Beautiful pack of 2 Christmas tree candles with festive fragrance and holiday warmth.',
      specifications: {
        dimensions: '3.5" × 4.5" each',
        weight: '100g each (200g total)',
        wickType: 'Cotton wick',
        waxType: 'Premium soy wax',
        fragrance: 'Pine & Holiday Spice'
      },
      careInstructions: 'Perfect Christmas decoration pack.',
      socialLinks: {
        youtube: 'https://www.youtube.com/@FlameToFable/shorts',
        instagram: 'https://www.instagram.com/flametofable'
      }
    },
    'baby-jesus': {
      id: 'baby-jesus',
      name: 'Baby Jesus Candle',
      price: '₹200',
      image: './Baby-Jesus.jpg',
      description: 'Sacred and peaceful fragrance with frankincense and myrrh for Christmas worship',
      specifications: {
        dimensions: '3.5" × 4.0"',
        weight: '150g',
        wickType: 'Cotton wick',
        waxType: 'Premium soy wax',
        fragrance: 'Frankincense & Myrrh'
      },
      careInstructions: 'Perfect for prayer and meditation. Burn for maximum 3 hours. Handle with reverence.',
      socialLinks: {
        youtube: 'https://www.youtube.com/@FlameToFable/shorts',
        instagram: 'https://www.instagram.com/flametofable'
      }
    },
    'christmas-candle': {
      id: 'christmas-candle',
      name: 'Christmas Candle',
      price: '₹150',
      image: './christmas.jpg',
      images: ['./christmas.jpg', './christmastree.jpg', './christmas1.1.jpg'],
      description: 'Festive blend of cinnamon, pine, and warm spices to celebrate the season.',
      specifications: {
        dimensions: '3.5" × 4.2"',
        weight: '100g',
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
      price: '₹150',
      image: './christmas2.jpg',
      images: ['./christmas2.jpg', './christmas2.1.jpg'],
      description: 'Festive holiday candle in a unique decorative shape with warm spices and pine.',
      specifications: {
        dimensions: '4.0" × 5.0"',
        weight: '80g',
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
    'christmas-collection': {
      id: 'christmas-collection',
      name: 'Christmas Collection Pack of 3',
      price: '₹150',
      image: './christmas-collection.jpg',
      description: 'Complete Christmas candle collection with three festive fragrances.',
      specifications: {
        dimensions: '3.5" × 4.0" each',
        weight: '150g total',
        wickType: 'Cotton wick',
        waxType: 'Premium soy wax',
        fragrance: 'Pine, Cinnamon & Vanilla'
      },
      careInstructions: 'Perfect holiday gift set. Burn each candle separately for maximum 4 hours.',
      socialLinks: {
        youtube: 'https://www.youtube.com/@FlameToFable/shorts',
        instagram: 'https://www.instagram.com/flametofable'
      }
    },
    'vanilla-chocolate': {
      id: 'vanilla-chocolate',
      name: 'Vanilla Chocolate Candle',
      price: '₹350',
      image: './vanilla.jpg',
      description: 'Rich and indulgent blend of vanilla and chocolate for cozy evenings.',
      specifications: {
        dimensions: '4.0" × 5.0"',
        weight: '200ml',
        wickType: 'Cotton wick',
        waxType: 'Premium soy wax',
        fragrance: 'Vanilla & Dark Chocolate'
      },
      careInstructions: 'Perfect for romantic evenings. Burn for maximum 4 hours at a time.',
      socialLinks: {
        youtube: 'https://www.youtube.com/@FlameToFable/shorts',
        instagram: 'https://www.instagram.com/flametofable'
      }
    },
    'berry-candle': {
      id: 'berry-candle',
      name: 'Berry Candle',
      price: '₹350',
      image: './berry-bliss.jpg',
      description: 'Fresh berry fragrance that energizes and refreshes any space.',
      specifications: {
        dimensions: '3.5" × 4.5"',
        weight: '200ml',
        wickType: 'Cotton wick',
        waxType: 'Soy wax blend',
        fragrance: 'Mixed Berry'
      },
      careInstructions: 'Perfect for morning freshness. Burn for maximum 4 hours.',
      socialLinks: {
        youtube: 'https://www.youtube.com/@FlameToFable/shorts',
        instagram: 'https://www.instagram.com/flametofable'
      }
    },
    'car-candle': {
      id: 'car-candle',
      name: 'Car Candle',
      price: '₹50',
      image: './Car.jpg',
      description: 'Compact car-shaped candle perfect for automotive enthusiasts.',
      specifications: {
        dimensions: '5.0" × 2.5"',
        weight: '60g',
        wickType: 'Cotton wick',
        waxType: 'Soy wax',
        fragrance: 'Fresh Linen'
      },
      careInstructions: 'Decorative candle. Burn with supervision. Maximum 3 hours.',
      socialLinks: {
        youtube: 'https://www.youtube.com/@FlameToFable/shorts',
        instagram: 'https://www.instagram.com/flametofable'
      }
    },
    'reindeer': {
      id: 'reindeer',
      name: 'Reindeer Candle',
      price: '₹50',
      image: './reindeer.jpg',
      description: 'Adorable reindeer-shaped candle perfect for Christmas decorations.',
      specifications: {
        dimensions: '4.0" × 3.5"',
        weight: '60g',
        wickType: 'Cotton wick',
        waxType: 'Soy wax',
        fragrance: 'Pine & Berries'
      },
      careInstructions: 'Decorative candle. Burn with supervision. Maximum 3 hours.',
      socialLinks: {
        youtube: 'https://www.youtube.com/@FlameToFable/shorts',
        instagram: 'https://www.instagram.com/flametofable'
      }
    },
    'reindeer-pack': {
      id: 'reindeer-pack',
      name: 'Reindeer Pack of 2',
      price: '₹100',
      image: './reindeer-pack.jpg',
      description: 'Charming pack of 2 reindeer candles for festive home decor.',
      specifications: {
        dimensions: '4.0" × 3.5" each',
        weight: '120g total',
        wickType: 'Cotton wick',
        waxType: 'Premium soy wax',
        fragrance: 'Pine & Holiday Spice'
      },
      careInstructions: 'Perfect Christmas decoration pack. Burn separately for maximum 3 hours each.',
      socialLinks: {
        youtube: 'https://www.youtube.com/@FlameToFable/shorts',
        instagram: 'https://www.instagram.com/flametofable'
      }
    },
    'stack-hearts': {
      id: 'stack-hearts',
      name: 'Stack Hearts Candle',
      price: '₹100',
      image: './stack-hearts.jpg',
      description: 'Romantic stacked hearts candle perfect for special occasions.',
      specifications: {
        dimensions: '3.5" × 5.0"',
        weight: '100g',
        wickType: 'Cotton wick',
        waxType: 'Premium soy wax',
        fragrance: 'Rose & Vanilla'
      },
      careInstructions: 'Perfect for romantic evenings. Burn for maximum 4 hours.',
      socialLinks: {
        youtube: 'https://www.youtube.com/@FlameToFable/shorts',
        instagram: 'https://www.instagram.com/flametofable'
      }
    },
    'peony-bloom': {
      id: 'peony-bloom',
      name: 'Peony Bloom Candle',
      price: '₹199',
      image: './peony.jpg',
      description: 'Beautiful peony-shaped candle with delicate floral fragrance.',
      specifications: {
        dimensions: '4.5" × 4.0"',
        weight: '110g',
        wickType: 'Cotton wick',
        waxType: 'Premium soy wax',
        fragrance: 'Peony & Jasmine'
      },
      careInstructions: 'Delicate flower candle. Burn with care for maximum 4 hours.',
      socialLinks: {
        youtube: 'https://www.youtube.com/@FlameToFable/shorts',
        instagram: 'https://www.instagram.com/flametofable'
      }
    },
    'daisy-love': {
      id: 'daisy-love',
      name: 'Daisy Love Candle',
      price: '₹50',
      image: './daisy.jpg',
      description: 'Sweet daisy-inspired candle with fresh spring fragrance.',
      specifications: {
        dimensions: '3.0" × 3.5"',
        weight: '60g',
        wickType: 'Cotton wick',
        waxType: 'Soy wax',
        fragrance: 'Fresh Daisy'
      },
      careInstructions: 'Perfect for spring freshness. Burn for maximum 3 hours.',
      socialLinks: {
        youtube: 'https://www.youtube.com/@FlameToFable/shorts',
        instagram: 'https://www.instagram.com/flametofable'
      }
    },
    'sunflower': {
      id: 'sunflower',
      name: 'Sunflower Candle',
      price: '₹50',
      image: './daisy1.jpg',
      description: 'Bright sunflower candle that brings summer sunshine indoors.',
      specifications: {
        dimensions: '4.0" × 3.0"',
        weight: '60g',
        wickType: 'Cotton wick',
        waxType: 'Soy wax',
        fragrance: 'Sunflower & Citrus'
      },
      careInstructions: 'Cheerful decoration candle. Burn for maximum 3 hours.',
      socialLinks: {
        youtube: 'https://www.youtube.com/@FlameToFable/shorts',
        instagram: 'https://www.instagram.com/flametofable'
      }
    },
    'berry-bliss': {
      id: 'berry-bliss',
      name: 'Berry Bliss Candle',
      price: '₹350',
      image: './berry-bliss.jpg',
      description: 'Luxurious berry blend candle with rich fruity fragrance.',
      specifications: {
        dimensions: '4.0" × 4.5"',
        weight: '200ml',
        wickType: 'Cotton wick',
        waxType: 'Premium soy wax',
        fragrance: 'Mixed Berry Bliss'
      },
      careInstructions: 'Premium scented candle. Burn for maximum 4 hours.',
      socialLinks: {
        youtube: 'https://www.youtube.com/@FlameToFable/shorts',
        instagram: 'https://www.instagram.com/flametofable'
      }
    },
    'latte-coffee': {
      id: 'latte-coffee',
      name: 'Latte Coffee Candle',
      price: '₹350',
      image: './coffee.jpg',
      description: 'Rich latte coffee candle with creamy vanilla notes.',
      specifications: {
        dimensions: '4.0" × 4.5"',
        weight: '200ml',
        wickType: 'Cotton wick',
        waxType: 'Premium soy wax',
        fragrance: 'Latte & Vanilla'
      },
      careInstructions: 'Perfect for coffee lovers. Burn for maximum 4 hours.',
      socialLinks: {
        youtube: 'https://www.youtube.com/@FlameToFable/shorts',
        instagram: 'https://www.instagram.com/flametofable'
      }
    },
    'watermelon': {
      id: 'watermelon',
      name: 'Watermelon Candle',
      price: '₹200',
      image: './watermelon.jpg',
      description: 'Refreshing watermelon-shaped candle with sweet summer fragrance.',
      specifications: {
        dimensions: '4.5" × 3.5"',
        weight: '100ml',
        wickType: 'Cotton wick',
        waxType: 'Soy wax blend',
        fragrance: 'Fresh Watermelon'
      },
      careInstructions: 'Summer fruit candle. Burn for maximum 4 hours.',
      socialLinks: {
        youtube: 'https://www.youtube.com/@FlameToFable/shorts',
        instagram: 'https://www.instagram.com/flametofable'
      }
    },
    'cloud': {
      id: 'cloud',
      name: 'Cloud Candle',
      price: '₹200',
      image: './cloud.jpg',
      description: 'Dreamy cloud-shaped candle with soft, airy fragrance.',
      specifications: {
        dimensions: '5.0" × 3.0"',
        weight: '100ml',
        wickType: 'Cotton wick',
        waxType: 'Premium soy wax',
        fragrance: 'Fresh Linen & Clouds'
      },
      careInstructions: 'Decorative cloud candle. Burn for maximum 4 hours.',
      socialLinks: {
        youtube: 'https://www.youtube.com/@FlameToFable/shorts',
        instagram: 'https://www.instagram.com/flametofable'
      }
    }
  };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId && this.products[productId]) {
      this.product = this.products[productId];
    } else {
      this.router.navigate(['/']);
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  enquireOnWhatsApp() {
    if (!this.product) return;
    
    const phoneNumber = '7994209092';
    const message = `Hi! I'm interested in the ${this.product.name} (${this.product.price}). Can you provide more details about availability and delivery?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  }

  changeImage(index: number) {
    this.currentImageIndex = index;
  }

  nextImage() {
    if (this.product?.images && this.currentImageIndex < this.product.images.length - 1) {
      this.currentImageIndex++;
    }
  }

  previousImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  getCurrentImage(): string {
    if (!this.product) return '';
    if (this.product.images && this.product.images.length > 0) {
      return this.product.images[this.currentImageIndex];
    }
    return this.product.image;
  }

  hasMultipleImages(): boolean {
    return this.product?.images ? this.product.images.length > 1 : false;
  }

  toggleSpecifications() {
    this.isSpecsExpanded = !this.isSpecsExpanded;
  }
}