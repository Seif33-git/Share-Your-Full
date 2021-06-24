import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Utilisateur} from "../model/utilisateur";
@Injectable({
  providedIn: 'root'
})
export class UtilisateurHttpService {

  utilisateurs: Array<Utilisateur>;

  constructor(private http: HttpClient) {
    this.load()
  }

  findAll(): Array<Utilisateur> {
    return this.utilisateurs;
  }

  findById(id: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>("http://localhost:8080/rest/utilisateur/" + id);
  }

  create(utilisateur: Utilisateur) {

    this.http.post<Utilisateur>("http://localhost:8080/rest/utilisateur", utilisateur).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  modify(utilisateur: Utilisateur): Observable<Utilisateur> {

    return this.http.put<Utilisateur>("http://localhost:8080/rest/utilisateur/" + utilisateur.id, utilisateur);

  }

  deleteById(id: number) {
    this.http.delete("http://localhost:8080/rest/utilisateur/" + id).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  load() {
    this.http.get<Array<Utilisateur>>("http://localhost:8080/rest/utilisateur").subscribe(resp => {
      this.utilisateurs = resp;
    }, error => console.log(error))
  }
}
