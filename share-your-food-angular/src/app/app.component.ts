import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'share-your-food-angular';
 connexion(){
   sessionStorage.setItem("idEntite","11");
 }
  sessionencours(){
  return Number(sessionStorage.getItem("idEntite"));
  }

}
