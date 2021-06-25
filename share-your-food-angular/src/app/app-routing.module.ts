import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {Accueil1Component} from "./accueil1/accueil1.component";
import {PageDonneurComponent} from "./page-donneur/page-donneur.component";

const routes: Routes = [
  {path: "accueil1", component: Accueil1Component},
  {path: 'donner', component: PageDonneurComponent},
  {path: '', redirectTo: 'accueil1', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
