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
    return this.http.get<Demande>(this.appConfig.backEndUrl + "demande/" + id);
  }

  create(demande: Demande) {

    this.http.post<Demande>(this.appConfig.backEndUrl + "demande", demande).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  modify(demande: Demande): Observable<Demande> {

    return this.http.put<Demande>(this.appConfig.backEndUrl + "demande/" + demande.id, demande);

  }

  accepterDemandeByLotId(idLot: number){
    this.http.get<Demande>(this.appConfig.backEndUrl + "demande/demande-acceptee/" + idLot).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  refuserDemandeByLotId(idLot: number){
    this.http.get<Demande>(this.appConfig.backEndUrl + "demande/demande-refusee/" + idLot).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  deleteById(id: number) {
    this.http.delete(this.appConfig.backEndUrl + "demande/" + id).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  load() {
    this.http.get<Array<Demande>>(this.appConfig.backEndUrl + "demande").subscribe(resp => {
      this.demandes = resp;
    }, error => console.log(error))
  }
}
