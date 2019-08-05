import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {  } from 'events';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Room } from '../Types/Room';
import { Device } from '../Types/Device';
import { RoomsService } from '../Services/rooms.service';
import { Ico } from '../Types/Ico';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() type:string;
  @Input() takeDevice:Device;
  @Output() creating: EventEmitter<boolean> = new EventEmitter();
  @Output() editedDevice: EventEmitter<any> = new EventEmitter();

  private editForm:FormGroup;
  private icos:Ico[]=[{src:"",id:null,title:""}];
  private ico;

  onClose () {
    this.creating.emit(false);
  }

  constructor(private roomsService:RoomsService) { }

  ngOnInit() {
    this.takeDevice = this.type=="editDevice"?this.takeDevice:{title:"title",id:null,value:0,type:"checkbox",minValue:0,maxValue:100,ico:""};
    this.getIcos();
      this.editForm = new FormGroup({
        type: new FormControl(this.takeDevice.type,Validators.required),
        value:new FormControl(this.takeDevice.value,Validators.required),
        minValue:new FormControl(this.takeDevice.minValue),
        maxValue: new FormControl(this.takeDevice.maxValue),
        ico: new FormControl(this.takeDevice.ico||this.ico,Validators.required),
        title: new FormControl(this.takeDevice.title,Validators.required)});
    }
    



  setIco(event){
    this.ico=event.target.value;
  }

  getIcos(){
    this.roomsService.getIcos().subscribe(icos =>{
      this.icos=icos;
      if(this.type=="addDevice")
      {
        this.ico=this.icos[0].src;
        this.takeDevice.ico=this.ico;
        this.editForm.controls['ico'].setValue(this.ico);
      }
      else
      {
        this.ico=this.takeDevice.ico;
      }  
    });
    
  }
  editDevice(data){
    let device = this.takeDevice;
    this.editedDevice.emit({data,device});
    this.onClose();
  }
}
