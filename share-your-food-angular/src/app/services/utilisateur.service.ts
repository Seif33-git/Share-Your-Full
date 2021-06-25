import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Utilisateur} from "../model/utilisateur";
import {AppConfigService} from "../app-config.service";
@Injectable({
  providedIn: 'root'
})
export class UtilisateurHttpService {

  utilisateurs: Array<Utilisateur>;

  constructor(private http: HttpClient, private appConfig: AppConfigService) {
    this.load()
  }

  findAll(): Array<Utilisateur> {
    return this.utilisateurs;
  }

  findById(id: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>("utilisateur/" + id);
  }

  create(utilisateur: Utilisateur) {

    this.http.post<Utilisateur>("utilisateur", utilisateur).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  modify(utilisateur: Utilisateur): Observable<Utilisateur> {

    return this.http.put<Utilisateur>("utilisateur/" + utilisateur.id, utilisateur);

  }

  deleteById(id: number) {
    this.http.delete("utilisateur/" + id).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  load() {
    this.http.get<Array<Utilisateur>>("utilisateur").subscribe(resp => {
      this.utilisateurs = resp;
    }, error => console.log(error))
  }
}
