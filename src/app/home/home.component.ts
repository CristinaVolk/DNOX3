import { Component, OnInit } from '@angular/core';
import {FlatRepository} from '../models/flat.repository';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

public productsPerPage = 4;
public selectedPage = 1;

private flats: any[]= [];

constructor(private rep: FlatRepository) {
  
}

loadFlats(){
  this.rep.getFlats().subscribe(res=>{
    this.flats=res;
    console.log(this.flats);
    }
  );
}

 getflats(): any[] {
  if(this.flats!=null){
    let pageIndex = (this.selectedPage - 1) * this.productsPerPage;
    return this.flats.slice(pageIndex, pageIndex + this.productsPerPage); 
  }
} 

delete(flat) {
  this.rep.deleteFlat(flat).subscribe(res=>{
    console.log(res);
    });
  this.flats.splice(this.flats.findIndex(p => p._id == flat._id),1);
}

ngOnInit(){
  this.loadFlats();
}

changePage(newPage: number) {
  this.selectedPage = newPage;
}

changePageSize(newSize: number) {
  this.productsPerPage = Number(newSize);
  this.changePage(1);
}

get pageNumbers(): any[] {
   return Array(Math.ceil(this.flats.length / this.productsPerPage))
  .fill(0).map((x, i) => i + 1); 
  }

}
