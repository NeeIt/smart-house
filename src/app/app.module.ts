import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule }    from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { RoomsDbService } from './Db/rooms-db.service';
import { RoomsComponent } from './rooms/rooms.component';
import { HeaderComponent } from './header/header.component';
import { RoomComponent } from './room/room.component';
import { ModalComponent } from './modal/modal.component';
import { ModalRoomComponent } from './modal-room/modal-room.component';
import { DevicesComponent } from './devices/devices.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    RoomsComponent,
    HeaderComponent,
    RoomComponent,
    ModalComponent,
    ModalRoomComponent,
    DevicesComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(RoomsDbService,{dataEncapsulation:false})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
