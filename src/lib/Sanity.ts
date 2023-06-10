import { createClient } from 'next-sanity';
import { Post } from '@/interfaces';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: '2023-05-20',
  useCdn: false,
});

const postSelection = `
_id,
title,
'slug': slug.current,
publishedAt,
mainImage{
  asset->{
    _id,
    url
  },
  alt
},
body[]{
  _type,
  _key,
  style,
  listItem,
  markDefs[]{
    _key,
    _type,
    href
  },
  children[]{
    _key,
    _type,
    text,
    marks[]
  },
  level,
  asset->{
    _id,
    url
  },
},
author->{
  name,
 'avatar': image.asset->url,
  'bio': bio[0].children[0].text,
  'slug': slug.current
},
'categories': categories[]->{
  title,
  _id,
}
`;

export const getAllPosts = async (): Promise<Post[]> => {
  const posts = await sanityClient.fetch<Post[]>(
    `*[_type == "post"]{${postSelection}} | order(publishedAt desc)`
  );
  return posts;
};

export const getPostBySlug = async (slug: string): Promise<Post> => {
  const post = await sanityClient.fetch<Post>(
    `*[_type == "post" && slug.current == $slug][0]{${postSelection}}`,
    {
      slug,
    }
  );
  return post;
};
