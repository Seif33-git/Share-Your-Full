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
  lotForms:  Array<Lot> = new Array<Lot>();
  produitLotForm: ProduitLot = new ProduitLot();
  produitLotForms: Array<ProduitLot> = new Array<ProduitLot>();
  produitForm: Produit = new Produit();

  /* Enumérations :*/
  types: Array<String> = new Array<String>();
  statuts: Array<String> = new Array<String>();

  constructor(private donService: DonHttpService, private lotService: LotHttpService,  private produitLotService: ProduitLotHttpService,private produitService: ProduitHttpService, private route: Router ) {
  }

  ngOnInit(): void {
    this.lotForms.push(this.lotForm);
    this.produitLotForms.push(this.produitLotForm);
  }

  listType(): Array<string> {
    return this.produitService.types;
  }

  listLot(): Array<Lot> {
    return this.lotService.findAll();
  }

  listProduit(): Array<Produit> {
    return this.produitService.findAll();
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
    this.donForm = null;
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

  ajouterLot(){
    if (!this.donForm.id) {
      this.donService.create(this.donForm);
    } else {
      this.donService.modify(this.donForm).subscribe(resp => {
        this.donService.load();
      }, error => console.log(error));
    }
  }

  newLot(){
   this.route.navigate(['/lot']);
  }

  saveLot() {
    if (!this.lotForm.id) {
      this.lotService.create(this.lotForm);
    } else {
      this.lotService.modify(this.lotForm).subscribe(resp => {
        this.lotService.load();
      }, error => console.log(error));
    }
    this.produitService.create(this.produitForm);
    this.lotForm = null;
  }

  editLot(id: number) {
    this.lotService.findById(id).subscribe(resp=> {
      this.lotForm = resp;
    }, err => console.log(err));
    this.produitLotService.findById(id).subscribe(resp=> {
      this.produitLotForm = resp      ;
    }, err => console.log(err));
  }

  cancelLot() {
    this.lotForm = null;
    this.produitLotForm = null;
  }

  deleteLot(id: number){
    this.lotService.deleteById(id);
  }

  /*Relatif à un Produit */

  addProduit() {
    this.produitForm = new Produit();
  }

  saveProduit(){
    this.produitService.create(this.produitForm);
    this.produitForm = null;
  }

  cancelProduit() {
    this.produitForm = null;
  }
}

