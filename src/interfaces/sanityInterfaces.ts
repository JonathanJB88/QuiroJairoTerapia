interface ImageType {
  _id: string;
  url: string;
}

interface MainImageType {
  asset: ImageType;
  alt: string;
}

interface AuthorReferenceType {
  name: string;
  slug: string;
  image: ImageType;
}

interface BlockContentType {
  children: (string | AuthorReferenceType)[];
  _type: string;
  markDefs: any[];
  style: string;
}

export interface AuthorType {
  name: string;
  avatar: string;
  bio: string;
  slug: string;
}

export interface CategoryType {
  title: string;
  _id: string;
}

export interface Post {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  mainImage: MainImageType;
  body: BlockContentType[];
  author: AuthorType;
  categories: CategoryType[];
}
