import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomComponent } from './room/room.component';
import { DevicesComponent } from './devices/devices.component';


const routes: Routes = [{path:"",redirectTo:"/login",pathMatch:"full"},
{path:"login",component:RegisterComponent},
{path:"rooms",component:RoomsComponent},
{path:"devices",component:DevicesComponent},
{path:"room/:id",component:RoomComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
