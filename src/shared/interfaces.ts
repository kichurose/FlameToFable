export interface ProductDetails {
  id: string;
  name: string;
  price: string;
  image: string;
  images?: string[];
  description?: string;
  specifications?: {
    dimensions?: string;
    weight?: string;
    wickType?: string;
    waxType?: string;
    fragrance?: string;
  };
  careInstructions?: string;
  socialLinks?: {
    youtube?: string;
    instagram?: string;
  };
}