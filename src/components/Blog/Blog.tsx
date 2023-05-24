import { memo, useState } from 'react';
import { AllBlogPosts, LatestPosts } from '@/components';
import { Id, Post } from '@/interfaces';

interface BlogProps {
  posts: Post[];
  scrollToSection: (id: Id) => void;
}

export const Blog = ({ posts, scrollToSection }: BlogProps) => {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
    scrollToSection('consejos');
  };

  const MemoizedAllBlogPosts = memo(AllBlogPosts);
  const MemoizedLatestPosts = memo(LatestPosts);

  return showAll ? (
    <MemoizedAllBlogPosts handleLatestPosts={toggleShowAll} posts={posts} />
  ) : (
    <MemoizedLatestPosts handleAllPosts={toggleShowAll} posts={posts} />
  );
};
