import { Component, OnInit } from '@angular/core';
import {Don} from "../model/don";
import {DonHttpService} from "../services/don.service";

@Component({
  selector: 'app-creation-don',
  templateUrl: './creation-don.component.html',
  styleUrls: ['./creation-don.component.scss']
})
export class CreationDonComponent implements OnInit {

  donForm: Don = null;

  constructor(private donService: DonHttpService) {
  }

  ngOnInit(): void {
  }

  list(): Array<Don> {
    return this.donService.findAll();
  }

  add() {
    this.donForm = new Don();
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

