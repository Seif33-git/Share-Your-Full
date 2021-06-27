export class Entite{
  id:number;
  version:number;
  nom:string;
  donneur:boolean;
  beneficiaire: boolean;

  constructor(id?:number,version?:number ,nom?:string ,donneur?:boolean ,beneficiaire?:boolean) {
    this.id=id;
    this.version=version;
    this.nom=nom;
    this.donneur=donneur;
    this.beneficiaire=beneficiaire;
  }

}
