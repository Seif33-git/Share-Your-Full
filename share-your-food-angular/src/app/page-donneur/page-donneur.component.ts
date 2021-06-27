import { Component, OnInit } from '@angular/core';
import {Lot} from "../model/lot";
import {Don} from "../model/don";
import {LotHttpService} from "../services/lot.service";

@Component({
  selector: 'app-page-donneur',
  templateUrl: './page-donneur.component.html',
  styleUrls: ['./page-donneur.component.scss']
})
export class PageDonneurComponent implements OnInit {

  lotForm: Lot = null;
  donForm: Don = null;
  historique: Don = null;

  constructor(private lotService: LotHttpService) { }

  ngOnInit(): void {
  }

  listLot(): Array<Lot> {
    return this.lotService.findAll();
  }

  add() {
    this.donForm = new Don();
  }

  edit(id: number) {
    this.lotService.findById(id).subscribe(resp => {
      this.lotForm = resp;
    }, error => console.log(error));
  }

  save() {
    if (!this.lotForm.id) {
      this.lotService.create(this.lotForm);
    } else {
      this.lotService.modify(this.lotForm);
    }
    this.lotForm = null;
  }

  cancel() {
    this.lotForm = null;
  }

  delete(id: number) {
    this.lotService.deleteById(id);
  }

  afficheHistorique() {
    this.historique = new Don();
  }

}
