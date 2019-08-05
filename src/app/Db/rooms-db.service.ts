import { Injectable } from '@angular/core';
import { InMemoryDbService, ResponseOptions } from 'angular-in-memory-web-api';
import { Room } from '../Types/room';
import { Device } from '../Types/device';
import { Ico } from '../Types/Ico';

@Injectable({
  providedIn: 'root'
})
export class RoomsDbService implements InMemoryDbService{
  createDb() {
    const icos:Ico[] = [
      {title:'Рабочая лампа',id:10000,src:"lamp.png"},
      {title:'Маленькая лампа',id:10001,src:"lamp1.png"},
      {title:'Большая лампа',id:10002,src:"lamp2.png"},
      {title:'Настольная лампа 2',id:10003,src:"lamp3.png"},
      {title:'Кондиционер',id:10004,src:"air-conditioner.png"},
      {title:'Уличный кондиционер',id:10005,src:"air-conditioning.png"},
      {title:'Вентилятор',id:10006,src:"fan.png"},
      {title:'Чайник',id:10007,src:"tea.png"},
    ];
    const rooms:Room[] = [
      {title:"Кухня",air:10,temperature:26,img:"kitchen.jpg",devices:[
        {id: 100, title:"Лампа Настольная",type:"multi",value:55,ico:"lamp1.png"},
        {id: 101, title:"Кондиционер",type:"multi",value:26,minValue:-10,maxValue:40,ico:"air-conditioner.png"},
        {id: 102, title:"Чайник",type:"checkbox",value:"off",ico:"tea.png"}
      ],id:1},
      {title:"Спальня",air:12,temperature:24,img:"bedroom.jpg",devices:[
        {id: 100, title:"Вентилятор",type:"multi",value:0,minValue:0,maxValue:5,ico:"fan.png"},
        {id: 101, title:"Лампа",type:"checkbox",value:"off",ico:"lamp3.png"}
      ],id:2},
      {title:"Ванная",air:31,temperature:25,img:"bathroom.jpg",devices:[
        {id: 100, title:"Кондиционер",type:"multi",value:26,minValue:-10,maxValue:40,ico:"air-conditioning.png"}
      ],id:3}
    ];
    return {rooms, icos};
  }

  genId<T extends Room | Device>(item: T[]): number {
    if (item instanceof Device) 
      return item.length > 0 ? Math.max(...item.map(room=> room.id)) + 1 :100;  
    else if(item instanceof Room)
      return item.length > 0 ? Math.max(...item.map(room=> room.id)) + 1 : 1;
    else if(item instanceof Ico)
      return item.length > 0 ? Math.max(...item.map(room=> room.id)) + 1 : 10000;  
  }

}
