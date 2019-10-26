import { MyCart } from './my-cart';

export class Order {
    id: number;
    userId: number;
    paymentMethod: string;
    orderDate: string;
    cart: MyCart;
    shippingAddress: string;
    landMark: string;
    shippingState: string;
    shippingCity: string;
    shippingPincode: number;
    contactno: number;
}

