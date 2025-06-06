import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs'; // Importez Observable et Subscription
import { CartService, CartItem } from '../services/cart.service'; // Importez le service et l'interface CartItem

@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
})
export class PanierPage implements OnInit, OnDestroy {
  cartItems: CartItem[] = []; // Liste des articles dans le panier
  totalPrice: number = 0; // Prix total du panier
  private cartSubscription: Subscription | undefined;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    // S'abonner aux changements du panier
    this.cartSubscription = this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotalPrice(); // Recalculer le prix total à chaque changement
    });
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  // Calcule le prix total du panier
  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce((sum, item) => {
      // Assurez-vous que le prix est un nombre avant de multiplier
      const price = parseFloat(item.product.price.replace(/\s/g, '').replace(',', '.')) || 0;
      return sum + (price * item.quantity);
    }, 0);
  }

  // Retirer un produit du panier
  removeItem(productId: number) {
    this.cartService.removeItemFromCart(productId);
  }

  // Rediriger vers la page de connexion pour commander
  goToLoginToOrder() {
    this.router.navigate(['/login']); // Redirige vers la page de login
  }

  // Gérer le changement de quantité (si vous ajoutez un input de quantité)
  onQuantityChange(event: any, productId: number) {
    const newQuantity = parseInt(event.detail.value, 10);
    this.cartService.updateItemQuantity(productId, newQuantity);
  }
}