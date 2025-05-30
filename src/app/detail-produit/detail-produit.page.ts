// src/app/detail-produit/detail-produit.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-produit', // Changed from app-product-detail
  templateUrl: './detail-produit.page.html', // Changed from ./product-detail.page.html
  styleUrls: ['./detail-produit.page.scss'], // Changed from ./product-detail.page.scss
  standalone:false,
})
export class DetailProduitPage implements OnInit { // Changed from ProductDetailPage
  productId: string | null = null;
  product: any;
  similarProducts: any[] = [];

  private allAvailableProducts = [
    {
      id: 1,
      image: 'assets/pppe.jpg',
      name: 'Mug intérieur coloré 315ml',
      rating: 4,
      reviews: 433,
      price: '7 150',
      description: 'Ce mug en céramique de haute qualité est parfait pour votre café ou thé du matin. Son intérieur coloré ajoute une touche de gaieté à votre routine quotidienne. Disponible en plusieurs couleurs vives. Idéal pour un cadeau.',
      stock: 50,
      seller: 'Boutique XYZ'
    },
    {
      id: 2,
      image: 'assets/apple-watch-main.png',
      name: 'Montre Connectee 5 eme generation. occassion chine',
      rating: 3,
      reviews: 421,
      price: '7 325',
      description: 'Découvrez la montre connectée de 5ème génération, une occasion unique de profiter de la technologie avancée à petit prix. Importée de Chine, elle offre des fonctionnalités de suivi d\'activité, notifications et plus encore.',
      stock: 12,
      deliveryInfo: 'Livraison standard en 5-7 jours ouvrables. Frais de livraison : 1500 fcfa.',
      seller: 'Tech Deals'
    },
    {
      id: 3,
      image: 'assets/laptop-3.jpg',
      name: 'Pyramid International Bouteille d\'eau en plastique transparent',
      rating: 4,
      reviews: 302,
      price: '7 425',
      description: 'Cette bouteille d\'eau en plastique transparent de Pyramid International est légère et durable, parfaite pour le sport, le bureau ou les voyages. Capacité de 500ml, facile à nettoyer et sans BPA.',
      stock: 100,
      seller: 'Eco-Shop'
    },
    {
      id: 4,
      image: 'assets/laptop-1.jpg',
      name: 'Produits High-Tech Performants',
      rating: 5,
      reviews: 120,
      price: '8 000',
      description: 'Découvrez notre sélection de produits high-tech performants, conçus pour améliorer votre quotidien. Performances optimales et fiabilité garantie.',
      stock: 30,
      seller: 'GadgetZone'
    },
    {
      id: 5,
      image: 'assets/pink-smartwatch.png',
      name: 'Montre CConnectee 5 eme generation. occassion chine',
      rating: 4,
      reviews: 250,
      price: '13 750',
      description: 'Montre connectée rose, 5ème génération. Occasion de Chine. Bracelet confortable, écran tactile. Idéale pour le suivi sportif et les notifications.',
      stock: 8,
      seller: 'Zenith Watches'
    },
    {
      id: 6,
      image: 'assets/black-smartwatch.png',
      name: 'Montre CConnectee 7 eme generation. occassion chine',
      rating: 3,
      reviews: 180,
      price: '13 750',
      description: 'Montre connectée noire, 7ème génération. Occasion de Chine. Plus rapide et plus précise. État impeccable, parfait pour un usage quotidien.',
      stock: 5,
      seller: 'Global Imports'
    },
    {
      id: 7,
      image: 'assets/pink-smartwatch-square.png',
      name: 'Montre CConnectee 4 eme generation. occassion chine',
      rating: 4,
      reviews: 150,
      price: '4 725',
      description: 'Montre connectée rose à écran carré, 4ème génération. Occasion de Chine. Fonctions essentielles pour le sport et la vie connectée.',
      stock: 20,
      seller: 'Time Savers'
    },
    {
      id: 18,
      image: 'assets/pink-smartwatch-square.png',
      name: 'Electomique domestique intelligent',
      rating: 4,
      reviews: 150,
      price: '4 725',
      description: 'Montre connectée rose à écran carré, 4ème génération. Occasion de Chine. Fonctions essentielles pour le sport et la vie connectée.',
      stock: 20,
      seller: 'Time Savers'
    },

     {
      id:20,
      name: 'Mug intérieur coloré 315ml',
      image: 'assets/images/laptop1.jpg',
      rating: 5,
      reviews: 433,
      price: '71502'
    },
    {
      id:21,
      name: 'Montre Connectée 5e génération - occasion Chine',
      image: 'assets/images/laptop2.jpg',
      rating: 5,
      reviews: 421,
      price: '73251'
    },
    {
      id:22,
      name: "Pyramid International - Bouteille d'eau plastique",
      image: 'assets/images/laptop1.jpg',
      rating: 4,
      reviews: 302,
      price: '63004'
    },
    { 
      id:23,
      name: "Pyramid International - Bouteille d'eau plastique",
      image: 'assets/images/laptop-apleliquidation.jpg',
      rating: 4,
      reviews: 302,
      price: '63003'
    },
    {
      id:24,
      name: "Pyramid International - Bouteille d'eau plastique",
      image: 'assets/images/laptop.jpg',
      rating: 4,
      reviews: 302,
      price: '60000'
    },
    {
      id:25,
      name: "Pyramid International - Bouteille d'eau plastique",
      image: 'assets/images/laptop-liquidation.jpg',
      rating: 4,
      reviews: 302,
      price: '15000'
    }  
  ];

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.productId = params.get('id');
      if (this.productId) {
        this.loadProductDetails();
      } else {
        this.router.navigate(['/home']);
      }
    });
  }

  loadProductDetails() {
    const foundProduct = this.allAvailableProducts.find(p => p.id === parseInt(this.productId!, 10));

    if (foundProduct) {
      this.product = foundProduct;
      this.loadSimilarProducts();
    } else {
      console.warn('Product not found for ID:', this.productId);
      this.router.navigate(['/home']);
    }
  }

  loadSimilarProducts() {
    const currentProductId = parseInt(this.productId!, 10);
    const isSmartwatch = this.product.name.toLowerCase().includes('montre connectee');

    if (isSmartwatch) {
      this.similarProducts = this.allAvailableProducts
        .filter(p => p.name.toLowerCase().includes('montre connectee') && p.id !== currentProductId)
        .slice(0, 3);
    } else {
      this.similarProducts = this.allAvailableProducts
        .filter(p => p.id !== currentProductId)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
    }
  }

  getStarIcons(rating: number): string[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? 'star' : 'star-outline');
    }
    return stars;
  }
}