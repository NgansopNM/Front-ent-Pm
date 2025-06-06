import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // BehaviorSubject pour suivre l'état de l'authentification en temps réel
  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  // Simule une table d'utilisateurs dans une base de données
  private users: any[] = [];

  // Expose l'état de l'authentification comme un Observable public
  public isAuthenticated = this._isAuthenticated.asObservable();

  constructor(private router: Router) { }

  /**
   * Inscrit un nouvel utilisateur.
   * Dans une vraie application, vous feriez un appel HTTP vers votre backend.
   */
  register(userData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      // Vérifie si l'utilisateur existe déjà
      const userExists = this.users.find(u => u.email === userData.email);
      if (userExists) {
        reject('Cet utilisateur existe déjà.');
      } else {
        // Ajoute l'utilisateur à notre "base de données"
        this.users.push(userData);
        console.log('Utilisateurs enregistrés:', this.users);
        resolve('Inscription réussie !');
      }
    });
  }

  /**
   * Connecte un utilisateur.
   */
  login(credentials: { email: string, password: string }): Promise<boolean> {
    return new Promise(resolve => {
      const user = this.users.find(u => u.email === credentials.email && u.password === credentials.password);
      if (user) {
        this._isAuthenticated.next(true); // Met à jour l'état de connexion
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  /**
   * Déconnecte l'utilisateur.
   */
  logout() {
    this._isAuthenticated.next(false);
    this.router.navigateByUrl('/login');
  }
}