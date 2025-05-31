import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false, 
})
export class HomePage implements OnInit {
  allProducts: any[] = [];
  groupedProducts: any[][] = []; // This will hold products grouped into arrays of 3

  constructor() {}

  ngOnInit() {
  
    this.allProducts = [
      {
        id: 1,
        image: 'assets/laptop1.jpg', 
        name: 'Laptop HP 11eme generation',
        rating: 4,
        reviews: 433,
        price: '160 000',
      },
      {
        id: 2,
        image: 'assets/laptop2.jpg',
        name: 'Laptop DELL 13eme generation ',
        rating: 3,
        reviews: 421,
        price: '210 000',
      },
      {
        id: 3,
        image: 'assets/deckstop1.jpg',
        name: 'Ton deckstop prod de marque DELL',
        rating: 4,
        reviews: 302,
        price: '75 000',
      },
      {
        id: 4,
        image: 'assets/img/support-agenda.jpg',
        name: 'Support Spiral',
        rating: 5,
        reviews: 120,
        price: '1 200',
      },
      {
        id: 5,
        image: 'assets/img/support-bloc.jpg',
        name: 'cahier de la validation',
        rating: 4,
        reviews: 250,
        price: '2 000',
      },
      {
        id: 6,
        image: 'assets/img/support-carnet.jpg',
        name: 'Vos block note personalise',
        rating: 3,
        reviews: 180,
        price: '7 000',
      },
      {
        id: 7,
        image: 'assets/montre.jpg',
        name: 'Montre intelligente',
        rating: 4,
        reviews: 90,
        price: '9 200',
      },
      {
        id: 8,
        image: 'assets/montre3.jpg',
        name: 'Montre puissante d\'origine chinoise',
        rating: 5,
        reviews: 310,
        price: '7 800',
      },
      {
        id: 9,
        image: 'assets/montreconnectee.jpg',
        name: 'Montre super intelligent d\'origine suisse',
        rating: 4,
        reviews: 150,
        price: '8 500',
      },
      {
        id: 10,
        image: 'assets/cartememoire.jpg',
        name: 'Cartes memoires bon prix',
        rating: 3,
        reviews: 70,
        price: '6 000',
      },
       {
        id: 11,
        image: 'assets/chargeur.jpg',
        name: 'Chargeur puissant tres rapide',
        rating: 4,
        reviews: 90,
        price: '9 200',
      },
       {
        id: 12,
        image: 'assets/disque-dur.jpg',
        name: 'Disque dur SSD hautes perfomances',
        rating: 4,
        reviews: 90,
        price: '19 200',
      },
       {
        id: 13,
        image: 'assets/casquebleu.jpg',
        name: 'Casque d\'origine Allemand',
        rating: 4,
        reviews: 90,
        price: '6 000',
      },
       {
        id: 14,
        image: 'assets/casquez.jpg',
        name: 'Casque Belge',
        rating: 4,
        reviews: 90,
        price: '4 500',
      },
       {
        id: 15,
        image: 'assets/aidspod-liquidation.jpg',
        name: 'Les aidspods pour suivre vos tutorielles',
        rating: 4,
        reviews: 90,
        price: '3 200',
      },
       {
        id: 16,
        image: 'assets/sac.jpg',
        name: 'Sac a bon prix',
        rating: 4,
        reviews: 90,
        price: '10 000',
      },
       {
        id: 17,
        image:'assets/parapluie.jpg',
        name: 'Meilleurs parapluies',
        rating: 4,
        reviews: 90,
        price: '7 000',
      },
       {
        id: 18,
        image: 'assets/epouventaille1.jpg',
        name: 'Eprouventaille decoratif',
        rating: 4,
        reviews: 90,
        price: '200',
      },
    
    ];

    this.groupProductsIntoRows();
  }

  
  groupProductsIntoRows() {
    this.groupedProducts = [];
    const itemsPerRow = 3;
    for (let i = 0; i < this.allProducts.length; i += itemsPerRow) {
      this.groupedProducts.push(this.allProducts.slice(i, i + itemsPerRow));
    }
  }
  getSectionTitle(startIndex: number): string {
    const sectionNumber = Math.floor(startIndex / 3) + 1; 
    switch (sectionNumber) {
      case 1:
        return 'Les meilleurs Ordinateurs';
      case 2:
        return 'Les meilleurs Block de note';
      case 3:
        return 'Les meilleurs montres ';
      case 4:
        return 'Les accesoires pour vous';
      case 5:
        return 'Decouvrer de nouvelles choses';
      default:
        return `Autres produits interessants`; 
    }
  }
}