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
    const storedOrder = localStorage.getItem('lastOrderedItems');
    if (storedOrder) {
      this.orderedItems = JSON.parse(storedOrder);
      localStorage.removeItem('lastOrderedItems'); 
    } else {
    
      console.warn("Aucune commande trouvée. Redirection vers l'accueil.");
      this.router.navigate(['/home']);
      return;
    }

    this.calculateTotalOrderPrice();
  }

 
  calculateTotalOrderPrice() {
    this.totalOrderPrice = this.orderedItems.reduce((sum, item) => {
      const priceStr = item.product.price.replace(/\s/g, '').replace(',', '.');
      const price = parseFloat(priceStr) || 0;
      return sum + (price * item.quantity);
    }, 0);
  }

  
  getItemTotalPrice(item: CartItem): number {
    const priceStr = item.product.price.replace(/\s/g, '').replace(',', '.');
    const price = parseFloat(priceStr) || 0;
    return price * item.quantity;
  }

  
  async copyPhoneNumber(number: string) {
    
    try {
      await navigator.clipboard.writeText(number);
      alert('Numéro copié : ' + number); 
    } catch (err) {
      console.error('Erreur lors de la copie du numéro :', err);
    }
  }
}