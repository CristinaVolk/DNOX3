import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

includeShipped = false;
public productsPerPage = 4;
public selectedPage = 1;

constructor() {}

getOrders(): any[] {
  return;
 /*  let pageIndex = (this.selectedPage - 1) * this.productsPerPage
return this.repository.getProducts(this.selectedCategory)
.slice(pageIndex, pageIndex + this.productsPerPage); */
}

markShipped() {

}

delete(id: number) {

}
ngOnInit(){}

changePage(newPage: number) {
  this.selectedPage = newPage;
}

changePageSize(newSize: number) {
  this.productsPerPage = Number(newSize);
  this.changePage(1);
}

get pageNumbers(): any[] {
    return;
  /* return Array(Math.ceil(this.repository
  .getProducts(this.selectedCategory).length / this.productsPerPage))
  .fill(0).map((x, i) => i + 1); */
  }

}
