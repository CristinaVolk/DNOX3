import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {Room} from '../models/room.model';
import {Flat} from '../models/flat.model';
import {FlatRepository} from '../models/flat.repository';
import { NgForm} from '@angular/forms';

@Component({
  selector: 'app-add-flat',
  templateUrl: './add-flat.component.html',
  styleUrls: ['./add-flat.component.css']
})
export class AddFlatComponent implements OnInit {

  private flat: Flat={};
  private rooms: Room[]=[];

  constructor(private rep: FlatRepository, private cdRef:ChangeDetectorRef ) { 
    
  }

  addRoom(){
    console.log(this.rooms);
    console.log(this.flat);
    this.rooms.push(new Room("Room "+(this.rooms.length+1)));
    this.cdRef.detectChanges();
    
  }

  isLast(room){
    if(room==this.rooms[this.rooms.length-1]) return true;
    else return false;
  }

  saveRooms(){
    for(var i=0; i<this.rooms.length; i++){
      this.rooms[i].number_of_free_rooms=this.rooms[i].number_of_rooms;
    }
    this.flat.rooms=this.rooms;
  }


  onSubmit(form: NgForm){
    //var data = form.form.controls;
    this.saveRooms();
		//this.flat = new Flat(data.location.value, data.street.value, data.number.value, data.description.value,this.rooms);
    	this.rep.addFlat(this.flat).subscribe(data=> {
        console.log(data);
    	});
  	}


  ngOnInit() {
    this.rooms.push(new Room("Room 1"));
  }

}
