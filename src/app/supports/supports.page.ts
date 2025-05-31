import { Component } from '@angular/core';
import { Router } from '@angular/router';

export interface Support {
  id: number;
  nom: string;
  image: string;
  qualite: string;
  prix: number;
  description: string;
  pages: number;
  type: string;
  note: number;
  avis: number;
}

@Component({
  selector: 'app-supports',
  templateUrl: './supports.page.html',
  styleUrls: ['./supports.page.scss'],
  standalone:false,
})
export class SupportsPage {
  supports: Support[] = [
    {
      id: 1,
      nom: 'Support Spirale',
      image: 'assets/img/support-spirale.jpg',
      qualite: 'Haut de gamme',
      prix: 4500,
      description: 'Format A4 - 21x29.7cm',
      pages: 200,
      type: 'Couverture rigide',
      note: 4,
      avis: 128
    },
    {
      id: 2,
      nom: 'Support de Dessin',
      image: 'assets/img/support-dessin.jpg',
      qualite: 'Premium',
      prix: 6750,
      description: 'Format A3 - 29.7x42cm',
      pages: 120,
      type: 'Papier grainé',
      note: 5,
      avis: 89
    },
    {
      id: 3,
      nom: 'Support Agenda 2025',
      image: 'assets/img/support-agenda.jpg',
      qualite: 'Luxe',
      prix: 8900,
      description: 'Format poche - 10x15cm',
      pages: 365,
      type: 'Couverture cuir',
      note: 3,
      avis: 42
    },
    {
      id: 4,
      nom: 'Support Université',
      image: 'assets/img/support-univ.jpg',
      qualite: 'Standard',
      prix: 3200,
      description: 'Format A4 - 21x29.7cm',
      pages: 96,
      type: 'Quadrillé',
      note: 4,
      avis: 156
    },
    {
      id: 5,
      nom: 'Support Carnet',
      image: 'assets/img/support-carnet.jpg',
      qualite: 'Moyenne',
      prix: 2850,
      description: 'Format A5 - 14.8x21cm',
      pages: 80,
      type: 'Ligné',
      note: 5,
      avis: 201
    },
    {
      id: 6,
      nom: 'Support Bloc Notes',
      image: 'assets/img/support-bloc.jpg',
      qualite: 'Basique',
      prix: 1950,
      description: 'Format A6 - 10.5x14.8cm',
      pages: 50,
      type: 'Adhésif',
      note: 3,
      avis: 73
    }
  ];

  constructor(private router: Router) {}

  voirDetails(support: Support) {
    this.router.navigate(['/support-detail', support.id]);
  }

  ajouterAuPanier(support: Support) {
    console.log('Ajout au panier :', support);
    // TODO: Implémenter la logique du panier
  }

  getStars(note: number): string {
    return '★'.repeat(note) + '☆'.repeat(5 - note);
  }
}
