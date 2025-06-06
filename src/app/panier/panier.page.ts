import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CartService, CartItem } from '../services/cart.service'; // Importez le service et l'interface CartItem

@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
  standalone:false,
})
export class PanierPage implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
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
      return sum + this.getItemTotalPrice(item); // Utilise la nouvelle fonction utilitaire
    }, 0);
  }

  /**
   * Calcule le prix total pour un seul article du panier.
   * Cette méthode gère la conversion de la chaîne de prix en nombre.
   * @param item L'article du panier.
   * @returns Le prix total de l'article (prix unitaire * quantité).
   */
  getItemTotalPrice(item: CartItem): number {
    // Nettoyer la chaîne de prix en retirant les espaces et en remplaçant la virgule par un point.
    // Ceci est crucial pour que parseFloat fonctionne correctement, car '160 000' n'est pas un nombre valide en JS.
    const priceStr = item.product.price.replace(/\s/g, '').replace(',', '.');
    const price = parseFloat(priceStr) || 0; // Convertir en nombre, ou 0 si la conversion échoue
    return price * item.quantity;
  }

  // Retirer un produit du panier
  removeItem(productId: number) {
    this.cartService.removeItemFromCart(productId);
  }

  // Rediriger vers la page de connexion pour commander
  goToLoginToOrder() {
    this.router.navigate(['/login']); // Redirige vers la page de login
  }

  // Gérer le changement de quantité via l'input
  onQuantityChange(event: any, productId: number) {
    const newQuantity = parseInt(event.detail.value, 10);
    // Assurez-vous que la quantité est un nombre valide et non négatif
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      this.cartService.updateItemQuantity(productId, newQuantity);
    }
  }
}