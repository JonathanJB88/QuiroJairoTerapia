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

export interface Post {
  title: string;
  slug: string;
  publishedAt: string;
  mainImage: MainImageType;
  body: BlockContentType[];
  authorName: string;
  authorImage: ImageType;
}
