import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  count = 0;
  constructor(
    public api: ApiService
  ) { }

  ngOnInit() {
    let local_storage;
    if(localStorage.getItem('cart') == null) {
      this.api.cart = 0;
    } else {
      local_storage = JSON.parse(localStorage.getItem('cart'));
      this.api.cart = local_storage.length;
    }
  }

}
