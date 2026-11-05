import { candleCategories, matchesCandleCategory } from '../shared/candle-categories';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef, inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductDetails } from '../shared/interfaces';
import { SeoService } from '../shared/seo.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: ProductDetails | null = null;
  private readonly destroyRef = inject(DestroyRef);
  currentImageIndex = 0;
  isSpecsExpanded = false;

  // Product data dictionary (shared from catalogue)
  products: { [key: string]: ProductDetails } = {
    'mini-bouquet': {
      "id": "mini-bouquet",
      "name": "Mini Bouquet Candle",
      "image": "/optimized/mini bouquet.jpg.webp",
      "images": [
            "/optimized/mini bouquet.jpg.webp",
            "/optimized/mini bouquets.jpg.webp"
      ],
      "description": "A miniature floral candle bouquet with rose and white flower details in a ribbed pot, made for thoughtful gifting."
},
    'butterfly': {
      "id": "butterfly",
      "name": "Butterfly Candles",
      "image": "/optimized/butterfly.jpg.webp",
      "description": "Delicate purple butterfly-shaped candles with textured floral details, for a playful decorative touch."
},
    'sunflower-garden': {
      id: 'sunflower-garden',
      name: 'Sunflower Garden Candle',
      image: './optimized/Sunflower Garden Candle.jpg.webp',
      images: ['./optimized/Sunflower Garden Candle.jpg.webp', './optimized/Sunflower Gardern Candle.jpg.webp'],
      description: 'A little garden in a glass bowl, with bright yellow sunflower details and green leaves. A cheerful touch for your space or a thoughtful gift.'
    },
    'tulip-candle': {
      id: 'tulip-candle',
      name: 'Tulip Candle',
      image: './optimized/TulipCandle.jpg.webp',
      description: 'A tulip-inspired decorative candle for your home or a thoughtful gift.',
      socialLinks: {
        youtube: 'https://www.youtube.com/@FlameToFable/shorts',
        instagram: 'https://www.instagram.com/flametofable'
      }
    },
    'trio-jar': {
      id: 'trio-jar',
      name: 'Trio Jar Candle',
      image: './optimized/TrioJar.jpg.webp',
      description: 'A decorative jar candle with three contrasting layers, made for gifting or adding a warm touch to your space.',
      socialLinks: {
        youtube: 'https://www.youtube.com/@FlameToFable/shorts',
        instagram: 'https://www.instagram.com/flametofable'
      }
    },
    'christmastree2': {
      id: 'christmastree2',
      name: 'Christmas Tree (Pack of 2)',
      image: './optimized/christmastree2.jpg.webp',
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
      image: './optimized/Baby-Jesus.jpg.webp',
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
      image: './optimized/christmas.jpg.webp',
      images: ['./optimized/christmas.jpg.webp', './optimized/christmastree.jpg.webp', './optimized/christmas1.1.jpg.webp'],
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
      image: './optimized/christmas2.jpg.webp',
      images: ['./optimized/christmas2.jpg.webp', './optimized/christmas2.1.jpg.webp'],
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
      image: './optimized/christmas-collection.jpg.webp',
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
      image: './optimized/vanilla.jpg.webp',
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
      image: './optimized/berry-bliss.jpg.webp',
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
      image: './optimized/Car.jpg.webp',
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
      image: './optimized/Reindeer.jpg.webp',
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
      image: './optimized/reindeer-pack.jpg.webp',
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
      image: './optimized/stack-hearts.jpg.webp',
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
      image: './optimized/peony.jpg.webp',
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
      image: './optimized/daisy.jpg.webp',
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
      image: './optimized/daisy1.jpg.webp',
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
      image: './optimized/berry-bliss.jpg.webp',
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
      image: './optimized/coffee.jpg.webp',
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
      image: './optimized/watermelon.jpg.webp',
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
      image: './optimized/cloud.jpg.webp',
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
    },
    'rose-candle': {
      id: 'rose-candle',
      name: 'Rose Candle',
      image: './optimized/rose.jpg.webp',
      description: 'Elegant rose-shaped candle with romantic fragrance for special occasions.',
      specifications: {
        dimensions: '4.0" × 4.0"',
        weight: '200ml',
        wickType: 'Cotton wick',
        waxType: 'Premium soy wax',
        fragrance: 'Rose'
      },
      careInstructions: 'Perfect for romantic evenings and special occasions. Burn for maximum 4 hours.',
      socialLinks: {
        youtube: 'https://www.youtube.com/@FlameToFable/shorts',
        instagram: 'https://www.instagram.com/flametofable'
      }
    },
    'rose-design-2': {
      id: 'rose-design-2',
      name: 'Rose Design 2',
      image: './optimized/rosedesign2.jpg.webp',
      description: 'Beautiful rose design candle with delicate petals and sweet fragrance.',
      specifications: {
        dimensions: '3.5" × 4.0"',
        weight: '100ml',
        wickType: 'Cotton wick',
        waxType: 'Premium soy wax',
        fragrance: 'Sweet Rose'
      },
      careInstructions: 'Decorative rose candle. Handle with care. Burn for maximum 4 hours.',
      socialLinks: {
        youtube: 'https://www.youtube.com/@FlameToFable/shorts',
        instagram: 'https://www.instagram.com/flametofable'
      }
    },
    'heart-candle': {
      id: 'heart-candle',
      name: 'Heart Candle',
      image: './optimized/heart.jpg.webp',
      description: 'Romantic heart-shaped candle perfect for expressing love and affection.',
      specifications: {
        dimensions: '4.0" × 3.5"',
        weight: '100ml',
        wickType: 'Cotton wick',
        waxType: 'Premium soy wax',
        fragrance: 'Rose & Jasmine'
      },
      careInstructions: 'Perfect for Valentine\'s Day and romantic occasions. Burn for maximum 4 hours.',
      socialLinks: {
        youtube: 'https://www.youtube.com/@FlameToFable/shorts',
        instagram: 'https://www.instagram.com/flametofable'
      }
    },
    'angel-wings': {
      id: 'angel-wings',
      name: 'Angel Wings Candle',
      image: './optimized/angelwings.jpg.webp',
      description: 'Heavenly angel wings candle with peaceful fragrance for serenity and calm.',
      specifications: {
        dimensions: '4.5" × 3.0"',
        weight: '90g',
        wickType: 'Cotton wick',
        waxType: 'Premium soy wax',
        fragrance: 'Lavender & Vanilla'
      },
      careInstructions: 'Perfect for meditation and peaceful moments. Burn for maximum 4 hours.',
      socialLinks: {
        youtube: 'https://www.youtube.com/@FlameToFable/shorts',
        instagram: 'https://www.instagram.com/flametofable'
      }
    },
    'ocean': {
      id: 'ocean',
      name: 'Ocean Candle',
      image: './optimized/ocean.jpg.webp',
      description: 'Fresh ocean breeze fragrance that brings the calming essence of the sea into your space.',
      specifications: {
        dimensions: '4.0" × 5.0"',
        weight: '200ml',
        wickType: 'Cotton wick',
        waxType: 'Premium soy wax',
        fragrance: 'Ocean Breeze & Sea Salt'
      },
      careInstructions: 'Perfect for relaxation and meditation. Burn for maximum 4 hours at a time.',
      socialLinks: {
        youtube: 'https://www.youtube.com/@FlameToFable/shorts',
        instagram: 'https://www.instagram.com/flametofable'
      }
    },
    'heartofroses': {
      id: 'heartofroses',
      name: 'Heart of Roses Candle',
      image: './optimized/heartofroses.jpg.webp',
      description: 'Romantic rose-scented candle crafted in a beautiful heart shape, perfect for special occasions.',
      specifications: {
        dimensions: '3.5" × 3.0"',
        weight: '80g',
        wickType: 'Cotton wick',
        waxType: 'Premium soy wax',
        fragrance: 'Fresh Rose Petals'
      },
      careInstructions: 'Perfect for romantic dinners and Valentine\'s Day. Burn for maximum 3 hours.',
      socialLinks: {
        youtube: 'https://www.youtube.com/@FlameToFable/shorts',
        instagram: 'https://www.instagram.com/flametofable'
      }
    },
    'magic': {
      id: 'magic',
      name: 'Magic Candle',
      image: './optimized/magic.jpg.webp',
      description: 'Enchanting candle with mystical fragrance that creates a magical ambiance in any room.',
      specifications: {
        dimensions: '4.0" × 4.5"',
        weight: '120g',
        wickType: 'Cotton wick',
        waxType: 'Premium soy wax',
        fragrance: 'Mystic Spice & Vanilla'
      },
      careInstructions: 'Creates magical ambiance for special moments. Burn for maximum 4 hours.',
      socialLinks: {
        youtube: 'https://www.youtube.com/@FlameToFable/shorts',
        instagram: 'https://www.instagram.com/flametofable'
      }
    },
    'icedmacha': {
      id: 'icedmacha',
      name: 'Iced Matcha Candle',
      image: './optimized/icedmacha.jpg.webp',
      description: 'Refreshing iced matcha scent that brings the energizing aroma of Japanese tea ceremony.',
      specifications: {
        dimensions: '3.5" × 4.0"',
        weight: '110g',
        wickType: 'Cotton wick',
        waxType: 'Premium soy wax',
        fragrance: 'Iced Matcha & Green Tea'
      },
      careInstructions: 'Perfect for morning meditation and focus. Burn for maximum 4 hours.',
      socialLinks: {
        youtube: 'https://www.youtube.com/@FlameToFable/shorts',
        instagram: 'https://www.instagram.com/flametofable'
      }
    }
  };

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private seoService: SeoService
  ) {}

  ngOnInit() {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      const productId = params.get('id');
      if (productId && this.products[productId]) {
        this.product = this.products[productId];
        this.currentImageIndex = 0; this.isSpecsExpanded = false;
        this.seoService.updateProductSEO(this.product);
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else { this.router.navigate(['/']); }
    });
  }
  get relatedProducts(): ProductDetails[] {
    if (!this.product) return [];
    const currentId = this.product.id;
    const groups = candleCategories.filter(category => category !== 'All candles' && matchesCandleCategory(currentId, category));
    return Object.values(this.products).filter(product => product.id !== currentId).map((product, index) => ({ product, index, score: groups.filter(group => matchesCandleCategory(product.id, group)).length })).sort((a,b) => b.score - a.score || a.index - b.index).slice(0,3).map(item => item.product);
  }

  goBack() {
    this.router.navigate(['/']);
  }

  enquireOnWhatsApp() {
    if (!this.product) return;
    
    const phoneNumber = '917994209092';
    const message = `Hi! I'm interested in the ${this.product.name}. Can you provide more details about availability and delivery?`;
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
