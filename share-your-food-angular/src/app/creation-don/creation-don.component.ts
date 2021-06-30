import { Component, OnInit } from '@angular/core';
import {Don} from "../model/don";
import {DonHttpService} from "../services/don.service";
import {Lot} from "../model/lot";
import {LotHttpService} from "../services/lot.service";
import {ProduitLotHttpService} from "../services/produit-lot.service";
import {ProduitLot} from "../model/produitLot";
import {Router} from "@angular/router";
import {Produit} from "../model/produit";
import {ProduitHttpService} from "../services/produit.service";

@Component({
  selector: 'app-creation-don',
  templateUrl: './creation-don.component.html',
  styleUrls: ['./creation-don.component.scss']
})
export class CreationDonComponent implements OnInit {

  donForm: Don = new Don();
  lotForm: Lot = null;
  lotDonsEnCours:  Array<Lot> = new Array<Lot>();
  produitLotForm: ProduitLot = new ProduitLot();
  produitLotForms: Array<ProduitLot> = new Array<ProduitLot>();
  produitForm: Produit = new Produit();
  categorieProduit: string = "FRAIS" ;
  produitByCategorie: Array<Produit> ;

  /* Enumérations :*/
  types: Array<String> = new Array<String>();
  statuts: Array<String> = new Array<String>();

  constructor(private donService: DonHttpService, private lotService: LotHttpService,  private produitLotService: ProduitLotHttpService,private produitService: ProduitHttpService, private route: Router ) {
  }

  ngOnInit(): void {
 /*   this.lotDonsEnCours.push(this.lotForm);*/
    this.produitLotForms.push(this.produitLotForm);
    this.listProduit(this.categorieProduit);
  }

  listType(): Array<string> {
    return this.produitService.types;
  }

  listLot(): Array<Lot> {
    return this.lotService.findAll();
  }

  listProduit(categorieProduit : string){
   this.produitService.findAllByCategorie(categorieProduit).subscribe(resp => {
     this.produitByCategorie=resp;
    }, error => console.log(error));
  }

  /*Relatif à un Don */

  saveDon() {
    if (!this.donForm.id) {
      this.donService.create(this.donForm);
    } else {
      this.donService.modify(this.donForm).subscribe(resp => {
        this.donService.load();
      }, error => console.log(error));
    }


    this.donForm = new Don();
  }

  cancelDon() {
    this.donForm = null;
  }

  /*Relatif à un Lot */

  addProduitLot() {
    this.produitLotForms.push (new ProduitLot());
  }

  deleteProduitLot(){
    this.produitLotForms.splice(-1,1);
  }

  addLot() {
    this.lotForm = new Lot();
  }

  saveLot() {
    this.lotForm.produitLots = this.produitLotForms;
    this.lotDonsEnCours.push(this.lotForm);
    this.produitLotForms = new Array<ProduitLot>();
    this.produitLotForms.push (new ProduitLot());
    this.donForm.lot = this.lotDonsEnCours;

    this.lotForm = null;
  }

  editLot(index: number) {
    this.lotForm = this.lotDonsEnCours[index];
    this.produitLotForms = this.lotForm.produitLots;
    this.deleteLot(index);
  }

  cancelLot() {
    this.lotForm = null;
    this.produitLotForm = null;
  }

  deleteLot(index: number){
   this.lotDonsEnCours.splice(index,1);
  }

  /*Relatif à un Produit */

  addProduit() {
    this.produitForm = new Produit();
  }

  saveProduit(){
    this.produitService.create(this.produitForm).subscribe(resp => {
      this.listProduit(this.categorieProduit);
    }, error => console.log(error));
    this.produitForm = new Produit();
  }

  actualisationProduit(){
    this.listProduit(this.categorieProduit);
  }

  cancelProduit() {
    this.produitForm = null;
  }
}

