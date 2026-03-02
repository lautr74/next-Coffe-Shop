export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  variants: ProductVariant[];
};

export type ProductVariant = {
  id: string;
  name: string;
  price: number;
  productId: string;
  weight: number;
};
