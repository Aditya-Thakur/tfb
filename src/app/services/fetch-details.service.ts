import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { Product } from '../models/product';
import { Subcategory } from '../models/subcategory';
import { Global } from '../global';
import { Order } from '../models/order';
import { ProductVariety } from '../models/product-variety';
import { map, catchError } from 'rxjs/operators';
 // tslint:disable no-string-literal
@Injectable({
  providedIn: 'root'
})
export class FetchDetailsService {

  baseUrl = Global.backendUrl;
  products: Product[];
  constructor(private http: HttpClient) { }

  // Get all categories
  async getAllCategories(): Promise<Category[]> {
    try {
      const response = await this.http.get(`${this.baseUrl}/api/getCategories.php`).toPromise();
      return response['categoryData'] as Category[];
    } catch (error) {
      await this.handleError(error);
    }
  }

  // Get all subcategories for a category
  async getAllSubcategories(categoryid): Promise<Subcategory[]> {
    try {
      const response = await this.http.post(`${this.baseUrl}/api/getSubcategoryByCategory.php`, categoryid).toPromise();
      return response['subcategoryData'] as Subcategory[];
    } catch (error) {
      await this.handleError(error);
    }
  }

  // Get all product for a Subcategory
  async getAllProducts(subcategory: Subcategory): Promise<Product[]> {
    try {
      const response = await this.http.post(`${this.baseUrl}/api/getProductsByCategoryId.php`, subcategory).toPromise();
      this.products = response['productData'] as Product[];
      return this.products;
    } catch (error) {
      await this.handleError(error);
    }
  }
  // Get product for a search keyword
  async getProductsBySearch(keyword: string): Promise<Product[]> {
    try {
      const response = await this.http.post(`${this.baseUrl}/api/searchBarResponse.php`, keyword).toPromise();
      this.products = response['productData'] as Product[];
      return this.products;
    } catch (error) {
      await this.handleError(error);
    }
  }
  // Get product for a search keyword
   getProductsBySearch2(keyword: string): Observable<Product[]> {
     if (keyword === '') { return null; }
     return this.http.post(`${this.baseUrl}/api/searchBarResponse.php`, keyword).pipe(
        map((res) => {
          return res['productData'] as Product[];
      }),
      catchError(this.handleError));
  }
   // Get product for people also bought
   async peopleAlsoBought(category: number): Promise<Product[]> {
    try {
      const response = await this.http.post(`${this.baseUrl}/api/peopleAlsoBought.php`, category).toPromise();
      this.products = response['productData'] as Product[];
      return this.products;
    } catch (error) {
      await this.handleError(error);
    }
  }
  // Get all order for a user.
  async getOrderByUserId(userId: number): Promise<Order[]> {
    try {
      const response = await this.http.post(`${this.baseUrl}/api/getOrderByUserId.php`, userId).toPromise();
      return response['orderData'] as Order[];
    } catch (error) {
      await this.handleError(error);
    }
  }

  // Get product details.
  async getProductByProductId(productId: number): Promise<Product> {
    try {
      const response = await this.http.post(`${this.baseUrl}/api/getProductByProductId.php`, productId).toPromise();
      return response['productData'] as Product;
    } catch (error) {
      await this.handleError(error);
    }
  }

  // Get all product details for menu page
  async getProductsByCategoryId(categoryId: number): Promise<Product[]> {
    try {
      const response = await this.http.post(`${this.baseUrl}/api/getAllProductsOfCategory.php`, categoryId).toPromise();
      this.products = response['productData'] as Product[];
      return this.products;
    } catch (error) {
      await this.handleError(error);
    }
  }
    // Get all product details for menu page
    async getProductsBySubcategoryId(subcategoryId: number): Promise<Product[]> {
      try {
        const response = await this.http.post(`${this.baseUrl}/api/getAllProductsOfSubCategory.php`, subcategoryId).toPromise();
        this.products = response['productData'] as Product[];
        return this.products;
      } catch (error) {
        await this.handleError(error);
      }
    }

  // Get Product Variety details.
  async getProductVarietyByProductId(productId: number): Promise<ProductVariety[]> {
    try {
      const response = await this.http.post(`${this.baseUrl}/api/getProductVarietyByProductId.php`, productId).toPromise();
      return response['productVarietyData'] as ProductVariety[];
    } catch (error) {
      await this.handleError(error);
    }
  }

  async addToWishlist(productId: number): Promise<string> {
    try {
      const order = {
        id: 0,
        userId: 0
      };
      order.id = productId;
      order.userId = Global.loggedInUser.id;
      const response = await this.http.post(`${this.baseUrl}/api/addToWishlist.php`, order).toPromise();
      return response['successMessage'] as string;
    } catch (error) {
      await this.handleError(error);
    }
  }
  private handleError(error: HttpErrorResponse) {
    console.log(error);
    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}
