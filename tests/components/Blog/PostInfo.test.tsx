import { render, screen } from '@testing-library/react';
import { PostInfo } from '@/components';
import { formatDate } from '@/helpers';
import { Post } from '@/interfaces';

const mockPost: Post = {
    _id: 'test-id',
    title: 'Test Post',
    slug: 'test-slug',
    publishedAt: '2023-06-10T10:00:00Z',
    mainImage: {
      asset: {
        _id: 'test-image-id',
        url: 'https://test-image-url.com',
      },
      alt: 'Test Image Alt',
    },
    body: [],
    author: {
      name: 'Test Author',
      avatar: 'https://test-avatar-url.com',
      bio: 'Test Bio',
      slug: 'test-author-slug',
    },
    categories: [{ title: 'Test Category', _id: 'test-category-id' }],
};

describe('Blog/PostInfo', () => {

  beforeEach(() => {
    render(<PostInfo post={mockPost} />);
  });

  it('renders the PostCategories component with the correct categories', () => {
    const categoryElement = screen.getByText(mockPost.categories[0].title);
    expect(categoryElement).toBeInTheDocument();
  });

  it('renders the post title inside a link with the correct href', () => {
    const postTitleLink = screen.getByRole('link', { name: mockPost.title });
    expect(postTitleLink).toHaveAttribute('href', `/blog/${mockPost.slug}`);
  });

  it('renders the PostAuthorInfo component with the correct author and formatted date', () => {
    const formattedDate = formatDate(new Date(mockPost.publishedAt));
    const authorNameElement = screen.getByText(mockPost.author.name);
    const postDateElement = screen.getByText(formattedDate);

    expect(authorNameElement).toBeInTheDocument();
    expect(postDateElement).toBeInTheDocument();
  });
});
