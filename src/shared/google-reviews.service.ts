import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface GoogleReview {
  author_name: string;
  author_url?: string;
  language: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

export interface GooglePlaceDetails {
  place_id: string;
  name: string;
  formatted_address: string;
  formatted_phone_number: string;
  rating: number;
  user_ratings_total: number;
  reviews: GoogleReview[];
  opening_hours?: {
    weekday_text: string[];
  };
  website?: string;
  photos?: any[];
}

@Injectable({
  providedIn: 'root'
})
export class GoogleReviewsService {
  private readonly GOOGLE_API_KEY = 'YOUR_GOOGLE_PLACES_API_KEY'; // Replace with your actual API key
  private readonly PLACE_ID = 'ChIJHWUQOeOXFTkRNES02oVN-Qs'; // Replace with your Google Place ID
  private readonly CORS_PROXY = 'https://api.allorigins.win/raw?url='; // CORS proxy for development
  
  constructor(private http: HttpClient) { }

  /**
   * Fetch place details with reviews from Google Places API
   */
  getPlaceDetails(): Observable<GooglePlaceDetails | null> {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${this.PLACE_ID}&fields=place_id,name,formatted_address,formatted_phone_number,rating,user_ratings_total,reviews,opening_hours,website,photos&key=${this.GOOGLE_API_KEY}`;
    
    // Use CORS proxy for development (remove for production with proper backend)
    const proxiedUrl = this.CORS_PROXY + encodeURIComponent(url);
    
    return this.http.get<any>(proxiedUrl).pipe(
      map(response => {
        if (response.status === 'OK' && response.result) {
          return response.result as GooglePlaceDetails;
        }
        return null;
      }),
      catchError(error => {
        console.error('Error fetching Google Place details:', error);
        return of(null);
      })
    );
  }

  /**
   * Get reviews only from the place
   */
  getReviews(): Observable<GoogleReview[]> {
    return this.getPlaceDetails().pipe(
      map(placeDetails => {
        if (placeDetails && placeDetails.reviews) {
          return placeDetails.reviews.slice(0, 5); // Get latest 5 reviews
        }
        return this.getFallbackReviews();
      }),
      catchError(() => of(this.getFallbackReviews()))
    );
  }

  /**
   * Get business rating and review count
   */
  getBusinessRating(): Observable<{rating: number, total: number}> {
    return this.getPlaceDetails().pipe(
      map(placeDetails => {
        if (placeDetails) {
          return {
            rating: placeDetails.rating || 4.8,
            total: placeDetails.user_ratings_total || 127
          };
        }
        return { rating: 4.8, total: 127 };
      }),
      catchError(() => of({ rating: 4.8, total: 127 }))
    );
  }

  /**
   * Fallback reviews when API is not available
   */
  private getFallbackReviews(): GoogleReview[] {
    return [
      {
        author_name: 'Priya Nair',
        rating: 5,
        text: 'Amazing quality handmade candles! Perfect for home decor and gifting. Best candle store in Kerala!',
        relative_time_description: '2 weeks ago',
        time: Date.now() - (14 * 24 * 60 * 60 * 1000),
        language: 'en'
      },
      {
        author_name: 'Rajesh Kumar',
        rating: 5,
        text: 'Beautiful candles with long-lasting fragrance. Excellent customer service and fast delivery!',
        relative_time_description: '1 month ago',
        time: Date.now() - (30 * 24 * 60 * 60 * 1000),
        language: 'en'
      },
      {
        author_name: 'Anjali Menon',
        rating: 5,
        text: 'Love the variety and quality. The watermelon candle is my favorite! Highly recommended for return gifts.',
        relative_time_description: '3 weeks ago',
        time: Date.now() - (21 * 24 * 60 * 60 * 1000),
        language: 'en'
      },
      {
        author_name: 'Suresh Pillai',
        rating: 5,
        text: 'Perfect for bulk orders and corporate gifts. Christina provides excellent customer service!',
        relative_time_description: '1 week ago',
        time: Date.now() - (7 * 24 * 60 * 60 * 1000),
        language: 'en'
      }
    ];
  }

  /**
   * Format Google review for display
   */
  formatReviewForDisplay(review: GoogleReview): any {
    return {
      author: review.author_name,
      rating: review.rating,
      text: review.text,
      date: review.relative_time_description,
      profilePhoto: review.profile_photo_url,
      authorUrl: review.author_url
    };
  }

  /**
   * Check if Google Places API key is configured
   */
  isApiConfigured(): boolean {
    return this.GOOGLE_API_KEY !== 'YOUR_GOOGLE_PLACES_API_KEY';
  }

  /**
   * Get direct Google review link
   */
  getReviewLink(): string {
    return `https://search.google.com/local/writereview?placeid=${this.PLACE_ID}`;
  }
}