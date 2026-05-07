import { Component, HostListener, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CatalogueComponent } from '../catalogue/catalogue.component';
import { BestSellersComponent } from '../best-sellers/best-sellers.component';
import { DesignYourOwnComponent } from '../design-your-own/design-your-own.component';
import { ContactComponent } from '../app/contact/contact';
import { SeoService } from '../shared/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CatalogueComponent, BestSellersComponent, DesignYourOwnComponent, ContactComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnDestroy {
    isMenuOpen = false;
    isDesignModalOpen = false;
    zoomedBulkImage: string | null = null;

  @ViewChild('bulkSlider') bulkSliderRef!: ElementRef<HTMLDivElement>;
  private rafId: number | null = null;
  private isUserScrolling = false;
  private userScrollTimeout: ReturnType<typeof setTimeout> | null = null;

  bulkImages: string[] = [
    '/Bulk/color%20daisy.jpg',
    '/Bulk/daisy%201.jpg',
    '/Bulk/daisy.jpg',
    '/Bulk/daisy2.jpg',
    '/Bulk/IMG20260410093550.jpg',
    '/Bulk/IMG20260417143323.jpg',
    '/Bulk/IMG20260427233947.jpg',
    '/Bulk/IMG20260427234001.jpg',
    '/Bulk/IMG20260428225915.jpg',
    '/Bulk/IMG20260428230012.jpg',
    '/Bulk/IMG20260428230307.jpg',
    '/Bulk/IMG20260428230313.jpg',
    '/Bulk/IMG20260429001835.jpg',
    '/Bulk/IMG20260430085846.jpg',
    '/Bulk/IMG20260430231928.jpg',
    '/Bulk/IMG20260430233751.jpg',
    '/Bulk/IMG20260430234056.jpg',
    '/Bulk/IMG20260504234750.jpg',
    '/Bulk/IMG20260505000020.jpg',
    '/Bulk/IMG20260505143309.jpg',
    '/Bulk/IMG20260505143330.jpg',
    '/Bulk/IMG20260505143804.jpg',
    '/Bulk/IMG20260505143813.jpg',
    '/Bulk/IMG20260505143829.jpg',
    '/Bulk/sunflower.jpg',
    '/Bulk/sunflower1.jpg',
  ];
  
  constructor(private router: Router, private seoService: SeoService) { 
    // Reset SEO to default homepage settings and add Google Business integration
    this.seoService.resetToDefault();
    this.seoService.updateLocalBusinessSEO();
    this.shuffleBulkImages();
  }

  ngAfterViewInit() {
    const el = this.bulkSliderRef?.nativeElement;
    if (!el) return;

    const pauseScroll = () => {
      this.isUserScrolling = true;
      if (this.userScrollTimeout) clearTimeout(this.userScrollTimeout);
      this.userScrollTimeout = setTimeout(() => { this.isUserScrolling = false; }, 1500);
    };

    el.addEventListener('touchstart', pauseScroll, { passive: true });
    el.addEventListener('mouseenter', pauseScroll);
    el.addEventListener('mouseleave', () => { this.isUserScrolling = false; });

    const scroll = () => {
      if (!this.isUserScrolling) {
        el.scrollLeft += 1;
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
          el.scrollLeft = 0;
        }
      }
      this.rafId = requestAnimationFrame(scroll);
    };
    this.rafId = requestAnimationFrame(scroll);
  }

  ngOnDestroy() {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
  }
  
  navigateToBlog(route: string) {
    this.router.navigate([route]);
  }

  private shuffleBulkImages() {
    for (let i = this.bulkImages.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.bulkImages[i], this.bulkImages[j]] = [this.bulkImages[j], this.bulkImages[i]];
    }
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

  openBulkZoom(img: string) {
    this.zoomedBulkImage = img;
    document.body.style.overflow = 'hidden';
  }

  closeBulkZoom() {
    this.zoomedBulkImage = null;
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
