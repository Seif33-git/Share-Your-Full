import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Entite} from "../model/entite";
@Injectable({
  providedIn: 'root'
})
export class EntiteHttpService {

  entites: Array<Entite>;

  constructor(private http: HttpClient) {
    this.load()
  }

  findAll(): Array<Entite> {
    return this.entites;
  }

  findById(id: number): Observable<Entite> {
    return this.http.get<Entite>("http://localhost:8080/rest/entite/" + id);
  }

  create(entite: Entite) {

    this.http.post<Entite>("http://localhost:8080/rest/entite", entite).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  modify(entite: Entite): Observable<Entite> {

    return this.http.put<Entite>("http://localhost:8080/rest/entite/" + entite.id, entite);

  }

  deleteById(id: number) {
    this.http.delete("http://localhost:8080/rest/entite/" + id).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  load() {
    this.http.get<Array<Entite>>("http://localhost:8080/rest/entite").subscribe(resp => {
      this.entites = resp;
    }, error => console.log(error))
  }
}
