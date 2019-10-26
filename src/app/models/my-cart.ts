import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';

export class MyCart {
  myCartItems: ShoppingCartItem[] = [];
  totalCartPrice = 0;
  constructor(myCartItemList) {
    this.myCartItems = myCartItemList;
  }

  getTotalCartPrice(): number {
    let totalPrice = 0;
    if (this.myCartItems.length > 0) {
      this.myCartItems.forEach(element => {
        totalPrice += element.productPrice * element.quantity;
      });
    }
    this.totalCartPrice = totalPrice;
    return totalPrice;
  }

  getQuantity(product: Product): number {
    if (this.myCartItems.length > 0) {
      const index = this.myCartItems.findIndex((e) => e.productId === product.id);
      if (index === -1) {
        return 0;
      } else {
        return this.myCartItems[index].quantity;
      }
    } else {
      return 0;
    }
  }


  getTotalItemCount(): number {
    let totalCount = 0;
    if (this.myCartItems.length > 0) {
      this.myCartItems.forEach(element => {
        totalCount += element.quantity;
      });
    }
    return totalCount;
  }

  getTotalDiscountPrice(): number {
    let totalDiscount = 0;
    if (this.myCartItems.length > 0) {
      this.myCartItems.forEach(element => {
        totalDiscount += (element.productPriceBeforeDiscount - element.productPrice) * element.quantity;
      });
    }
    return totalDiscount;
  }

}
