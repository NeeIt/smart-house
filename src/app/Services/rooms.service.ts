import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError, map, tap, debounceTime } from "rxjs/operators";

import { Room } from "../Types/room";
import { Ico } from "../Types/Ico";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class RoomsService {
  private roomsUrl = "api/rooms";
  private icosUrl = "api/icos";

  constructor(private http: HttpClient) {}

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      alert(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getRooms(): Observable<Room[]> {
    return this.http
      .get<Room[]>(this.roomsUrl)
      .pipe(catchError(this.handleError<Room[]>("getRooms", [])));
  }

  getRoom(id: number): Observable<Room> {
    const url = `${this.roomsUrl}/${id}`;
    return this.http
      .get<Room>(url)
      .pipe(catchError(this.handleError<Room>(`getRoom id=${id}`)));
  }
  updateRoom(room: Room) {
    return this.http
      .put(this.roomsUrl, room, httpOptions)
      .pipe(catchError(this.handleError<any>("updateHero")));
  }

  getIcos(): Observable<Ico[]> {
    return this.http
      .get<Ico[]>(this.icosUrl)
      .pipe(catchError(this.handleError<Ico[]>("getIcos", [])));
  }

  getIco(id: number): Observable<Ico> {
    const url = `${this.icosUrl}/${id}`;
    return this.http
      .get<Ico>(url)
      .pipe(catchError(this.handleError<Ico>(`getIco id=${id}`)));
  }
  deleteRoom({ id }) {
    const url = `${this.roomsUrl}/${id}`;
    return this.http
      .delete<Room>(url)
      .pipe(catchError(this.handleError<Room>(`deleteRoom id=${id}`)));
  }
  addRoom(room) {
    return this.http
      .post<Room>(this.roomsUrl, room, httpOptions)
      .pipe(catchError(this.handleError<Room>(`getRoom room`)));
  }
  searchRoom(term: string): Observable<Room[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http
      .get<Room[]>(`${this.roomsUrl}/?title=${term}`)
      .pipe(debounceTime(200),catchError(this.handleError<Room[]>("searchRoom", [])));
  }
}
