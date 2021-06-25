import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Message} from "../model/message";
import {AppConfigService} from "../app-config.service";
@Injectable({
  providedIn: 'root'
})
export class MessageHttpService {

  messages: Array<Message>;

  constructor(private http: HttpClient, private appConfig: AppConfigService) {
    this.load()
  }

  findAll(): Array<Message> {
    return this.messages;
  }

  findById(id: number): Observable<Message> {
    return this.http.get<Message>(this.appConfig.backEndUrl + "message/" + id);
  }

  create(message: Message) {

    this.http.post<Message>(this.appConfig.backEndUrl + "message", message).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  modify(message: Message): Observable<Message> {

    return this.http.put<Message>(this.appConfig.backEndUrl + "message/" + message.id, message);

  }

  deleteById(id: number) {
    this.http.delete(this.appConfig.backEndUrl + "message/" + id).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  load() {
    this.http.get<Array<Message>>(this.appConfig.backEndUrl + "message").subscribe(resp => {
      this.messages = resp;
    }, error => console.log(error))
  }
}
