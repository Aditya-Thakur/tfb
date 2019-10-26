import { Product } from './models/product';
import { MyCart } from './models/my-cart';

export const Global = {
    loggedIn: false,
    loggedInUser: {
        id: 0,
        name: '',
        email: '',
        contactno: 0,
        password: '',
        shippingAddress: '',
        landMark: '',
        shippingState: '',
        shippingCity: '',
        shippingPincode: 0,
        billingAddress: '',
        billingState: '',
        billingCity: '',
        billingPincode: 0,
        regDate: '',
        updationDate: '',
        ip: '',
        message: ''
    },
    showCurrentProduct : false,
    currentProductId: 0,
    cartActive : false,
    products: [{
    id: 0,
    category: 0,
    subcategory: 0,
    productName: '',
    productCompany: '',
    productPrice: 0,
    productPriceBeforeDiscount: 0,
    productDescription: '',
    productImage1: '',
    productImage2: '',
    productImage3: '',
    shippingCharge: 0,
    productAvailability: '',
    postingDate: new Date(),
    updationDate: new Date(),
    priceVarietyAvailable: false
    }],
    myCart: new MyCart({
        myCartItems: [{
            productId: 0,
            productName: '',
            productImage1: '',
            productPrice: 0,
            productPriceBeforeDiscount: 0,
            quantity: 0,
          }],
          getTotalCartPrice: () => 0,
          getQuantity: (product: Product) => 0,
          getTotalItemCount: () => 0,
          getTotalDiscountPrice: () => 0
    }),
    //  backendUrl: 'http://theflyingbasket.com/backend'
    backendUrl: 'http://localhost/backend'
};
