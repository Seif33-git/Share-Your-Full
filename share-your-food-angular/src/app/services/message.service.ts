import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Message} from "../model/message";
@Injectable({
  providedIn: 'root'
})
export class MessageHttpService {

  messages: Array<Message>;

  constructor(private http: HttpClient) {
    this.load()
  }

  findAll(): Array<Message> {
    return this.messages;
  }

  findById(id: number): Observable<Message> {
    return this.http.get<Message>("http://localhost:8080/rest/message/" + id);
  }

  create(message: Message) {

    this.http.post<Message>("http://localhost:8080/rest/message", message).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  modify(message: Message): Observable<Message> {

    return this.http.put<Message>("http://localhost:8080/rest/message/" + message.id, message);

  }

  deleteById(id: number) {
    this.http.delete("http://localhost:8080/rest/message/" + id).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  load() {
    this.http.get<Array<Message>>("http://localhost:8080/rest/message").subscribe(resp => {
      this.messages = resp;
    }, error => console.log(error))
  }
}
