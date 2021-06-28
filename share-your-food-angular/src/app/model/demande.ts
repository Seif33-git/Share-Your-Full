import {Lot} from "./lot";

export class Demande {
  id: number;
  dtDemande: string;
  statutNotif: string;
  lot : Lot;

  constructor(id?: number, dtDemande?: string, statutNotif?: string) {
    this.id=id!;
    this.dtDemande=dtDemande!;
    this.statutNotif=statutNotif!;
  }
}
