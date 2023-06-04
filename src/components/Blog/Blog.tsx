import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { AllBlogPosts, LatestPosts } from '@/components';
import { MenuItems, Post } from '@/interfaces';

interface BlogProps {
  posts: Post[];
  scrollToSection: (id: MenuItems) => void;
}

const BlogSection = ({ posts, scrollToSection }: BlogProps) => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      const savedState = localStorage.getItem('showAllState');
      if (savedState) setShowAll(JSON.parse(savedState));
      firstUpdate.current = false;
    } else {
      localStorage.setItem('showAllState', JSON.stringify(showAll));
    }
  }, [showAll]);

  const toggleShowAll = () => {
    setShowAll(!showAll);
    scrollToSection(MenuItems.CONSEJOS);
  };

  const MemoizedAllBlogPosts = useMemo(
    () => <AllBlogPosts handleLatestPosts={toggleShowAll} posts={posts} />,
    [toggleShowAll, posts]
  );
  const MemoizedLatestPosts = useMemo(
    () => <LatestPosts handleAllPosts={toggleShowAll} posts={posts} />,
    [toggleShowAll, posts]
  );

  return showAll ? MemoizedAllBlogPosts : MemoizedLatestPosts;
};

export const Blog = memo(BlogSection);
