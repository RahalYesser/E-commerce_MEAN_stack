export interface Product {
    _id: string;
    pcid: string;
    name: string;
    color: string;
    size: string;
    price: number;
    categories: string;
    desc: string;
    img: string;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}