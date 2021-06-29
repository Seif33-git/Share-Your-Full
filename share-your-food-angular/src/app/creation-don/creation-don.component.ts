import { Component, OnInit } from '@angular/core';
import {Don} from "../model/don";
import {DonHttpService} from "../services/don.service";
import {ProduitLot} from "../model/produitLot";
import {Lot} from "../model/lot";
import {LotHttpService} from "../services/lot.service";

@Component({
  selector: 'app-creation-don',
  templateUrl: './creation-don.component.html',
  styleUrls: ['./creation-don.component.scss']
})
export class CreationDonComponent implements OnInit {

  donForm: Don = null;
  LotForm: ProduitLot = new ProduitLot();
  LotForms: Array<ProduitLot> = new Array<ProduitLot>();
  statuts: Array<String> = new Array<String>();

  constructor(private donService: DonHttpService,private lotService: LotHttpService ) {
  }

  ngOnInit(): void {
  }

  list(): Array<Don> {
    return this.donService.findAll();
  }

  listLot(): Array<Lot> {
    return this.lotService.findAll();
  }

  listStatut(): Array<string> {
    return this.lotService.statuts;
  }

  add() {
    this.donForm = new Don();
  }

  // editLot(id: number) {
  //   this.lotService.findById(id).subscribe(resp=> {
  //     this.lotForm = resp;
  //   }, err => console.log(err));
  // }

  deleteLot(){
    this.LotForms.splice(-1,1);
  }

  edit(id: number) {
    this.donService.findById(id).subscribe(resp=> {
      this.donForm = resp;
    }, err => console.log(err));
  }

  save() {
    if (!this.donForm.id) {
      this.donService.create(this.donForm);
    } else {
      this.donService.modify(this.donForm).subscribe(resp => {
        this.donService.load();
      }, error => console.log(error));
    }
    this.donForm = null;
  }

  cancel() {
    this.donForm = null;
  }

  delete(id: number) {
    this.donService.deleteById(id);
  }
}

