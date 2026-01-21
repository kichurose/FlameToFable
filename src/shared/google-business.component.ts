import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-google-business',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="google-business-integration">
      <!-- Google My Business Widget -->
      <div class="gmb-widget">
        <h3>Visit Our Store</h3>
        <div class="business-info">
          <div class="business-details">
            <div class="detail-item">
              <i class="fas fa-map-marker-alt"></i>
              <span>Kerala, India</span>
            </div>
            <div class="detail-item">
              <i class="fas fa-phone"></i>
              <a href="tel:+917994209092">+91 7994209092</a>
            </div>
            <div class="detail-item">
              <i class="fas fa-clock"></i>
              <span>Mon-Sun: 9:00 AM - 6:00 PM</span>
            </div>
            <div class="detail-item">
              <i class="fas fa-star"></i>
              <span>4.8/5 ⭐ (127 reviews)</span>
            </div>
          </div>
          
          <!-- Google Maps Embed -->
          <div class="maps-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.0!2d82.7525294!3d21.0680074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x20c19ef3911365fd%3A0x5ab155efba4d434!2sFlame%20to%20Fable!5e0!3m2!1sen!2sin!4v1705920000000!5m2!1sen!2sin"
              width="100%" 
              height="300" 
              style="border:0;" 
              allowfullscreen="" 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
          
          <!-- Action Buttons -->
          <div class="action-buttons">
            <a href="https://maps.app.goo.gl/rk5Mpm4zY6G1cxB97" 
               target="_blank" 
               class="btn btn-primary"
               rel="noopener noreferrer">
              <i class="fas fa-directions"></i>
              Get Directions
            </a>
            <a href="https://maps.app.goo.gl/rk5Mpm4zY6G1cxB97" 
               target="_blank" 
               class="btn btn-secondary"
               rel="noopener noreferrer">
              <i class="fas fa-star"></i>
              Write Review
            </a>
            <a href="tel:+917994209092" class="btn btn-success">
              <i class="fas fa-phone"></i>
              Call Now
            </a>
          </div>
        </div>
      </div>
      
      <!-- Customer Reviews Preview -->
      <div class="reviews-preview" *ngIf="showReviews">
        <h4>What Our Customers Say</h4>
        <div class="reviews-grid">
          <div class="review-item" *ngFor="let review of reviews">
            <div class="review-header">
              <div class="reviewer-info">
                <strong>{{ review.author }}</strong>
                <div class="stars">
                  <span *ngFor="let star of getStarArray(review.rating)">⭐</span>
                </div>
              </div>
              <span class="review-date">{{ review.date }}</span>
            </div>
            <p class="review-text">{{ review.text }}</p>
          </div>
        </div>
        <a href="https://maps.app.goo.gl/rk5Mpm4zY6G1cxB97" 
           target="_blank" 
           class="view-all-reviews"
           rel="noopener noreferrer">
          View All Reviews on Google
        </a>
      </div>
    </div>
  `,
  styles: [`
    .google-business-integration {
      background: #fff;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      margin: 2rem 0;
    }

    .gmb-widget h3 {
      color: #333;
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
      font-weight: 700;
    }

    .business-info {
      display: grid;
      gap: 2rem;
    }

    .business-details {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .detail-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .detail-item i {
      color: #f0e6ff;
      width: 20px;
    }

    .detail-item a {
      color: #333;
      text-decoration: none;
    }

    .detail-item a:hover {
      color: #f0e6ff;
    }

    .maps-container {
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .action-buttons {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      margin-top: 1.5rem;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .btn-primary {
      background: #f0e6ff;
      color: white;
    }

    .btn-primary:hover {
      background: #e0d6ef;
      transform: translateY(-2px);
    }

    .btn-secondary {
      background: #6c757d;
      color: white;
    }

    .btn-secondary:hover {
      background: #5a6268;
      transform: translateY(-2px);
    }

    .btn-success {
      background: #28a745;
      color: white;
    }

    .btn-success:hover {
      background: #218838;
      transform: translateY(-2px);
    }

    .reviews-preview {
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 1px solid #eee;
    }

    .reviews-preview h4 {
      margin-bottom: 1.5rem;
      color: #333;
    }

    .reviews-grid {
      display: grid;
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .review-item {
      background: #f8f9fa;
      padding: 1.5rem;
      border-radius: 8px;
      border-left: 4px solid #f0e6ff;
    }

    .review-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.75rem;
    }

    .reviewer-info strong {
      color: #333;
      display: block;
      margin-bottom: 0.25rem;
    }

    .stars {
      font-size: 0.9rem;
    }

    .review-date {
      color: #6c757d;
      font-size: 0.9rem;
    }

    .review-text {
      color: #555;
      line-height: 1.6;
      margin: 0;
    }

    .view-all-reviews {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: #f0e6ff;
      text-decoration: none;
      font-weight: 600;
      padding: 0.5rem 0;
    }

    .view-all-reviews:hover {
      text-decoration: underline;
    }

    @media (min-width: 768px) {
      .business-info {
        grid-template-columns: 1fr 1fr;
        align-items: start;
      }

      .reviews-grid {
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      }

      .action-buttons {
        justify-content: flex-start;
      }
    }
  `]
})
export class GoogleBusinessComponent implements OnInit {
  showReviews = true;
  
  reviews = [
    {
      author: 'Priya Nair',
      rating: 5,
      text: 'Amazing quality handmade candles! Perfect for home decor and gifting. Best candle store in Kerala!',
      date: '2 weeks ago'
    },
    {
      author: 'Rajesh Kumar',
      rating: 5,
      text: 'Beautiful candles with long-lasting fragrance. Excellent customer service and fast delivery!',
      date: '1 month ago'
    },
    {
      author: 'Anjali Menon',
      rating: 5,
      text: 'Love the variety and quality. The watermelon candle is my favorite! Highly recommended.',
      date: '3 weeks ago'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    this.loadGoogleMapsAPI();
  }

  getStarArray(rating: number): number[] {
    return Array(rating).fill(0);
  }

  private loadGoogleMapsAPI(): void {
    // Initialize Google Places API if available
    if (typeof (window as any).google !== 'undefined' && (window as any).google.maps) {
      this.initializePlaces();
    }
  }

  private initializePlaces(): void {
    // Initialize Google Places widgets if needed
    // This can be expanded to show live reviews from Google
  }

  // Method to trigger Google Business actions
  openGoogleBusiness(): void {
    window.open('https://maps.app.goo.gl/rk5Mpm4zY6G1cxB97', '_blank', 'noopener,noreferrer');
  }

  callBusiness(): void {
    window.location.href = 'tel:+917994209092';
  }

  getDirections(): void {
    window.open('https://maps.app.goo.gl/rk5Mpm4zY6G1cxB97', '_blank', 'noopener,noreferrer');
  }
}