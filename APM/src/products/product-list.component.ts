import { style } from '@angular/animations';
import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { filter, Observable, Subscription } from 'rxjs';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component  ({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    
    private _listFilter:string = '';
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.performFilter(value);
        console.log('In setter: ',value );
    }

    products: IProduct[] = [];
    filteredProducts: IProduct[] = [];
    errorMessage: string = "";
    private sub!: Subscription;

    //Need constructor for depedency injection of services
    //declares variable and initializes it (shorthand)
    constructor(private productService: ProductService){

    }    

    toggleImage(): void 
    {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
      //must subscribe to Observable to start it, store variable to unscribe when going away
      //options are next, error, and complete
        this.sub = this.productService.getProducts().subscribe({
          next: products => { this.products = products;this.filteredProducts = this.products;},
          error: err => this.errorMessage = err
        });
  
        
        this.listFilter = '';
    }

    ngOnDestroy(): void {
      this.sub.unsubscribe();
    }

    performFilter(filterBy: string) : IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter( (product: IProduct) => product.productName.toLocaleLowerCase().includes(filterBy));
    }

    onRatingClicked(message: string): void {
      this.pageTitle = 'Product List:' + message;
      console.log(`Received Notify Event ${message}`);
    }
}