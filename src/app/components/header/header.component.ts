import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service'; // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-header', // Le sélecteur pour utiliser ce composant
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone:false
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartItemCount: number = 0;
  private cartSubscription: Subscription | undefined;

  // NOUVEAU: Émetteur d'événement pour la recherche
  // Il enverra le texte de la recherche au composant parent.
  @Output() searchQuery = new EventEmitter<string>();

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartSubscription = this.cartService.cartItemCount$.subscribe(
      (count: number) => {
        this.cartItemCount = count;
      }
    );
  }

  // NOUVEAU: Fonction appelée par la barre de recherche dans le HTML
  onSearchInput(event: any) {
    const query = event.target.value || ''; // Récupère la valeur, ou une chaîne vide
    this.searchQuery.emit(query); // Émet la valeur vers le parent
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}