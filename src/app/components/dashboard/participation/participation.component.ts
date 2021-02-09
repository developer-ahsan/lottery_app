import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-participation',
  templateUrl: './participation.component.html',
  styleUrls: ['./participation.component.css']
})
export class ParticipationComponent implements OnInit {

  collection: any = [];
  ngInputs = '';
  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    public api: ApiService
  ) { }

  ngOnInit() {
  }
  // clickTicket(j) {
  //   this.count = this.check.reduce((a, c) => c ? ++a : a, 1);
  //   if (this.count <= 5) {
  //     this.check[j] = true;
  //     this.value[this.count-1] = j;
  //   }
  // }
  // reset() {
  //   this.value = [];
  //   this.count = 0;
  //   this.collection = Array(101);
  //   this.check = Array(101);
  // }
  randoms() {
    if(this.ngInputs == '') {
      this.toastr.warning('Please Add Number of tickets');
    } else if(Number(this.ngInputs) == 0) {
      this.toastr.warning('Number should be greater than 0');
    } else {
      this.collection = [];
      for (let index = 0; index < Number(this.ngInputs); index++) {
        this.collection[index] = Math.floor(Math.random() * 10000000000);
        console.log(this.collection[index])
      }
    }
  }
  addTickets() {
    let local_storage;
    let itemsInCart = []

    if(localStorage.getItem('cart')  == null){
      localStorage.setItem('cart', JSON.stringify(this.collection));
      this.api.cart = this.collection.length
      this.collection = [];
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } else {
      local_storage = JSON.parse(localStorage.getItem('cart'));
      for(var i in local_storage) {
        itemsInCart.push(local_storage[i]);
      }
      for(var i in this.collection) {
        itemsInCart.push(this.collection[i]);
      }
      localStorage.setItem('cart', JSON.stringify(itemsInCart));
      this.collection = [];
      this.api.cart = itemsInCart.length

      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
    this.toastr.success('Tickets Added Successfully')

  }
  clearTickets() {
    this.collection = [];
    this.ngInputs = ''
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
