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

    this.authService.login(this.credentials).then(async (isValid) => {
     
      if (isValid) {
       
        const itemsToOrder = this.cartService.getAndClearCartForOrder(); 

        if (itemsToOrder.length > 0) {
         
          localStorage.setItem('lastOrderedItems', JSON.stringify(itemsToOrder));
          console.log('Commande prête, redirection vers la facture:', itemsToOrder);
          this.router.navigateByUrl('/achat'); 
        } else {
          
          console.log('Panier vide, pas de commande en attente. Redirection vers l\'accueil.');
          this.router.navigateByUrl('/home'); 
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