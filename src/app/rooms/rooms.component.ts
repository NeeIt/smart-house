import { Component, OnInit, Input, Output } from '@angular/core';
import { RoomsService } from '../Services/rooms.service';
import { Room } from '../Types/Room';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  
  constructor(private roomsService:RoomsService) { }

  private rooms:Room[];

  private calcRoom = 0;

  @Input() modal:boolean;
  @Output() modalType:string;

  ngOnInit() {
    this.getRooms();
  }
  getRooms(){
    this.roomsService.getRooms().subscribe(rooms => {this.rooms = rooms;this.calcRoom = this.rooms.length;});
  }
  deleteRoom(room){
    this.rooms=this.rooms.filter(r=>r!=room)
    this.roomsService.deleteRoom(room).subscribe();
    this.calcRoom--;
  }

  closeAdd(event){
    this.modal=false;
  }

  createRoom(){
    this.modalType="addRoom";
    this.modal=true;
  }

  addRoom(data){
    this.roomsService.addRoom(data).subscribe();
    this.getRooms();
  }
  private rooms$:Observable<any>;
  search(a){
    this.rooms$=this.roomsService.searchRoom(a);
  }
}
