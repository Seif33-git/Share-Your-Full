import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'share-your-food-angular';
 connexion(){
   sessionStorage.setItem("idEntite","3");
 }
  sessionencours(){
  return sessionStorage.getItem("utilisateur");
  }

}
