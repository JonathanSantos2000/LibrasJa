export class Sinais {
  _id!: string;
  SinTit!: string;
  SinDes!: string;
  SinAut!: string;
  SinAutNom!: string;
  SinLink!: string;
  SinCats!: ICategorias[];
}

interface ICategorias {
  SinCatId: string;
  SinCatNon: string;
}
