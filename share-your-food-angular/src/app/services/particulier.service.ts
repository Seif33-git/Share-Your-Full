import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Particulier} from "../model/particulier";
import {AppConfigService} from "../app-config.service";
@Injectable({
  providedIn: 'root'
})
export class ParticulierHttpService {

  particuliers: Array<Particulier>;

  constructor(private http: HttpClient, private appConfig: AppConfigService) {
    this.load()
  }

  findAll(): Array<Particulier> {
    return this.particuliers;
  }

  findById(id: number): Observable<Particulier> {
    return this.http.get<Particulier>("particulier/" + id);
  }

  create(particulier: Particulier) {

    this.http.post<Particulier>("particulier", particulier).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  modify(particulier: Particulier): Observable<Particulier> {

    return this.http.put<Particulier>("particulier/" + particulier.id, particulier);

  }

  deleteById(id: number) {
    this.http.delete("particulier/" + id).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  load() {
    this.http.get<Array<Particulier>>("particulier").subscribe(resp => {
      this.particuliers = resp;
    }, error => console.log(error))
  }
}
