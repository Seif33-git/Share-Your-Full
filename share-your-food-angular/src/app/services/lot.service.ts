import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Lot} from "../model/lot";
@Injectable({
  providedIn: 'root'
})
export class LotHttpService {

  lots: Array<Lot>;

  constructor(private http: HttpClient) {
    this.load()
  }

  findAll(): Array<Lot> {
    return this.lots;
  }

  findById(id: number): Observable<Lot> {
    return this.http.get<Lot>("http://localhost:8080/rest/lot/" + id);
  }

  create(lot: Lot) {

    this.http.post<Lot>("http://localhost:8080/rest/lot", lot).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  modify(lot: Lot): Observable<Lot> {

    return this.http.put<Lot>("http://localhost:8080/rest/lot/" + lot.id, lot);

  }

  deleteById(id: number) {
    this.http.delete("http://localhost:8080/rest/lot/" + id).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  load() {
    this.http.get<Array<Lot>>("http://localhost:8080/rest/lot").subscribe(resp => {
      this.lots = resp;
    }, error => console.log(error))
  }
}
