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
  readonly bulkCategories = ['All designs', 'Floral candles', 'Sculpted candles'];
  bulkCategory = 'All designs';
  bulkVisibleCount = 6;
  private readonly bulkPhotos: BulkDesign[] = BULK_CANDLE_IMAGES.map((image, index) => {
    const names = ['Colourful Daisy Favours', 'Daisy Gift Pouches', 'Pastel Daisy Favours', 'Daisy Gift Pouches', 'Daisy Gift Pouches', 'Pastel Daisy Favours', 'Colourful Daisy Favours', 'Colourful Daisy Favours', 'Purple Daisy Gift Cards', 'Purple Daisy Gift Cards', 'Blue Daisy Gift Cards', 'Blue Daisy Gift Cards', 'Sunflower Favours', 'Sunflower Gift Cards', 'Baby Jesus Candles', 'Angel Candles', 'Angel Candles', 'Bubble Candles', 'Sculpted Gift Pouches', 'Personalised Candle Favours', 'Personalised Candle Favours', 'Personalised Gift Pouches', 'Personalised Gift Pouches', 'Personalised Gift Pouches', 'Sunflower Gift Cards', 'Sunflower Gift Cards'];
    return { image, images: [image], name: names[index] ?? 'Custom Candle Favours', category: index >= 17 && index <= 23 ? 'Sculpted candles' : 'Floral candles' };
  }).sort((a, b) => this.bulkPhotoOrder(a.image) - this.bulkPhotoOrder(b.image));
  readonly bulkDesigns: BulkDesign[] = [
    { image: '/Bulk/color%20daisy.jpg', name: 'Daisy Candles', category: 'Floral candles', images: this.bulkPhotos.filter(photo => photo.name.includes('Daisy')).map(photo => photo.image) },
    { image: '/Bulk/IMG20260429001835.jpg', name: 'Sunflower Candles', category: 'Floral candles', images: this.bulkPhotos.filter(photo => photo.name.includes('Sunflower')).map(photo => photo.image) },
    {
      image: '/Peony1.jpg', name: 'Peony Candles', category: 'Floral candles',
      images: ['/Peony1.jpg', '/Peony2.jpg', '/peony3.jpg', '/Peony4.jpg', '/Peony%20(2).jpg', '/Peony%20(3).jpg']
    },
    { image: '/Plumeria.jpg', name: 'Plumeria Candles', category: 'Floral candles', images: ['/Plumeria.jpg'] },
    { image: '/Rose1.jpg', name: 'Rose Candles', category: 'Floral candles', images: ['/Rose1.jpg', '/Rose%20(2).jpg'] },
    ...this.bulkPhotos
      .filter(photo => !photo.name.includes('Daisy') && !photo.name.includes('Sunflower') && photo.image !== '/Bulk/IMG20260430233751.jpg' && photo.name !== 'Sculpted Gift Pouches' && photo.name !== 'Personalised Candle Favours' && photo.name !== 'Personalised Gift Pouches')
      .map(photo => photo.name === 'Baby Jesus Candles'
        ? { ...photo, images: [...photo.images, '/Bulk/IMG20260430233751.jpg'] }
        : photo.name === 'Bubble Candles'
          ? { ...photo, images: [...photo.images, ...this.bulkPhotos.filter(item => item.name === 'Sculpted Gift Pouches' || item.name === 'Personalised Gift Pouches').map(item => item.image)] }
          : photo)
  ];
  selectedBulkDesign: BulkDesign | null = null;
  bulkGalleryIndex = 0;
  private bulkPhotoOrder(image: string) {
    const featured = ['/Bulk/color%20daisy.jpg', '/Bulk/daisy.jpg', '/Bulk/IMG20260428230307.jpg', '/Bulk/IMG20260428225915.jpg', '/Bulk/IMG20260429001835.jpg', '/Bulk/IMG20260430231928.jpg', '/Bulk/IMG20260504234750.jpg'];
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
  
  openDesignModal() {
    this.isDesignModalOpen = true;
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  }
  
  closeDesignModal() {
    this.isDesignModalOpen = false;
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
