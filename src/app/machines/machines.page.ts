import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.page.html',
  styleUrls: ['./machines.page.scss'],
  standalone:false,
})
export class MachinesPage {
  laptops = [
    {
      id:20,
      nom: 'Mug intérieur coloré 315ml',
      image: 'assets/images/laptop1.jpg',
      rating: 5,
      votes: 433,
      price: '71502'
    },
    {
      id:21,
      name: 'Montre Connectée 5e génération - occasion Chine',
      image: 'assets/images/laptop2.jpg',
      rating: 5,
      votes: 421,
      price: '73251'
    },
    {
      id:22,
      name: "Pyramid International - Bouteille d'eau plastique",
      image: 'assets/images/laptop1.jpg',
      rating: 4,
      votes: 302,
      price: '63004'
    },
    { 
      id:23,
      name: "Pyramid International - Bouteille d'eau plastique",
      image: 'assets/images/laptop-apleliquidation.jpg',
      rating: 4,
      votes: 302,
      price: '63003'
    },
    {
      id:24,
      name: "Pyramid International - Bouteille d'eau plastique",
      image: 'assets/images/laptop.jpg',
      rating: 4,
      votes: 302,
      price: '60000'
    },
    {
      id:25,
      name: "Pyramid International - Bouteille d'eau plastique",
      image: 'assets/images/laptop-liquidation.jpg',
      rating: 4,
      votes: 302,
      price: '15000'
    } 
  ];

  
constructor(private router: Router) {}

voirDetails(produit: any) {
  this.router.navigate(['/detail-produit', produit.id]);
}
  
}
