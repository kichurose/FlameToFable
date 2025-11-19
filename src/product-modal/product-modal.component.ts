import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ProductDetails {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
  specifications: {
    dimensions: string;
    weight: string;
    wickType: string;
    waxType: string;
    fragrance: string;
  };
  careInstructions: string;
  socialLinks: {
    youtube: string;
    instagram: string;
  };
}

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent {
  @Input() product!: ProductDetails;
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  enquireOnWhatsApp() {
    const phoneNumber = '7994209092';
    const message = `Hi! I'm interested in the ${this.product.name} (${this.product.price}). Can you provide more details about availability and delivery?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  }
}