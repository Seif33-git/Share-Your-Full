import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Don} from "../model/don";
@Injectable({
  providedIn: 'root'
})
export class DonHttpService {

  dons: Array<Don>;

  constructor(private http: HttpClient) {
    this.load()
  }

  findAll(): Array<Don> {
    return this.dons;
  }

  findById(id: number): Observable<Don> {
    return this.http.get<Don>("http://localhost:8080/rest/don/" + id);
  }

  create(don: Don) {
    if(don.evaluation && !don.evaluation.id) {
      don.evaluation = null;
    }
    this.http.post<Don>("http://localhost:8080/rest/don", don).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  modify(don: Don): Observable<Don> {
    if(don.evaluation && !don.evaluation.id) {
      don.evaluation = null;
    }
    return this.http.put<Don>("http://localhost:8080/rest/don/" + don.id, don);

  }

  deleteById(id: number) {
    this.http.delete("http://localhost:8080/rest/don/" + id).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  load() {
    this.http.get<Array<Don>>("http://localhost:8080/rest/don").subscribe(resp => {
      this.dons = resp;
    }, error => console.log(error))
  }
}
