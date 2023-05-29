import { useMemo } from 'react';
import { UserRole } from '@/models/User';
import { Comment, User } from '@/store';

export const useReviewsData = (user: User | null, comments: Comment[]) => {
  const averageRating = useMemo(() => {
    const totalRating = comments.reduce((sum, c) => sum + c.rating, 0);
    return comments.length ? totalRating / comments.length : 0;
  }, [comments]);

  const formattedAverage = useMemo(() => averageRating.toFixed(1), [averageRating]);

  const filteredComments = useMemo(() => {
    return user && user.role === UserRole.ADMIN ? comments : comments.filter((c) => c.approved);
  }, [user, comments]);

  const recentReviews = useMemo(() => filteredComments.slice(0, 50), [filteredComments]);

  return { averageRating, formattedAverage, filteredComments, recentReviews };
};
