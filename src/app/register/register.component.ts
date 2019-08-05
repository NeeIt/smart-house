import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { User } from "../Types/user";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {

  private _step = 1;
  private registration=false;
  private login=true;

  users:User[];



  constructor() {}


  public set step(x: number) {
    this._step = x;
  }


  ngOnInit() {
    this.initForm();
  }

  initForm() {
  }

  back(){
    this.login=true;
    this.registration=false;
  }
  register(){
    this.login=false;
    this.registration=true;
  }

  logIn(){
    //авторизация

  }
}
