import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ProductDetails {
  id: string;
  name: string;
  price: string;
  image: string;
  images?: string[]; // Optional array for carousel
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
  
  currentImageIndex = 0;
  
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: Event) {
    if (this.isOpen) {
      this.closeModal();
    }
  }
  
  get currentImages(): string[] {
    return this.product.images && this.product.images.length > 0 
      ? this.product.images 
      : [this.product.image];
  }
  
  get currentImage(): string {
    return this.currentImages[this.currentImageIndex];
  }
  
  get hasMultipleImages(): boolean {
    return this.currentImages.length > 1;
  }

  closeModal() {
    this.currentImageIndex = 0;
    this.close.emit();
  }
  
  nextImage() {
    if (this.hasMultipleImages) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.currentImages.length;
    }
  }
  
  previousImage() {
    if (this.hasMultipleImages) {
      this.currentImageIndex = this.currentImageIndex === 0 
        ? this.currentImages.length - 1 
        : this.currentImageIndex - 1;
    }
  }
  
  goToImage(index: number) {
    if (index >= 0 && index < this.currentImages.length) {
      this.currentImageIndex = index;
    }
  }

  enquireOnWhatsApp() {
    const phoneNumber = '7994209092';
    const message = `Hi! I'm interested in the ${this.product.name} (${this.product.price}). Can you provide more details about availability and delivery?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  }
}