import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CatalogueComponent } from '../catalogue/catalogue.component';
import { BestSellersComponent } from '../best-sellers/best-sellers.component';
import { SeoService } from '../shared/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CatalogueComponent, BestSellersComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    isMenuOpen = false;
  
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
  
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    this.isMenuOpen = false; // Close menu after navigation
  }
}
