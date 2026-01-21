import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private title: Title,
    private meta: Meta
  ) { }

  updateTitle(title: string) {
    this.title.setTitle(title);
  }

  updateMetaTags(config: {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: string;
  }) {
    if (config.title) {
      this.title.setTitle(config.title);
      this.meta.updateTag({ property: 'og:title', content: config.title });
      this.meta.updateTag({ name: 'twitter:title', content: config.title });
    }

    if (config.description) {
      this.meta.updateTag({ name: 'description', content: config.description });
      this.meta.updateTag({ property: 'og:description', content: config.description });
      this.meta.updateTag({ name: 'twitter:description', content: config.description });
    }

    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }

    if (config.image) {
      this.meta.updateTag({ property: 'og:image', content: config.image });
      this.meta.updateTag({ name: 'twitter:image', content: config.image });
    }

    if (config.url) {
      this.meta.updateTag({ property: 'og:url', content: config.url });
      this.meta.updateTag({ rel: 'canonical', href: config.url });
    }

    if (config.type) {
      this.meta.updateTag({ property: 'og:type', content: config.type });
    }
  }

  updateProductSEO(product: any) {
    const baseUrl = 'https://flametofable.ariyo.in';
    
    this.updateMetaTags({
      title: `${product.name} - Premium Handmade Candles | Flame to Fable`,
      description: product.description || `${product.name} - ${product.price}. Premium handmade candle by Flame to Fable. Best candles in Kerala for home decor and gifting.`,
      keywords: `${product.name}, handmade candles Kerala, ${product.specifications?.fragrance || 'scented candles'}, premium candles, candle gifts Kerala`,
      image: `${baseUrl}/${product.image}`,
      url: `${baseUrl}/product/${product.id}`,
      type: 'product'
    });

    // Add product-specific structured data
    this.addProductStructuredData(product);
  }

  updateBlogSEO(blog: any) {
    const baseUrl = 'https://flametofable.ariyo.in';
    
    this.updateMetaTags({
      title: `${blog.title} - Flame to Fable Blog`,
      description: blog.excerpt || `Read ${blog.title} on Flame to Fable blog. Expert tips about candles, home decor, and creating perfect ambiance.`,
      keywords: `${blog.title}, candle tips, home decor blog, Kerala candles, candle care`,
      url: `${baseUrl}/blog/${blog.id}`,
      type: 'article'
    });
  }

  private addProductStructuredData(product: any) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.name,
      "description": product.description,
      "image": `https://flametofable.ariyo.in/${product.image}`,
      "brand": {
        "@type": "Brand",
        "name": "Flame to Fable"
      },
      "offers": {
        "@type": "Offer",
        "url": `https://flametofable.ariyo.in/product/${product.id}`,
        "priceCurrency": "INR",
        "price": product.price.replace('₹', ''),
        "priceValidUntil": "2026-12-31",
        "itemCondition": "https://schema.org/NewCondition",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "Flame to Fable"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "127"
      }
    };

    script.innerHTML = JSON.stringify(structuredData);
    
    // Remove existing product structured data
    const existingScript = document.querySelector('script[type="application/ld+json"][data-product]');
    if (existingScript) {
      existingScript.remove();
    }
    
    script.setAttribute('data-product', 'true');
    document.head.appendChild(script);
  }

  resetToDefault() {
    this.updateMetaTags({
      title: 'Premium Handmade Candles | Best Candles for Home, Decorations, Gift - Flame to Fable',
      description: 'Best handmade candles in Kerala. Premium scented, eco-friendly & custom designs by Flame to Fable. Top-rated candle maker in God\'s own country. Order online!',
      keywords: 'best candles in Kerala, budget-friendly candles in Kerala, premium candles Kerala, handmade candles Kerala, scented candles Kerala, top candle makers Kerala, custom candles Kerala, home decor Kerala, aromatherapy candles, make your own candle, eco-friendly candles, gift candles Kerala',
      image: 'https://flametofable.ariyo.in/favicon.png',
      url: 'https://flametofable.ariyo.in/',
      type: 'website'
    });
  }

  // Google Business Integration Methods
  addGoogleBusinessSchema() {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    
    const googleBusinessData = {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "Store"],
      "name": "Flame to Fable",
      "url": "https://flametofable.ariyo.in/",
      "sameAs": [
        "https://www.instagram.com/flametofable",
        "https://www.youtube.com/@FlameToFable",
        "https://maps.app.goo.gl/rk5Mpm4zY6G1cxB97"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Kerala",
        "addressRegion": "Kerala",
        "addressCountry": "India"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "21.0680074",
        "longitude": "82.7525294"
      },
      "telephone": "+91-7994209092",
      "openingHours": "Mo-Su 09:00-18:00",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "127"
      }
    };

    script.innerHTML = JSON.stringify(googleBusinessData);
    
    // Remove existing Google Business data
    const existingScript = document.querySelector('script[type="application/ld+json"][data-google-business]');
    if (existingScript) {
      existingScript.remove();
    }
    
    script.setAttribute('data-google-business', 'true');
    document.head.appendChild(script);
  }

  updateLocalBusinessSEO(businessData?: any) {
    // Add local business specific meta tags
    this.meta.updateTag({ name: 'geo.region', content: 'IN-KL' });
    this.meta.updateTag({ name: 'geo.placename', content: 'Kerala, India' });
    this.meta.updateTag({ name: 'geo.position', content: '21.0680074;82.7525294' });
    this.meta.updateTag({ name: 'ICBM', content: '21.0680074, 82.7525294' });
    
    // Add Google Business schema
    this.addGoogleBusinessSchema();
  }
}