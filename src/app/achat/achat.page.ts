import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../services/cart.service';

@Component({
  selector: 'app-achat',
  templateUrl: './achat.page.html',
  styleUrls: ['./achat.page.scss'],
  standalone:false,
})
export class AchatPage implements OnInit {
  orderedItems: CartItem[] = [];
  totalOrderPrice: number = 0;
  paymentNumbers = {
    mtn: '677843647',
    orange: '690778101'
  };

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    // Récupérer les articles qui ont été "commandés" (c'est-à-dire qui étaient dans le panier)
    // Nous utilisons un stockage temporaire ou un service pour cela si la redirection est immédiate
    // Pour une application réelle, ces données viendraient d'une API après une commande réussie.
    // Ici, nous simulons en utilisant la méthode getAndClearCartForOrder()
    const storedOrder = localStorage.getItem('lastOrderedItems');
    if (storedOrder) {
      this.orderedItems = JSON.parse(storedOrder);
      localStorage.removeItem('lastOrderedItems'); // Nettoyer après utilisation
    } else {
      // Si la page est accédée directement sans commande préalable, rediriger ou afficher un message
      console.warn("Aucune commande trouvée. Redirection vers l'accueil.");
      this.router.navigate(['/home']);
      return;
    }

    this.calculateTotalOrderPrice();
  }

  // Calcule le prix total de la commande
  calculateTotalOrderPrice() {
    this.totalOrderPrice = this.orderedItems.reduce((sum, item) => {
      const priceStr = item.product.price.replace(/\s/g, '').replace(',', '.');
      const price = parseFloat(priceStr) || 0;
      return sum + (price * item.quantity);
    }, 0);
  }

  // Méthode utilitaire pour obtenir le prix total d'un article individuel
  getItemTotalPrice(item: CartItem): number {
    const priceStr = item.product.price.replace(/\s/g, '').replace(',', '.');
    const price = parseFloat(priceStr) || 0;
    return price * item.quantity;
  }

  // Fonction pour copier le numéro de téléphone (optionnel, pour l'UX)
  async copyPhoneNumber(number: string) {
    // Dans une vraie application Ionic, vous utiliseriez le Clipboard plugin:
    // import { Clipboard } from '@capacitor/clipboard';
    // await Clipboard.write({ string: number });
    // console.log('Numéro copié :', number);
    // Afficher un toast pour confirmer la copie
    try {
      await navigator.clipboard.writeText(number);
      alert('Numéro copié : ' + number); // Utilisation d'alert pour simplicité
    } catch (err) {
      console.error('Erreur lors de la copie du numéro :', err);
    }
  }
}