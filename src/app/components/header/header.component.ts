import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service'; 

@Component({
  selector: 'app-header', 
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone:false
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartItemCount: number = 0;
  private cartSubscription: Subscription | undefined;

  
  @Output() searchQuery = new EventEmitter<string>();

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartSubscription = this.cartService.cartItemCount$.subscribe(
      (count: number) => {
        this.cartItemCount = count;
      }
    );
  }

 
  onSearchInput(event: any) {
    const query = event.target.value || ''; 
    this.searchQuery.emit(query); 
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}