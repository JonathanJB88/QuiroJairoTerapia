import { render, screen, fireEvent } from '@testing-library/react';
import { LatestPosts } from '@/components';
import { Post } from '@/interfaces';

const mockPost: Post = {
    _id: 'test-id-1',
    title: 'Test Post 1',
    slug: 'test-slug-1',
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

const mockPosts = [
  mockPost,
  { ...mockPost, title: 'Test Post 2', _id: 'test-id-2', slug: 'test-slug-2' },
  { ...mockPost, title: 'Test Post 3', _id: 'test-id-3', slug: 'test-slug-3' },
  { ...mockPost, title: 'Test Post 4', _id: 'test-id-4', slug: 'test-slug-4' },
];

const handleAllPostsMock = jest.fn();

describe('Blog/LatestPosts', () => {

  beforeEach(() => {
    render(<LatestPosts posts={mockPosts} handleAllPosts={handleAllPostsMock} />);
  });

  it('renders the SectionIntro component with the correct title and description', () => {
    const titleElement = screen.getByText('Toma el Control de Tu Bienestar');
    const descriptionElement = screen.getByText('Últimas Reflexiones y Consejos de Tu Terapeuta');
    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

  it('renders the left post with the correct PostImage and PostInfo', () => {
    const leftPostLink = screen.getByRole('link', { name: mockPost.title });
    expect(leftPostLink).toHaveAttribute('href', `/blog/${mockPost.slug}`);
  });

  it('renders the right posts with the correct PostImage and PostInfo', () => {
    mockPosts.slice(1, 4).forEach((post) => {
      const postLink = screen.getByRole('link', { name: post.title });
      expect(postLink).toHaveAttribute('href', `/blog/${post.slug}`);
    });
  });

  it('triggers the handleAllPosts function when "Descubre más" button is clicked', () => {
    const discoverMoreButton = screen.getByRole('button', { name: /Descubre más →/i });
    fireEvent.click(discoverMoreButton);
    expect(handleAllPostsMock).toHaveBeenCalledTimes(1);
  });
});
