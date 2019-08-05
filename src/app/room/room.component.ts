import { Component, OnInit, Input } from "@angular/core";
import { RoomsService } from "../Services/rooms.service";
import { RouteConfigLoadEnd, ActivatedRoute } from "@angular/router";
import { Room } from "../Types/Room";
import { Device } from '../Types/Device';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: "app-room",
  templateUrl: "./room.component.html",
  styleUrls: ["./room.component.css"]
})
export class RoomComponent implements OnInit {

  private room: Room = new Room();

  private devices:Device[];

  private type:string;

  private sendDevice:Device;

  private calcDevice:number=0;

  private renameForm;

  private renameNow=false;

  @Input() modal:boolean;


  constructor(
    private roomsService: RoomsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getRoom();
    this.renameForm= new FormGroup({name:new FormControl(this.room.title)});
  }

  closeEventHander($event: boolean) {
    this.modal = $event;
  }

  getRoom() {
    const id = +this.route.snapshot.paramMap.get("id");
    this.roomsService.getRoom(id).subscribe(room => {this.room = room;this.calcDevice=room.devices.length});
  }

  save(): void {
    this.roomsService.updateRoom(this.room).subscribe();
  }
  check(dev){
    (dev.value=="on")?dev.value="off":dev.value="on";
    this.save();
  }
  closeAdd(event){
    this.modal=false;
  }
  createDev(){
    this.type="addDevice";
    this.modal=true;
  }
  editDev(device){
    this.sendDevice = device;
    this.type="editDevice";
    this.modal=true;
    
  }
  rename(){
    this.renameNow=true;
  }

  updateDevice(obj){
    if(!obj.device.id) {
      obj.data.id=Math.round(Math.random()*10000);//Костылька
      this.room.devices.push(obj.data);
      this.roomsService.updateRoom(this.room).subscribe();  
    } else {
      obj.data.id=obj.device.id;
      let index = this.room.devices.indexOf(obj.device);
      this.room.devices[index]=obj.data;
      this.roomsService.updateRoom(this.room).subscribe();
    }
  }

  updateRoom(data){
    this.room.title=(data.name)?data.name:"unnamed room";
    this.roomsService.updateRoom(this.room).subscribe(()=>this.renameNow=false);
  }

  delete(device){
    let index = this.room.devices.indexOf(device);
    this.room.devices.splice(index,1);
    this.roomsService.updateRoom(this.room).subscribe(); 
  }
}
