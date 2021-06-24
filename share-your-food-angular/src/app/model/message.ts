
export class Message {
  id: number;
  contenu: string;
  donneur: boolean;
  dtEnvoi: string;

  constructor(id?: number, contenu?: string, donneur?: boolean, dtEnvoi?: string) {
    this.id=id!;
    this.contenu=contenu!;
    this.donneur=donneur!;
    this.dtEnvoi=dtEnvoi!;
  }

}
