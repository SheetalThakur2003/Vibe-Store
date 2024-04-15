import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProductComponent } from './product/product.component';
import { ClientComponent } from './client/client.component';
import { ContactComponent } from './contact/contact.component';
import { EnquiryComponent } from './enquiry/enquiry.component';


const routes: Routes = [

  {
    path:'',
    component: HomeComponent
  },
  {
    path:'about',
    component: AboutComponent
  },
  {
    path:'product',
    component: ProductComponent
  },
  {
    path:'client',
    component: ClientComponent
  },
  {
    path:'contact',
    component: ContactComponent
  },
  {
    path:'enquiry',
    component: EnquiryComponent
  }
  ];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
