

export class Demande {
  id: number;
  dtDemande: string;
  statutNotif: string;

  constructor(id?: number, dtDemande?: string, statutNotif?: string) {
    this.id=id!;
    this.dtDemande=dtDemande!;
    this.statutNotif=statutNotif!;
  }
}
