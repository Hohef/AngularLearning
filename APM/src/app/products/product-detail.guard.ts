import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ProductDetailGuard implements CanActivate {
    constructor(private router: Router) {}

    // **********************************
    // Can protect routes with following: CanActivate, CanDeactivate, CanLoad

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const id = Number(route.paramMap.get('id'));
        if (isNaN(id) || id < 1){
            //alert is just example, normally want page to do something
            alert('Invalid product id');
            this.router.navigate(['/products']);
            return false;
        }
        return true;
    }
}