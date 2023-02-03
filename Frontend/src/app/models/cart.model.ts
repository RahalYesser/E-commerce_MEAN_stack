export interface Cart {
    items: Array<CartItem>;
}
  
export interface CartItem {
    id: string;
    product_image: string;
    name: string;
    price: number;
    quantity: number;
}