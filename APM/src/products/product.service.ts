import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, catchError, tap, throwError } from "rxjs";

//Registers application or from a specific component(and children)
//register via proviers: [Service] for component specific
@Injectable({
    providedIn: 'root'
})
export class ProductService {
    //private productUrl = "www.myWebService.com/api/products";
    private productUrl = 'api/products/products.json';

    //use Angular HTTP service
    constructor(private http: HttpClient) { }

    getProducts(): Observable<IProduct[]> {
        //tap is here only to debug to console.
        return this.http.get<IProduct[]>(this.productUrl).pipe(            
            tap(data => console.log('All: ', JSON.stringify(data))),
            catchError(this.handleError));
    }

    private handleError(err: HttpErrorResponse)
    {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent)
        {
            //A client-side or network error occured
            errorMessage = `An error occured: ${err.error.message}`;
        }
        else
        {
            //Backend returned an unsuccessful response code
            errorMessage = `Server returned code ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(()=>errorMessage);
    }
}