import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private document: Document
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
      this.updateCanonical(config.url);
    }

    if (config.type) {
      this.meta.updateTag({ property: 'og:type', content: config.type });
    }
  }

  private updateCanonical(url: string) {
    const links = Array.from(this.document.head.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]'));
    const canonical = links.shift() ?? this.document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = url;
    if (!canonical.isConnected) this.document.head.appendChild(canonical);
    links.forEach(link => link.remove());
    // Remove the invalid meta element left by the previous implementation.
    this.meta.removeTag('rel="canonical"');
  }

  updateProductSEO(product: any) {
    const baseUrl = 'https://flametofable.ariyo.in';
    
    this.updateMetaTags({
      title: `${product.name} - Premium Handmade Candles | Flame to Fable`,
      description: product.description || `${product.name}. Premium handmade candle by Flame to Fable. Best candles in Kerala for home decor, gifting, and return gifts.`,
      keywords: `${product.name}, handmade candles Kerala, ${product.specifications?.fragrance || 'scented candles'}, premium candles, candle gifts Kerala, return gift candles, function return gifts`,
      image: new URL(product.image, baseUrl + '/').href,
      url: `${baseUrl}/product/${product.id}/`,
      type: 'product'
    });

    // Add product-specific structured data
    this.addProductPageStructuredData(product);
  }

  updateBlogSEO(blog: any) {
    const baseUrl = 'https://flametofable.ariyo.in';
    this.document.querySelectorAll('script[data-product]').forEach(script => script.remove());
    
    this.updateMetaTags({
      title: `${blog.title} - Flame to Fable Blog`,
      description: blog.excerpt || `Read ${blog.title} on Flame to Fable blog. Expert tips about candles, home decor, and creating perfect ambiance.`,
      keywords: `${blog.title}, candle tips, home decor blog, Kerala candles, candle care`,
      image: `${baseUrl}/favicon.png`,
      url: `${baseUrl}/blog/${blog.id}/`,
      type: 'article'
    });
  }

  private addProductPageStructuredData(product: any) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": product.name,
      "description": product.description,
      "image": new URL(product.image, 'https://flametofable.ariyo.in/').href,
      "url": `https://flametofable.ariyo.in/product/${product.id}/`,
      "publisher": {
        "@id": "https://flametofable.ariyo.in/#organization"
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
    this.document.querySelectorAll('script[data-product]').forEach(script => script.remove());
    this.updateMetaTags({
      title: 'Premium Handmade Candles | Best Candles for Home, Decorations, Gift - Flame to Fable',
      description: 'Best handmade candles in Kerala. Premium scented, eco-friendly & custom designs by Flame to Fable. Top-rated candle maker in God\'s own country. Order online!',
      keywords: 'best candles in Kerala, budget-friendly candles in Kerala, return gift candles Kerala, premium candles Kerala, handmade candles Kerala, scented candles Kerala, top candle makers Kerala, custom candles Kerala, home decor Kerala, aromatherapy candles, make your own candle, eco-friendly candles, gift candles Kerala, return gifts Kerala, function return gifts',
      image: 'https://flametofable.ariyo.in/favicon.png',
      url: 'https://flametofable.ariyo.in/',
      type: 'website'
    });
  }

  // Google Business Integration Methods
  addGoogleBusinessSchema() {
    // The static business schema is already available before JavaScript loads.
    if (this.document.querySelector('script[data-google-business]')) return;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    
    const googleBusinessData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://flametofable.ariyo.in/#organization",
      "name": "Flame to Fable",
      "logo": "https://flametofable.ariyo.in/favicon.png",
      "image": "https://flametofable.ariyo.in/favicon.png",
      "url": "https://flametofable.ariyo.in/",
      "sameAs": [
        "https://www.instagram.com/flametofable",
        "https://www.youtube.com/@FlameToFable",
        "https://maps.app.goo.gl/rk5Mpm4zY6G1cxB97"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Kochi",
        "addressRegion": "Kerala",
        "addressCountry": "IN",
        "postalCode": "682023"
      },
      "areaServed": [
        {
          "@type": "State",
          "name": "Kerala, India",
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 10.850516,
            "longitude": 76.271083
          }
        },
        { "@type": "Country", "name": "India" }
      ],
      "telephone": "+91-7994209092"
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
    // Regional coordinates selected for the Kerala service area.
    this.meta.updateTag({ name: 'geo.position', content: '10.850516;76.271083' });
    this.meta.updateTag({ name: 'ICBM', content: '10.850516, 76.271083' });
    
    // Add Google Business schema
    this.addGoogleBusinessSchema();
  }
}
