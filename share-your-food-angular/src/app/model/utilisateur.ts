import {Entite} from "./entite";

export class Utilisateur{
  id:number;
  version:number;
  pseudo:string;
  mail:string;
  motDePasse:string;
  messagerieActivation:boolean;
  enable:boolean;

  entite:Entite;

  constructor(id?:number,version?:number,pseudo?:string,mail?:string,motDePasse?:string,messagerieActivation?:boolean,enable?:boolean) {
    this.id=id;
    this.version=version;
    this.pseudo=pseudo;
    this.mail=mail;
    this.motDePasse=motDePasse;
    this.enable=enable;
  }
}
