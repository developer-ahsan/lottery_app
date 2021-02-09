import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  collection: any = [];
  constructor(
    public api: ApiService,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    this.collection = JSON.parse(localStorage.getItem('cart'));
  }
  clearAll() {
    localStorage.removeItem('cart');
    this.api.cart = 0;
    this.toast.success('Cart Clear Successfully')
  }

}
