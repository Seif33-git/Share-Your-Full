import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'share-your-food-angular';
  flagConnexion:boolean;
 connexion(){
   sessionStorage.setItem("idEntite","11");
 }
  sessionencours(){
  return sessionStorage.getItem("utilisateur");
  }
  ConnecteQuestionMark(){
   if(sessionStorage.getItem("utilisateur")){
     return true;
   }
   return false  }

  deconnexion() {
    sessionStorage.clear()
  }
}
