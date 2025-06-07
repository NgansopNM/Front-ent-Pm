import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface CartItem {
  product: any; 
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cartItems = new BehaviorSubject<CartItem[]>([]);
  public cartItems$: Observable<CartItem[]> = this._cartItems.asObservable();
  public cartItemCount$: Observable<number> = this.cartItems$.pipe(
    map(items => items.reduce((total, item) => total + item.quantity, 0))
  );

  constructor() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this._cartItems.next(JSON.parse(savedCart));
    }
  }

  addItemToCart(product: any, quantity: number = 1) {
    const currentItems = this._cartItems.value;
    const existingItemIndex = currentItems.findIndex(item => item.product.id === product.id);

    if (existingItemIndex > -1) {
      currentItems[existingItemIndex].quantity += quantity;
    } else {
      currentItems.push({ product, quantity });
    }
    this._cartItems.next([...currentItems]);
    this.saveCart();
  }

  removeItemFromCart(productId: number) {
    const currentItems = this._cartItems.value;
    const updatedItems = currentItems.filter(item => item.product.id !== productId);
    this._cartItems.next(updatedItems);
    this.saveCart();
  }

  updateItemQuantity(productId: number, newQuantity: number) {
    const currentItems = this._cartItems.value;
    const itemToUpdate = currentItems.find(item => item.product.id === productId);

    if (itemToUpdate) {
      if (newQuantity <= 0) {
        this.removeItemFromCart(productId);
      } else {
        itemToUpdate.quantity = newQuantity;
        this._cartItems.next([...currentItems]);
        this.saveCart();
      }
    }
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this._cartItems.value));
  }

  // Méthode clé pour la facture : récupère les articles du panier et le vide
  getAndClearCartForOrder(): CartItem[] {
    const itemsOrdered = this._cartItems.value;
    this.clearCart();
    return itemsOrdered;
  }

  clearCart() {
    this._cartItems.next([]);
    localStorage.removeItem('cart');
  }
}