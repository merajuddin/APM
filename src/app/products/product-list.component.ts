import { Component, OnInit } from '@angular/core';
import { Iproduct } from './product';
import { ProductService } from './products.service';

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
    pageTitle: string = "Product List";
    imageWidth:number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string;
    
    _listFilter: string;
    get listFilter(): string{
        return this._listFilter;
    }

    set listFilter(value:string){
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter):this.products;
    }

    filteredProducts: Iproduct[];
    products: Iproduct[]

    constructor(private _productService: ProductService){
    }

    ngOnInit(): void{
        this._productService.getProducts()
        .subscribe(products => 
            {this.products = products;
             this.filteredProducts = this.products;
        },
        error => this.errorMessage = <any>error);   
    }

    performFilter(filterBy: string): Iproduct[]{
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: Iproduct)=>
            product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }


    toggleImage(): void{
        this.showImage = !this.showImage;
    }

    
    onRatingClicked(message: string): void{
        this.pageTitle = "Product List: "+ message;
    }
}