import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from 'src/app/common/header/header.component';
import { FooterComponent } from 'src/app/common/footer/footer.component';
import { SidebarComponent } from 'src/app/common/sidebar/sidebar.component';
import { ContactComponent } from './contact/contact.component';
import { ParticipationComponent } from './participation/participation.component';
import { FaqsComponent } from './faqs/faqs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CartComponent } from './cart/cart.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path: 'faqs',
        component: FaqsComponent,
      },
      {
        path: 'participation',
        component: ParticipationComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: 'payment',
        component: PaymentComponent,
      },
    ]
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ContactComponent,
    ParticipationComponent,
    FaqsComponent,
    CartComponent,
    PaymentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgxPayPalModule

  ]
})
export class DashboardModule { }
