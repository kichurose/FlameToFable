import { Component, signal, OnInit, OnDestroy, HostListener } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('flametofable');
  private lastScrollTop = 0;
  private navbarElement?: HTMLElement;

  constructor(private router: Router) {}

  ngOnInit() {
    this.navbarElement = document.querySelector('.main-nav') as HTMLElement;
  }

  ngOnDestroy() {
    // Cleanup if needed
  }

  navigateHome() {
    this.router.navigate(['/']);
  }

  @HostListener('window:scroll')
  onScroll() {
    if (!this.navbarElement) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Show navbar when scrolling up or at very top
    if (scrollTop < this.lastScrollTop || scrollTop <= 50) {
      this.navbarElement.classList.remove('hidden');
      this.navbarElement.classList.add('show');
    } 
    // Hide navbar when scrolling down and past threshold
    else if (scrollTop > this.lastScrollTop && scrollTop > 50) {
      this.navbarElement.classList.add('hidden');
      this.navbarElement.classList.remove('show');
    }

    this.lastScrollTop = scrollTop;
  }
}
