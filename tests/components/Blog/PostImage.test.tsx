import { render, screen } from '@testing-library/react';
import { PostImage } from '@/components';
import { Post } from '@/interfaces';

const mockPost: Post = {
    _id: 'test-id',
    title: 'Test Post',
    slug: 'test-slug',
    publishedAt: '2021-06-10',
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
    categories: [],
};

const postWithoutAlt: Post = {
    ...mockPost,
    mainImage: {
       ...mockPost.mainImage,
        alt: ''
    },
};



describe('Blog/PostImage', () => {

  it('renders the image with the correct src, alt, and other attributes', () => {
    render(<PostImage post={mockPost} />);
    const transformedUrl = encodeURIComponent(mockPost.mainImage.asset.url);
    
    const imageElement = screen.getByRole('img') as HTMLImageElement;
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.src).toContain(transformedUrl);
    expect(imageElement).toHaveAttribute('alt', mockPost.mainImage.alt);
    expect(imageElement).toHaveAttribute('loading', 'lazy');
    expect(imageElement).toHaveAttribute('sizes', '(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1280px');
    expect(imageElement).toHaveClass('rounded-lg');
    expect(imageElement).toHaveClass('shadow-lg');
  });

  it('renders the image with a default alt text if alt is not provided', () => {

    render(<PostImage post={postWithoutAlt} />);

    const imageElement = screen.getByRole('img');
    expect(imageElement).toHaveAttribute('alt', `Imagen de portada del post ${mockPost.title}`);
  });
});
