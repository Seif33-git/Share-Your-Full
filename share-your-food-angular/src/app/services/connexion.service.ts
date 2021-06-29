import {Injectable, Optional} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ConnexionDTO} from "../model/connexionDTO";
import {AppConfigService} from "../app-config.service";
@Injectable({
  providedIn: 'root'
})
export class ConnexionHttpService {


  constructor(private http: HttpClient, private appConfig: AppConfigService) {
  }

  connexionAuth(conn: ConnexionDTO): Observable<ConnexionDTO> {
    console.log(conn)
    return this.http.post<ConnexionDTO>(this.appConfig.backEndUrl + "utilisateur/auth", conn);
  }
}
