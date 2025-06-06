import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart.service'; // Importez le CartService

@Component({
  selector: 'app-detail-produit',
  templateUrl: './detail-produit.page.html',
  styleUrls: ['./detail-produit.page.scss'],
  standalone: false,
})
export class DetailProduitPage implements OnInit {
  productId: string | null = null;
  product: any;
  similarProducts: any[] = [];
  quantity: number = 1;

  // Votre liste de produits (conservée telle quelle)
  private allAvailableProducts = [
    {
      id: 1,
      image: 'assets/laptop1.jpg',
      name: 'Laptop HP 11eme generation',
      rating: 4.5,
      reviews: 433,
      price: '160 000',
      description: 'Ordinateur HP 11eme generation, disque dur 512Go, RAM: 16Go',
      stock: 50,
      seller: 'Boutique XYZ',
    },
    {
      id: 2,
      image: 'assets/laptop2.jpg',
      name: 'Laptop DELL 13eme generation ',
      rating: 3,
      reviews: 421,
      price: '210 000',
      description: 'Laptop DELL, 13eme genration, 1To de Disque dur et 32Go de Ram. d;origine ruisse',
      stock: 12,
      deliveryInfo: 'Livraison standard en 5-7 jours ouvrables. Frais de livraison : 1500 fcfa.',
      seller: 'Tech Deals',
    },
    {
      id: 3,
      image: 'assets/deckstop1.jpg',
      name: 'Ton deckstop prod de marque DELL',
      rating: 4,
      reviews: 302,
      price: '75 000',
      description: 'Deckstop DElL 500Go de Disque Dur, et 8Go de Ram.',
      stock: 100,
      seller: 'Eco-Shop',
    },
    {
      id: 4,
      image: 'assets/img/support-agenda.jpg',
      name: 'Support Spiral',
      rating: 5,
      reviews: 120,
      price: '1 200',
      description: 'Chahiers pour prendre vos notes de cours',
      stock: 30,
      seller: 'GadgetZone',
    },
    {
      id: 5,
      image: 'assets/img/support-bloc.jpg',
      name: 'cahier de la validation',
      rating: 4,
      reviews: 250,
      price: '2 000',
      description: 'Valider prohrametion mobile sans stress',
      stock: 8,
      seller: 'Zenith Watches',
    },
    {
      id: 6,
      image: 'assets/img/support-carnet.jpg',
      name: 'Vos block note personalise',
      rating: 3,
      reviews: 180,
      price: '7 000',
      description: 'Block de notes personalise',
      stock: 5,
      seller: 'Global Imports',
    },
    {
      id: 7,
      image: 'assets/montre.jpg',
      name: 'Montre intelligente',
      rating: 4,
      reviews: 150,
      price: '9 200',
      description: 'Montre connectée rose à écran carré, 4ème génération. Occasion de Chine. Fonctions essentielles pour le sport et la vie connectée.',
      stock: 20,
      seller: 'Time Savers',
    },
    {
      id: 8,
      image: 'assets/montre3.jpg',
      name: 'Montre puissante d\'origine chinoise',
      rating: 4,
      reviews: 150,
      price: '7 800',
      description: 'Montre connectée  4ème génération. Occasion de Canada. Fonctions essentielles pour le sport et la vie connectée.',
      stock: 20,
      seller: 'Time Savers',
    },
    {
      id: 9,
      image: 'assets/montreconnectee.jpg',
      name: 'Montre super intelligent d\'origine suisse',
      rating: 4,
      reviews: 150,
      price: '8 500',
      description: 'Montre connectee intelligent, mesure la pression arterielle, la glycymie le taut de sang...',
      stock: 20,
      seller: 'Time Savers',
    },
    {
      id: 10,
      image: 'assets/cartememoire.jpg',
      name: 'Cartes memoires bon prix',
      rating: 4,
      reviews: 150,
      price: '6 000',
      description: 'Cartes memoires 2Go, 4Go, 8Go, 16Go, 64Go',
      stock: 20,
      seller: 'Time Savers',
    },
    {
      id: 11,
      image: 'assets/chargeur.jpg',
      name: 'Chargeur puissant tres rapide',
      rating: 4,
      reviews: 150,
      price: '9 200',
      description: 'Chargeurs pour laptop',
      stock: 20,
      seller: 'Time Savers',
    },
    {
      id: 12,
      image: 'assets/disque-dur.jpg',
      name: 'Disque dur SSD hautes perfomances',
      rating: 4,
      reviews: 150,
      price: '19 200',
      description: 'Les disques dur SSD a partir de 256Go',
      stock: 20,
      seller: 'Time Savers',
    },
    {
      id: 13,
      image: 'assets/casquebleu.jpg',
      name: 'Casque d\'origine Allemand',
      rating: 4,
      reviews: 150,
      price: '6 000',
      description: 'Les casques qui cognent comme le our-feur',
      stock: 20,
      seller: 'Time Savers',
    },
    {
      id: 14,
      image: 'assets/casquez.jpg',
      name: 'Casque Belge',
      rating: 4,
      reviews: 150,
      price: '4 500',
      description: 'Casques Belge',
      stock: 20,
      seller: 'Time Savers',
    },
    {
      id: 15,
      image: 'assets/aidspod-liquidation.jpg',
      name: 'Les aidspods pour suivre vos tutorielles',
      rating: 4,
      reviews: 150,
      price: '3 200',
      description: 'Aidspod stylise',
      stock: 20,
      seller: 'Time Savers',
    },
    {
      id: 16,
      image: 'assets/sac.jpg',
      name: 'Sac a bon prix',
      rating: 4,
      reviews: 150,
      price: '10 000',
      description: 'Sac a dos ',
      stock: 20,
      seller: 'Time Savers',
    },
    {
      id: 17,
      image: 'assets/parapluie.jpg',
      name: 'Casque Belge',
      rating: 4,
      reviews: 150,
      price: '4 500',
      description: 'Les paraplus vennant du maroc',
      stock: 20,
      seller: 'Time Savers',
    },
    {
      id: 18,
      image: 'assets/epouventaille1.jpg',
      name: 'Eprouventaille decoratif',
      rating: 4,
      reviews: 150,
      price: '200',
      description: 'Eprouventailles vous permettra de vous gettez un peut d\'air',
      stock: 20,
      seller: 'Time Savers',
    },
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cartService: CartService // Injectez le CartService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.productId = params.get('id');
      if (this.productId) {
        this.loadProductDetails();
      } else {
        this.router.navigate(['/home']);
      }
    });
  }

  loadProductDetails() {
    const foundProduct = this.allAvailableProducts.find((p) => p.id === parseInt(this.productId!, 10));

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
    const isWatch = this.product.name.toLowerCase().includes('montre');

    if (isWatch) {
      this.similarProducts = this.allAvailableProducts
        .filter((p) => p.name.toLowerCase().includes('montre') && p.id !== currentProductId)
        .slice(0, 3);
    } else {
      this.similarProducts = this.allAvailableProducts
        .filter((p) => p.id !== currentProductId)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
    }
  }

  getStarIcons(rating: number): string[] {
    const stars: string[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push('star');
    }
    if (hasHalfStar) {
      stars.push('star-half');
    }
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push('star-outline');
    }
    return stars;
  }

  incrementQuantity() {
    if (this.product && this.quantity < this.product.stock) {
      this.quantity++;
    } else if (this.product && !this.product.stock) { // Allow infinite if no stock defined
      this.quantity++;
    }
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  // MODIFIÉ : Appelle la méthode du CartService avec l'objet produit complet
  addToCart() {
    if (this.product) {
      this.cartService.addItemToCart(this.product, this.quantity); // Passe le produit et la quantité
      console.log(`Ajout de ${this.quantity} de ${this.product.name} (ID: ${this.product.id}) au panier.`);
      // Vous pourriez ajouter un toast ou une alerte ici pour informer l'utilisateur
    } else {
      console.warn('Impossible d\'ajouter au panier : produit non défini.');
    }
  }
}