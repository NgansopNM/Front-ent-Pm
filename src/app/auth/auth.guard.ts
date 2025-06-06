import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated.pipe(
      map(isAuthenticated => {
        if (!isAuthenticated) {
          // Si non authentifié, redirige vers la page de login
          this.router.navigateByUrl('/login');
          return false;
        }
        // Si authentifié, autorise l'accès
        return true;
      })
    );
  }
}