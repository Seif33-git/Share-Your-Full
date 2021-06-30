

export class pageDonneurDTO {
  id: number;
  dtMiseEnLigne: string;
  nombreLot: number;
  creneau: string;
  commentaire: string
  destinataire: string;

  constructor(id?: number, dtMiseEnligne?: string, nombreLot?: number, creneau?: string, commentaire?: string, destinataire?: string) {
    this.id=id!;
    this.dtMiseEnLigne=dtMiseEnligne!;
    this.nombreLot=nombreLot!;
    this.creneau=creneau!;
    this.commentaire=commentaire!;
    this.destinataire=destinataire!;
  }
}
