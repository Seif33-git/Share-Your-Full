import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Don} from "../model/don";
import {AppConfigService} from "../app-config.service";

@Injectable({
  providedIn: 'root'
})
export class DonHttpService {

  dons: Array<Don>;

  constructor(private http: HttpClient, private appConfig: AppConfigService) {
    this.load()
  }

  findAll(): Array<Don> {
    return this.dons;
  }

  findById(id: number): Observable<Don> {
    return this.http.get<Don>(this.appConfig.backEndUrl + "don/" + id);
  }

  create(don: Don) {

    this.http.post<Don>(this.appConfig.backEndUrl + "don", don).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  modify(don: Don): Observable<Don> {

    return this.http.put<Don>(this.appConfig.backEndUrl + "don/" + don.id, don);

  }

  deleteById(id: number) {
    this.http.delete(this.appConfig.backEndUrl + "don/" + id).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  load() {
    this.http.get<Array<Don>>(this.appConfig.backEndUrl + "don").subscribe(resp => {
      this.dons = resp;
    }, error => console.log(error))
  }
}
