import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  backEndUrl: string = "http://localhost:8080/rest/";

  constructor(private http: HttpClient) {

  }
  
}
