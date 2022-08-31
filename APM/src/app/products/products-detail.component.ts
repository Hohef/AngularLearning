import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/products/product';

@Component({
  //routing not nesting so no need for selector
  //selector: 'pm-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.css']
})
export class ProductsDetailComponent implements OnInit {
  pageTitle:string = "Product Details"
  product: IProduct | undefined;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pageTitle += `: ${id}`;
  }

  onBack():void {
    this.router.navigate(['/products']);
  }





 // ***********************************
 // paramname must match that in route (app.module.ts)
 //Snapshot route (i.e. only once)
 //   this.route.shapshot.paramMap.get('paramname')
 //Observable if change over time
 //   this.route.paramMap.subscribe(
 //               params => console.log(params.get('paramname')));

}
