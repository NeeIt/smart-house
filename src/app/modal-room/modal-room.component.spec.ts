import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRoomComponent } from './modal-room.component';

describe('ModalRoomComponent', () => {
  let component: ModalRoomComponent;
  let fixture: ComponentFixture<ModalRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
