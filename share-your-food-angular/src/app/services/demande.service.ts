import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Demande} from "../model/demande";
import {AppConfigService} from "../app-config.service";
@Injectable({
  providedIn: 'root'
})
export class DemandeHttpService {

  demandes: Array<Demande>;

  constructor(private http: HttpClient, private appConfig: AppConfigService) {
    this.load()
  }

  findAll(): Array<Demande> {
    return this.demandes;
  }

  findById(id: number): Observable<Demande> {
    return this.http.get<Demande>("demande/" + id);
  }

  create(demande: Demande) {

    this.http.post<Demande>("demande", demande).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  modify(demande: Demande): Observable<Demande> {

    return this.http.put<Demande>("demande/" + demande.id, demande);

  }

  deleteById(id: number) {
    this.http.delete("demande/" + id).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  load() {
    this.http.get<Array<Demande>>("demande").subscribe(resp => {
      this.demandes = resp;
    }, error => console.log(error))
  }
}
