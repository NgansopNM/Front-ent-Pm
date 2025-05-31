// src/app/montres/montres.page.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-montres',
  templateUrl: './montres.page.html',
  styleUrls: ['./montres.page.scss'],
  standalone: false,
})
export class MontresPage implements OnInit {
  watchProducts: any[] = []; 

  private allAvailableProducts = [
   
    {
      id: 7,
      image: 'assets/montreconnectee.jpg',
      name: 'Montre intelligente',
      rating: 4,
      reviews: 433,
      price: '9 200',
      description: 'Montre d\'origine Etat-unis ',
      stock: 50,
      seller: 'Boutique XYZ'
    },
    {
      id: 8,
      image: 'assets/montre3.jpg',
      name: 'Pyramid International Bouteille d\'eau en plastique transparent',
      rating: 4,
      reviews: 302,
      price: '7 425',
      description: 'Cette bouteille d\'eau en plastique transparent de Pyramid International est légère et durable, parfaite pour le sport, le bureau ou les voyages. Capacité de 500ml, facile à nettoyer et sans BPA.',
      stock: 100,
      seller: 'Eco-Shop'
    },
    {
      id: 9,
      image: 'assets/montre.jpg',
      name: 'Produits High-Tech Performants',
      rating: 5,
      reviews: 120,
      price: '8 000',
      description: 'Découvrez notre sélection de produits high-tech performants, conçus pour améliorer votre quotidien. Performances optimales et fiabilité garantie.',
      stock: 30,
      seller: 'GadgetZone'
    },

    {
      id: 9,
      image: 'assets/montreconnectee.jpg',
      name: 'Montre intelligente',
      rating: 4,
      reviews: 433,
      price: '9 200',
      description: 'Montre d\'origine Etat-unis ',
      stock: 50,
      seller: 'Boutique XYZ'
    },
    {
      id: 9,
      image: 'assets/montreconnectee.jpg',
      name: 'Montre intelligente',
      rating: 4,
      reviews: 433,
      price: '9 200',
      description: 'Montre d\'origine Etat-unis ',
      stock: 50,
      seller: 'Boutique XYZ'
    },
     {
      id: 9,
      image: 'assets/montreconnectee.jpg',
      name: 'Montre intelligente',
      rating: 4,
      reviews: 433,
      price: '9 200',
      description: 'Montre d\'origine Etat-unis ',
      stock: 50,
      seller: 'Boutique XYZ'
    },
  ];

  constructor() { }

  ngOnInit() {
    this.loadAllProducts(); 
  }

 
  loadAllProducts() {
    this.watchProducts = [...this.allAvailableProducts]; 
    console.log('Tous les produits chargés sur la page Montres :', this.watchProducts);
    console.log('Nombre total de produits chargés :', this.watchProducts.length);
  }

  getStarIcons(rating: number): string[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? 'star' : 'star-outline');
    }
    return stars;
  }
}