import { Room } from './Room';

export class User{
    name:string;
    phone:string;
    email:string;
    password:string;
    rooms?:Room[];
}