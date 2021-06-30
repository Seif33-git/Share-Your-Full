import {Lot} from "./lot";

export class Don {
  id: number;
  version: number = 0;
  dateDeMiseEnLigne: Date = new Date();
  creneau: string;
  commentaire: string;
  destinataire: string;
  lot: Array<Lot> = new Array<Lot>();

  constructor(id?: number, version?: number, creneau?: string, commentaire?: string, destinataire?: string) {
    this.id = id!;
    this.version = version;
    this.creneau = creneau!;
    this.commentaire = commentaire!;
    this.destinataire= destinataire;
  }

}
