import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-room',
  templateUrl: './modal-room.component.html',
  styleUrls: ['./modal-room.component.css']
})
export class ModalRoomComponent implements OnInit {

  private addForm:FormGroup;
  private editForm:FormGroup;
  
  constructor() { }


  @Output() addedRoom:EventEmitter<any> = new EventEmitter(); 
  @Output() modal: EventEmitter<boolean> = new EventEmitter(); 
  @Input() type:string;

  onClose () {
    this.modal.emit(false);
  }

  ngOnInit() {
    if(this.type=="addRoom"){
      this.addForm = new FormGroup({
        title: new FormControl(null,Validators.required),
        img: new FormControl(null,Validators.required)
      });
    }else if (this.type=="editRoom"){
      this.editForm = new FormGroup({
        title: new FormControl(null,Validators.required),
        img: new FormControl(null,Validators.required)
      });
  }
  }

  addRoom(room){
    if (!room.title)room.title="unnamed room";
    room.devices=[];
    room.temperature=26;
    room.air=12;
    this.addedRoom.emit(room);
    this.onClose();
  }
}
