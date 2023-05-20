import { createClient } from 'next-sanity';
import { Post } from '@/interfaces';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export const sanityClient = createClient({
  projectId,
  dataset,
  useCdn: false,
});

const postSelection = `
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
  ...,
  children[]{
    ...
  }
},
'authorName': author->name,
'authorSlug': author->slug.current,
'authorImage': author->image.asset->url,
`;

export const getAllPosts = async (): Promise<Post[]> => {
  const posts = await sanityClient.fetch<Post[]>(`*[_type == "post"]{${postSelection}} | order(publishedAt desc)`);
  return posts;
};
