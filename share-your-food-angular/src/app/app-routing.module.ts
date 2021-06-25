import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {Accueil1Component} from "./accueil1/accueil1.component";
import {CreationDonComponent} from "./creation-don/creation-don.component";
import {CreationLotComponent} from "./creation-lot/creation-lot.component";

const routes: Routes = [
  {path: "accueil1", component: Accueil1Component},
  {path: '', redirectTo: 'accueil1', pathMatch: 'full'},
  {path: 'don', component: CreationDonComponent},
  {path:'lot', component: CreationLotComponent},
  {path: '**', component: PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
