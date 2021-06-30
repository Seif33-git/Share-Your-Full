import {Lot} from "./lot";
import {Entite} from "./entite";
export class Demande {
  id: number;
  dtDemande: string;
  statutNotif: string;
  lot: Lot;
  entite:Entite;

  constructor( statutNotif?: string, lot?: Lot, entite?:Entite ,dtDemande?: string) {
    this.lot = lot!;
    this.dtDemande=dtDemande!;
    this.entite = entite!;
    this.statutNotif=statutNotif!;
  }
}
