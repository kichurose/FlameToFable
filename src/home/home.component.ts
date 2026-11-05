import { NEW_BULK_DESIGNS } from '../shared/new-candle-designs';
import { BULK_CANDLE_IMAGES } from '../shared/bulk-candle-images';
import { Component, HostListener, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolaroidLineCarouselComponent } from '../components/ui/polaroid-line-carousel.component';
import { Router } from '@angular/router';
import { CatalogueComponent } from '../catalogue/catalogue.component';
import { DesignYourOwnComponent } from '../design-your-own/design-your-own.component';
import { ContactComponent } from '../app/contact/contact';
import { SeoService } from '../shared/seo.service';

interface BulkDesign {
  image: string;
  name: string;
  category: string;
  images: string[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CatalogueComponent, DesignYourOwnComponent, ContactComponent, PolaroidLineCarouselComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    isMenuOpen = false;
    isDesignModalOpen = false;
    zoomedBulkImage: string | null = null;

  @ViewChild('bulkDialog') bulkDialog!: ElementRef<HTMLDialogElement>;
  readonly bulkCategories = ['All designs', 'Floral candles', 'Sculpted candles', 'Tealights', 'Festive candles'];
  bulkCategory = 'All designs';
  bulkVisibleCount = 6;
  private readonly bulkPhotos: BulkDesign[] = BULK_CANDLE_IMAGES.map((image, index) => {
    const names = ['Colourful Daisy Favours', 'Daisy Gift Pouches', 'Pastel Daisy Favours', 'Daisy Gift Pouches', 'Daisy Gift Pouches', 'Pastel Daisy Favours', 'Colourful Daisy Favours', 'Colourful Daisy Favours', 'Purple Daisy Gift Cards', 'Purple Daisy Gift Cards', 'Blue Daisy Gift Cards', 'Blue Daisy Gift Cards', 'Sunflower Favours', 'Sunflower Gift Cards', 'Baby Jesus Candles', 'Angel Candles', 'Angel Candles', 'Bubble Candles', 'Sculpted Gift Pouches', 'Personalised Candle Favours', 'Personalised Candle Favours', 'Personalised Gift Pouches', 'Personalised Gift Pouches', 'Personalised Gift Pouches', 'Sunflower Gift Cards', 'Sunflower Gift Cards'];
    return { image, images: [image], name: names[index] ?? 'Custom Candle Favours', category: index >= 17 && index <= 23 ? 'Sculpted candles' : 'Floral candles' };
  }).sort((a, b) => this.bulkPhotoOrder(a.image) - this.bulkPhotoOrder(b.image));
  readonly bulkDesigns: BulkDesign[] = [
    ...NEW_BULK_DESIGNS,
    { image: '/optimized/Bulk/color%20daisy.jpg.webp', name: 'Daisy Candles', category: 'Floral candles', images: [...this.bulkPhotos.filter(photo => photo.name.includes('Daisy')).map(photo => photo.image), ...['daisies', 'daisies (2)', 'daisy (2)', 'daisy (3)', 'dasiy'].map(name => '/optimized/' + name + '.jpg.webp')] },
    { image: '/optimized/Bulk/IMG20260429001835.jpg.webp', name: 'Sunflower Candles', category: 'Floral candles', images: [...this.bulkPhotos.filter(photo => photo.name.includes('Sunflower')).map(photo => photo.image), '/optimized/bulk sunflower.jpg.webp', '/optimized/sunflower card.jpg.webp'] },
    {
      image: '/optimized/Peony1.jpg.webp', name: 'Peony Candles', category: 'Floral candles',
      images: ['/optimized/Peony1.jpg.webp', '/optimized/Peony2.jpg.webp', '/optimized/peony3.jpg.webp', '/optimized/Peony4.jpg.webp', '/optimized/Peony%20(2).jpg.webp', '/optimized/Peony%20(3).jpg.webp']
    },
    { image: '/optimized/Plumeria.jpg.webp', name: 'Plumeria Candles', category: 'Floral candles', images: ['/optimized/Plumeria.jpg.webp', '/optimized/plumerias.jpg.webp'] },
    { image: '/optimized/Rose1.jpg.webp', name: 'Rose Candles', category: 'Floral candles', images: ['/optimized/Rose1.jpg.webp', '/optimized/Rose%20(2).jpg.webp'] },
    ...this.bulkPhotos
      .filter(photo => !photo.name.includes('Daisy') && !photo.name.includes('Sunflower') && photo.image !== '/optimized/Bulk/IMG20260430233751.jpg.webp' && photo.name !== 'Sculpted Gift Pouches' && photo.name !== 'Personalised Candle Favours' && photo.name !== 'Personalised Gift Pouches')
      .map(photo => photo.name === 'Baby Jesus Candles'
        ? { ...photo, images: [...photo.images, '/optimized/Bulk/IMG20260430233751.jpg.webp'] }
        : photo.name === 'Bubble Candles'
          ? { ...photo, images: [...photo.images, ...this.bulkPhotos.filter(item => item.name === 'Sculpted Gift Pouches' || item.name === 'Personalised Gift Pouches').map(item => item.image)] }
          : photo)
  ];
  selectedBulkDesign: BulkDesign | null = null;
  bulkGalleryIndex = 0;
  private bulkPhotoOrder(image: string) {
    const featured = ['/optimized/Bulk/color%20daisy.jpg.webp', '/optimized/Bulk/daisy.jpg.webp', '/optimized/Bulk/IMG20260428230307.jpg.webp', '/optimized/Bulk/IMG20260428225915.jpg.webp', '/optimized/Bulk/IMG20260429001835.jpg.webp', '/optimized/Bulk/IMG20260430231928.jpg.webp', '/optimized/Bulk/IMG20260504234750.jpg.webp'];
    const rank = featured.indexOf(image);
    return rank < 0 ? featured.length : rank;
  }
  get filteredBulkDesigns() {
    return this.bulkDesigns.filter(design => this.bulkCategory === 'All designs' || design.category === this.bulkCategory);
  }
  filterBulk(category: string) { this.bulkCategory = category; this.bulkVisibleCount = 6; }
  bulkEnquiryUrl(name: string) {
    return 'https://wa.me/917994209092?text=' + encodeURIComponent(`Hi Flame to Fable! I'd like to enquire about ${name} for a custom order.`);
  }
  constructor(private router: Router, private seoService: SeoService) { 
    // Reset SEO to default homepage settings and add Google Business integration
    this.seoService.resetToDefault();
    this.seoService.updateLocalBusinessSEO();

  }

  navigateToBlog(route: string) {
    this.router.navigate([route]);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  
  @ViewChild('designDialog') designDialog!: ElementRef<HTMLDialogElement>;

  openDesignModal() {
    this.isDesignModalOpen = true;
    this.designDialog.nativeElement.showModal();
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  }
  
  closeDesignModal() {
    this.isDesignModalOpen = false;
    this.designDialog.nativeElement.close();
    document.body.style.overflow = 'auto'; // Restore scroll
  }

  openBulkZoom(design: BulkDesign) {
    this.selectedBulkDesign = design;
    this.bulkGalleryIndex = 0;
    this.zoomedBulkImage = design.images[0];
    this.bulkDialog.nativeElement.showModal();
    document.body.style.overflow = 'hidden';
  }

  stepBulkGallery(direction: number) {
    if (!this.selectedBulkDesign) return;
    this.bulkGalleryIndex = Math.max(0, Math.min(this.selectedBulkDesign.images.length - 1, this.bulkGalleryIndex + direction));
    this.zoomedBulkImage = this.selectedBulkDesign.images[this.bulkGalleryIndex];
  }

  onBulkGalleryKey(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      this.stepBulkGallery(event.key === 'ArrowLeft' ? -1 : 1);
    }
  }

  closeBulkZoom() {
    this.bulkDialog.nativeElement.close();
    this.zoomedBulkImage = null;
    this.selectedBulkDesign = null;
    document.body.style.overflow = 'auto';
  }

  @HostListener('document:keydown.escape')
  onEscKey() {
    if (this.zoomedBulkImage) this.closeBulkZoom();
    if (this.isDesignModalOpen) this.closeDesignModal();
  }
  
  scrollToSection(sectionId: string) {
    if (sectionId === 'custom-design') {
      this.openDesignModal();
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    this.isMenuOpen = false; // Close menu after navigation
  }
}
