import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service'; // Votre service d'authentification existant
import { CartService } from '../services/cart.service'; // <-- Importez le CartService

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false // Conservez ceci si votre module n'est pas "standalone"
})
export class LoginPage implements OnInit {

  credentials = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private cartService: CartService // <-- Injectez le CartService
  ) { }

  ngOnInit() {
  }

  async login() {
    // Affiche un indicateur de chargement si nécessaire
    // const loading = await this.loadingController.create({ message: 'Connexion en cours...' });
    // await loading.present();

    this.authService.login(this.credentials).then(async (isValid) => {
      // await loading.dismiss(); // Masque l'indicateur de chargement

      if (isValid) {
        // --- Logique pour la commande après une connexion réussie ---
        const itemsToOrder = this.cartService.getAndClearCartForOrder(); // Récupère les articles et vide le panier

        if (itemsToOrder.length > 0) {
          // Sauvegarde temporairement les articles dans le localStorage
          // pour que la page 'achat' puisse les récupérer.
          localStorage.setItem('lastOrderedItems', JSON.stringify(itemsToOrder));
          console.log('Commande prête, redirection vers la facture:', itemsToOrder);
          this.router.navigateByUrl('/achat'); // Redirige vers la page de facture
        } else {
          // Si le panier est vide (pas de commande en attente), redirige vers une page par défaut
          console.log('Panier vide, pas de commande en attente. Redirection vers l\'accueil.');
          this.router.navigateByUrl('/home'); // Ou '/profile', etc.
        }
      } else {
        const alert = await this.alertController.create({
          header: 'Échec de la connexion',
          message: 'L\'email ou le mot de passe est incorrect.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    }).catch(async (error) => {
      // await loading.dismiss(); // Masque l'indicateur de chargement en cas d'erreur
      console.error('Erreur lors de la connexion:', error);
      const alert = await this.alertController.create({
        header: 'Erreur',
        message: 'Une erreur est survenue lors de la tentative de connexion. Veuillez réessayer.',
        buttons: ['OK'],
      });
      await alert.present();
    });
  }
}