import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Entreprise} from "../model/entreprise";
@Injectable({
  providedIn: 'root'
})
export class EntrepriseHttpService {

  entreprises: Array<Entreprise>;

  constructor(private http: HttpClient) {
    this.load()
  }

  findAll(): Array<Entreprise> {
    return this.entreprises;
  }

  findById(id: number): Observable<Entreprise> {
    return this.http.get<Entreprise>("http://localhost:8080/rest/entreprise/" + id);
  }

  create(entreprise: Entreprise) {

    this.http.post<Entreprise>("http://localhost:8080/rest/entreprise", entreprise).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  modify(entreprise: Entreprise): Observable<Entreprise> {

    return this.http.put<Entreprise>("http://localhost:8080/rest/entreprise/" + entreprise.id, entreprise);

  }

  deleteById(id: number) {
    this.http.delete("http://localhost:8080/rest/entreprise/" + id).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  load() {
    this.http.get<Array<Entreprise>>("http://localhost:8080/rest/entreprise").subscribe(resp => {
      this.entreprises = resp;
    }, error => console.log(error))
  }
}
