import { useEffect, useState, useCallback } from 'react';
import { useDebouncedValue, useForm } from '@/hooks';
import { Post } from '@/interfaces';

interface SearchState {
  query: string;
}

const initialSearchState: SearchState = {
  query: '',
};

const stringContains = (source: string, target: string) => source.toLowerCase().includes(target);

export const useBlogPosts = (posts: Post[]) => {
  const {
    formState: { query },
    onInputChange,
  } = useForm<SearchState>(initialSearchState);
  const debouncedValue = useDebouncedValue<string>(query);
  const [items, setItems] = useState<Post[]>(posts.slice(0, 10));
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    if (items.length >= filteredPosts.length) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      setItems((prevItems) => prevItems.concat(filteredPosts.slice(prevItems.length, prevItems.length + 10)));
    }, 500);
  };

  const applySearchFilter = useCallback(() => {
    const filtered = posts.filter(
      (post) =>
        stringContains(post.title, debouncedValue) ||
        post.categories.some((category) => stringContains(category.title, debouncedValue)) ||
        stringContains(post.author.name, debouncedValue)
    );
    setFilteredPosts(filtered);
    setItems(filtered.slice(0, 3));
    setHasMore(true);
  }, [posts, debouncedValue]);

  useEffect(() => {
    applySearchFilter();
  }, [applySearchFilter]);

  return {
    items,
    hasMore,
    query,
    onInputChange,
    fetchMoreData,
  };
};
