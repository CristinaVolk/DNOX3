import { Component, OnInit } from '@angular/core';
import {FlatRepository} from '../models/flat.repository';
import { NgClass } from '@angular/common';
import {Room} from '../models/room.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

public productsPerPage = 10;
public selectedPage = 1;
public adding = null;
public newRoom: Room = new Room();

private flats: any[]= [];

constructor(private rep: FlatRepository) {
  
}

loadFlats(){
  this.rep.getFlats().subscribe(res=>{
    this.flats=res.reverse();
    }
  );
}

startAdd(flat) {
  this.adding=flat;
  this.newRoom.title = "Room"+(flat.Rooms.length+1);
}

stopAdd(){
  this.adding=null;
  this.newRoom = {};
}

isAdding(flat){
  if(flat==this.adding){
    return true;
  } else {
    return false;
  }
}

saveEditable(flat) {
  for (var i=0; i<flat.Rooms.length; i++){
    if(flat.Rooms[i].number_of_rooms<flat.Rooms[i].number_of_free_rooms){
      flat.Rooms[i].number_of_free_rooms=flat.Rooms[i].number_of_rooms;
    }
  }
  this.rep.updateFlat(flat);   
}

addRoom(flat){
  this.newRoom.number_of_free_rooms = this.newRoom.number_of_rooms;
  flat.Rooms.push(this.newRoom);
  console.log(this.newRoom);
  this.rep.updateFlat(flat);
  this.newRoom=new Room();
  this.adding = null;
}

 getflats(): any[] {
  if(this.flats!=null){
    let pageIndex = (this.selectedPage - 1) * this.productsPerPage;
    return this.flats.slice(pageIndex, pageIndex + this.productsPerPage); 
  }
} 

deleteRoom(flat,room) {
    flat.Rooms.splice(flat.Rooms.findIndex(p=>p._id==room._id),1);
    this.rep.updateFlat(flat);
}

increment(room,flat){
  console.log(room);
  
  if(room.number_of_free_rooms<room.number_of_rooms){
    console.log(flat);
    room.number_of_free_rooms++;
    this.rep.updateFlat(flat);
    
    
  }
}

decrement(room,flat){
  console.log(room);
  console.log(flat);
  if(room.number_of_free_rooms>0){
    room.number_of_free_rooms--;
    this.rep.updateFlat(flat);
   
  }
}

isZero(room){
  if(room.number_of_free_rooms==0) return true;
  else return false;
}

isFull(room){
  if(room.number_of_free_rooms==room.number_of_rooms) return true;
  else return false;
}

isEmpty(o){
  if(o==false) return true;
  else return false;
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

decrPage(){
    this.selectedPage--;
}

incPage(){
  this.selectedPage++;
}

isFirstPage(){
  if(this.selectedPage==1){
    return true;
  } else return false;
}

isLastPage(){
  if(this.selectedPage==this.pageNumbers.length){
    return true;
  } else return false;
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
