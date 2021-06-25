import {Lot} from "./lot";

export class Don {
  id: number;
  version: number = 0;
  dateDeMiseEnLigne: Date;
  creneau: string;
  commentaire: string;
  destinataire: string;
  produit: Array<Lot> = new Array<Lot>();

  constructor(id?: number, version?: number, dateDeMiseEnLigne?: Date, creneau?: string, commentaire?: string, destinataire?: string) {
    this.id = id!;
    this.version = version;
    this.dateDeMiseEnLigne = dateDeMiseEnLigne!;
    this.creneau = creneau!;
    this.commentaire = commentaire!;
    this.destinataire= destinataire;
  }

}
