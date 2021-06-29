import { Component, OnInit } from '@angular/core';
import {Don} from "../model/don";
import {DonHttpService} from "../services/don.service";
import {Lot} from "../model/lot";
import {LotHttpService} from "../services/lot.service";
import {ProduitLotHttpService} from "../services/produit-lot.service";
import {ProduitLot} from "../model/produitLot";
import {Router} from "@angular/router";

@Component({
  selector: 'app-creation-don',
  templateUrl: './creation-don.component.html',
  styleUrls: ['./creation-don.component.scss']
})
export class CreationDonComponent implements OnInit {

  donForm: Don = new Don();
  lotForm: Lot = new Lot();
  lotForms:  Array<Lot> = new Array<Lot>();
  produitLotForm: ProduitLot = new ProduitLot();
  statuts: Array<String> = new Array<String>();

  constructor(private donService: DonHttpService, private lotService: LotHttpService,  private produitLotService: ProduitLotHttpService, private route: Router ) {
  }

  ngOnInit(): void {
    this.lotForms.push(this.lotForm);
  }

  list(): Array<Don> {
    return this.donService.findAll();
  }

  listLot(): Array<Lot> {
    return this.lotService.findAll();
  }

  addLot() {
    this.lotForms.push (new Lot());
  }

  newLot(){
   this.route.navigate(['/lot']);
  }
  editLot(id: number) {
    this.lotService.findById(id).subscribe(resp=> {
      this.lotForm = resp;
    }, err => console.log(err));
    this.produitLotService.findById(id).subscribe(resp=> {
      this.produitLotForm = resp;
    }, err => console.log(err));
  }

  deleteLot(){
    this.lotForms.splice(1,1);
  }

  editDon(id: number) {
    this.donService.findById(id).subscribe(resp=> {
      this.donForm = resp;
    }, err => console.log(err));
  }

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

}

