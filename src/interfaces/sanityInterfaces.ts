interface ImageType {
  _id: string;
  url: string;
}

interface MainImageType {
  asset: ImageType;
  alt: string;
}

export interface MarkDefType {
  _key: string;
  _type: string;
  href: string;
}

export interface ChildType {
  _key: string;
  _type: string;
  text: string;
  marks: string[];
}

export enum BlockType {
  Block = 'block',
  Image = 'image',
}

export enum StyleType {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  Blockquote = 'blockquote',
  Normal = 'normal',
}

export interface BlockContentType {
  _type: BlockType;
  _key: string;
  style: StyleType;
  listItem?: string;
  markDefs: MarkDefType[];
  children: ChildType[];
  level?: number;
  asset?: ImageType;
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
