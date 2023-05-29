import { useMemo } from 'react';
import { UserRole } from '@/models/User';
import { Comment, User } from '@/store';

export const useCommentsData = (user: User | null, comments: Comment[]) => {
  const filteredComments = useMemo(() => {
    return user && user.role === UserRole.ADMIN ? comments : comments.filter((c) => c.approved);
  }, [user, comments]);

  const sortedComments = useMemo(() => {
    return [...filteredComments].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [filteredComments]);

  const recentComments = useMemo(() => sortedComments.slice(0, 50), [sortedComments]);

  return { recentComments };
};
