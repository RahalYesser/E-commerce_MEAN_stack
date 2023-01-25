export interface Cart {
    items: Array<CartItem>;
}
  
export interface CartItem {
    id: number;
    product_image: string;
    name: string;
    price: number;
    quantity: number;
    
}