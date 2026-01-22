import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-design-your-own',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Design Your Own Candles Section -->
    <section class="custom-design-section" id="custom-design">
      <div class="custom-design-header">
        <h2>🎨 Design Your Own Candles</h2>
        <p class="section-subtitle">Create personalized candles that tell your unique story</p>
      </div>
      
      <div class="custom-features">
        <div class="feature-grid">
          <div class="feature-item">
            <div class="feature-icon">🌈</div>
            <h3>Choose Colors</h3>
            <p>Select from our wide range of vibrant colors or request custom color matching</p>
          </div>
          
          <div class="feature-item">
            <div class="feature-icon">🌸</div>
            <h3>Pick Fragrances</h3>
            <p>Rose, Lavender, Vanilla, Jasmine, Sandalwood, or create your signature scent blend</p>
          </div>
          
          <div class="feature-item">
            <div class="feature-icon">🎭</div>
            <h3>Custom Shapes</h3>
            <p>Hearts, flowers, geometric designs, letters, logos, or bring your own design idea</p>
          </div>
          
          <div class="feature-item">
            <div class="feature-icon">✨</div>
            <h3>Add Details</h3>
            <p>Glitter, dried flowers, personalized messages, special packaging</p>
          </div>
        </div>
      </div>
      
      <div class="custom-process">
        <h3>How It Works</h3>
        <div class="process-steps">
          <div class="step">
            <div class="step-number">1</div>
            <h4>Share Your Vision</h4>
            <p>Tell us your ideas, occasion, colors, and fragrance preferences</p>
          </div>
          
          <div class="step">
            <div class="step-number">2</div>
            <h4>Design Consultation</h4>
            <p>We'll create a design mockup and discuss customization options with you</p>
          </div>
          
          <div class="step">
            <div class="step-number">3</div>
            <h4>Handcrafting</h4>
            <p>Our skilled artisans carefully craft your personalized candles</p>
          </div>
          
          <div class="step">
            <div class="step-number">4</div>
            <h4>Quality & Delivery</h4>
            <p>Quality check, beautiful packaging, and safe delivery to your door</p>
          </div>
        </div>
      </div>
      
      <div class="custom-occasions">
        <h3>Perfect For</h3>
        <div class="occasions-grid">
          <div class="occasion-item">💒 Weddings & Engagements</div>
          <div class="occasion-item">🎂 Birthday Celebrations</div>
          <div class="occasion-item">🏢 Corporate Gifts</div>
          <div class="occasion-item">🎄 Festival Specials</div>
          <div class="occasion-item">💝 Anniversary Gifts</div>
          <div class="occasion-item">🏠 Home Decor Projects</div>
        </div>
      </div>
      
      <div class="custom-cta">
        <h3>Ready to Create Something Special?</h3>
        <p class="cta-description">Starting from ₹299 for custom designs | Bulk orders available</p>
        <div class="cta-buttons">
          <a href="https://wa.me/7994209092?text=Hi%20Flame%20to%20Fable!%20I'm%20interested%20in%20designing%20my%20own%20custom%20candles.%20Can%20you%20help%20me%20create%20something%20special?" 
             target="_blank" class="btn btn-primary custom-btn">
            <i class="fab fa-whatsapp"></i>
            Start Designing on WhatsApp
          </a>
          <a href="mailto:flametofable@gmail.com?subject=Custom%20Candle%20Design%20Inquiry&body=Hi%20Flame%20to%20Fable,%0A%0AI'm%20interested%20in%20designing%20custom%20candles.%20Here%20are%20my%20requirements:%0A%0AOccasion:%20%0AColors:%20%0AFragrance:%20%0AShape/Design:%20%0AQuantity:%20%0ASpecial%20requests:%20%0A%0APlease%20let%20me%20know%20the%20pricing%20and%20timeline.%0A%0AThanks!" 
             class="btn btn-secondary custom-btn">
            <i class="fas fa-envelope"></i>
            Email Your Design Ideas
          </a>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./design-your-own.component.scss']
})
export class DesignYourOwnComponent {
  constructor() { }
}