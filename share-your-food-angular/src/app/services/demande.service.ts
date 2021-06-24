import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Demande} from "../model/demande";
@Injectable({
  providedIn: 'root'
})
export class DemandeHttpService {

  demandes: Array<Demande>;

  constructor(private http: HttpClient) {
    this.load()
  }

  findAll(): Array<Demande> {
    return this.demandes;
  }

  findById(id: number): Observable<Demande> {
    return this.http.get<Demande>("http://localhost:8080/rest/demande/" + id);
  }

  create(demande: Demande) {

    this.http.post<Demande>("http://localhost:8080/rest/demande", demande).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  modify(demande: Demande): Observable<Demande> {

    return this.http.put<Demande>("http://localhost:8080/rest/demande/" + demande.id, demande);

  }

  deleteById(id: number) {
    this.http.delete("http://localhost:8080/rest/demande/" + id).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  load() {
    this.http.get<Array<Demande>>("http://localhost:8080/rest/demande").subscribe(resp => {
      this.demandes = resp;
    }, error => console.log(error))
  }
}
