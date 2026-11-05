import { Component, HostListener, OnDestroy } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({ selector: 'app-root', imports: [RouterOutlet], templateUrl: './app.html', styleUrl: './app.scss' })
export class App implements OnDestroy {
  menuOpen = false;
  activeSection = 'home';
  year = new Date().getFullYear();
  readonly navItems = [{ id: 'home', label: 'Home' }, { id: 'catalogue', label: 'Collection' }, { id: 'bulk-orders', label: 'Bulk Orders' }, { id: 'custom-design', label: 'Design Your Own' }, { id: 'about', label: 'About' }, { id: 'blog', label: 'Journal' }, { id: 'contact', label: 'Let’s talk' }];
  private navigation: Subscription;
  constructor(private router: Router) {
    this.navigation = router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { this.menuOpen = false; this.onScroll(); }
    });
  }
  ngOnDestroy() { this.navigation.unsubscribe(); }
  navigateToSection(sectionId: string, event: Event) {
    event.preventDefault(); this.menuOpen = false;
    this.router.navigate(['/'], { fragment: sectionId }).then(() => {
      requestAnimationFrame(() => { document.getElementById(sectionId)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' }); this.activeSection = sectionId; });
    });
  }
  @HostListener('window:scroll')
  onScroll() {
    if (this.router.url.startsWith('/product/')) { this.activeSection = 'catalogue'; return; }
    if (this.router.url.startsWith('/blog/')) { this.activeSection = 'blog'; return; }
    const sections = ['home', 'bulk-orders', 'custom-design', 'catalogue', 'about', 'collection', 'blog', 'contact'];
    let current = 'home';
    for (const id of sections) { const element = document.getElementById(id); if (element && element.getBoundingClientRect().top <= 160) current = id === 'collection' ? 'catalogue' : id; }
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = 'contact';
    this.activeSection = current;
  }
}
