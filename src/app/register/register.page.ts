import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone:false
})
export class RegisterPage implements OnInit {

  userData = {
    nom: '',
    email: '',
    filiere: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  async register() {
    if (!this.userData.nom || !this.userData.email || !this.userData.filiere || !this.userData.password) {
      const alert = await this.alertController.create({
        header: 'Erreur',
        message: 'Veuillez remplir tous les champs.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    this.authService.register(this.userData).then(async (res) => {
      const toast = await this.toastController.create({
        message: '',
        duration: 3000,
        color: 'success'
      });
      await toast.present();
      this.router.navigateByUrl('/login');
    }).catch(async (err) => {
      const alert = await this.alertController.create({
        header: 'Erreur d\'inscription',
        message: err,
        buttons: ['OK'],
      });
      await alert.present();
    });
  }
}