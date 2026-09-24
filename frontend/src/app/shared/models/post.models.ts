export class Post {
  _id!: string;
  PostTit!: string;
  PostDes!: string;
  PostAut!: string;
  PostAutNom!: string;
  PostLink!: string;
  PostCats!: ICategorias[];
}

interface ICategorias {
  PostCatId: string;
  PostCatNon: string;
}
