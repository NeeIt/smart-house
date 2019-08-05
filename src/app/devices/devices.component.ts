import { Component, OnInit, Input } from '@angular/core';
import { RoomsService } from '../Services/rooms.service';
import { Device } from '../Types/Device';
import { Room } from '../Types/Room';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  private type:string;

  private sendDevice:Device;

  private calcDevice:number=0;

  private renameForm;

  private renameNow=false;

  @Input() modal:boolean;

  private editRoom;

  private devices=[];

  private rooms:Room[];

  constructor(private roomsService:RoomsService) { }

  private term:string="";

  private devices$=[];

  closeAdd(event){
    this.modal=false;
  }
  createDev(room){
    this.type="addDevice";
    this.modal=true;
    this.editRoom=room;
  }
  editDev(room,device){
    this.sendDevice = device;
    this.type="editDevice";
    this.modal=true;
    this.editRoom=room;
  }

  updateDevice(obj){
    let index = this.editRoom.devices.indexOf(obj.device);
    this.editRoom.devices[index]=obj.data;
    this.roomsService.updateRoom(this.editRoom).subscribe();
  }

  addDevice(device){
    this.editRoom.devices.push(device);
    this.roomsService.updateRoom( this.editRoom).subscribe();
  }
  delete(room,device){
    let index = room.devices.indexOf(device);
    room.devices.splice(index,1);
    this.roomsService.updateRoom(room).subscribe(); 
  }


  getRooms(){
    this.roomsService.getRooms().subscribe(rooms=>{this.rooms=rooms;})
  }
  
  save(room): void {
    this.roomsService.updateRoom(room).subscribe();
  }
  check(dev,room){
    (dev.value=="on")?dev.value="off":dev.value="on";
    this.save(room);
  }
  
  private searchTerms = new BehaviorSubject<string>(null);
  rooms$: Observable<Room[]>;
  search(term: string): void {
    this.searchTerms.next(term);
    this.term = term;
    this.searchDevice(term);
  }

 

  searchDevice(term){
    for(let room of this.rooms){
      for(let device of room.devices){
        if(device.title.indexOf(term)!=-1)this.devices$.push(device);
        else if (this.devices$.indexOf(device)!=-1) this.devices$.splice(this.devices$.indexOf(device),1);
      }
    }
    this.devices$=[...new Set(this.devices$)];
  }

  ngOnInit() {
    this.getRooms();

    this.rooms$ = this.searchTerms.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      tap(_=>this.load(true)),
      switchMap((term: string) => this.roomsService.searchRoom(term)),
      tap(_=>this.load(false)),
    );
    
  }

  load(state){
 
  }

}

