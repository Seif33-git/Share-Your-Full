import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Lot} from "../model/lot";
import {AppConfigService} from "../app-config.service";
@Injectable({
  providedIn: 'root'
})
export class LotHttpService {

  lots: Array<Lot>;
  statuts: Array<string>

  constructor(private http: HttpClient,private appConfig: AppConfigService) {
    this.load()
  }

  findAll(): Array<Lot> {
    return this.lots;
  }

  findById(id: number): Observable<Lot> {
    return this.http.get<Lot>(this.appConfig.backEndUrl + "lot/" + id);
  }

  create(lot: Lot) {

    this.http.post<Lot>(this.appConfig.backEndUrl + "lot", lot).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  modify(lot: Lot): Observable<Lot> {

    return this.http.put<Lot>(this.appConfig.backEndUrl + "lot/" + lot.id, lot);

  }

  deleteById(id: number) {
    this.http.delete(this.appConfig.backEndUrl + "lot/" + id).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  load() {
    this.http.get<Array<Lot>>(this.appConfig.backEndUrl + "lot").subscribe(resp => {
      this.lots = resp;
    }, error => console.log(error))
    this.appConfig.findAllStatut().subscribe(resp => {
      this.statuts = resp;
    }, error => console.log(error));
  }
}
