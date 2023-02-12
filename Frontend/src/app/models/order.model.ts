import { Adress } from "./adress.model";
import { CartItem } from "./cart.model";

export class Order {
    _id!: string;
    userId!:string;
    fname!: string;
    lname!: string;
    adress!:Adress;
    email!: string;
    phone!: number;
    amount!:number;
    products!:CartItem;
    datecommande!: string;
    updatedAt!: string;
}