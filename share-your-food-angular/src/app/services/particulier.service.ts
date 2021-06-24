import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Particulier} from "../model/particulier";
@Injectable({
  providedIn: 'root'
})
export class ParticulierHttpService {

  particuliers: Array<Particulier>;

  constructor(private http: HttpClient) {
    this.load()
  }

  findAll(): Array<Particulier> {
    return this.particuliers;
  }

  findById(id: number): Observable<Particulier> {
    return this.http.get<Particulier>("http://localhost:8080/rest/particulier/" + id);
  }

  create(particulier: Particulier) {
    if(particulier.evaluation && !particulier.evaluation.id) {
      particulier.evaluation = null;
    }
    this.http.post<Particulier>("http://localhost:8080/rest/particulier", particulier).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  modify(particulier: Particulier): Observable<Particulier> {
    if(particulier.evaluation && !particulier.evaluation.id) {
      particulier.evaluation = null;
    }
    return this.http.put<Particulier>("http://localhost:8080/rest/particulier/" + particulier.id, particulier);

  }

  deleteById(id: number) {
    this.http.delete("http://localhost:8080/rest/particulier/" + id).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  load() {
    this.http.get<Array<Particulier>>("http://localhost:8080/rest/particulier").subscribe(resp => {
      this.particuliers = resp;
    }, error => console.log(error))
  }
}
