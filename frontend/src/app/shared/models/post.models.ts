export class Post {
  _id!: string;
  PostTit!: string;
  PostDes!: string;
  PostAut!: string;
  PostAutNom!: string;
  PostLink!: string;
  PostCats!: ICategorias[];
  PostDatCad!: Date;
  PostImg!: string;
}

interface ICategorias {
  PostCatId: string;
  PostCatNom: string;
}
