import { Device } from './Device';
export class Room{
  title:string;
  air:number;
  temperature:number;
  devices:Device[];
  id:number;
  img?:string;
}