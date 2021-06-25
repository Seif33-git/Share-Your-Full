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

  findAllCategorie(): Observable<Array<string>> {
    return this.http.get<Array<string>>(this.backEndUrl + "categories");
  }

  findAllType(): Observable<Array<string>> {
    return this.http.get<Array<string>>(this.backEndUrl + "types");
  }

  findAllStatut(): Observable<Array<string>> {
    return this.http.get<Array<string>>(this.backEndUrl + "statuts");
  }
}
