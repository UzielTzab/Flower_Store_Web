export interface ProductInterface {
  id?: string | number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  discount?: number;
  description: string;
  stock: number;
  status: string;
}
