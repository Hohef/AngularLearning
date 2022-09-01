import { NgModule } from '@angular/core';
import { ProductListComponent } from 'src/products/product-list.component';
import { ProductsDetailComponent } from './products-detail.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from './product-detail.guard';
import { SharedModule } from '../shared/shared.module';
import { AppComponent } from '../app.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductsDetailComponent,
    ConvertToSpacesPipe
  ],
  imports: [
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent},
      { path: 'products/:id', 
        canActivate: [ProductDetailGuard], 
        component: ProductsDetailComponent
      }
    ]),
    SharedModule
  ]
  //Export is not necessary here for ProductsListComponent due to RouterModule registering
  //the selector/page and not used directly by app.component
})
export class ProductModule { }
