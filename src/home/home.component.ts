import { Component } from '@angular/core';
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
export class HomeComponent {
    isMenuOpen = false;
    isDesignModalOpen = false;
  
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
