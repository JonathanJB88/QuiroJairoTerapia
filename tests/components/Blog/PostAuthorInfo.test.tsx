import { render, screen } from '@testing-library/react';
import { PostAuthorInfo } from '@/components'; 
import { AuthorType } from '@/interfaces';

describe('Blog/PostAuthorInfo', () => {
  const mockAuthor: AuthorType = {
    name: 'John Doe',
    avatar: 'https://example.com/avatar.jpg',
    bio: 'A passionate writer.',
    slug: 'john-doe',
  };

  it('renders the author\'s avatar', () => {
    render(<PostAuthorInfo author={mockAuthor} />);
    const avatarUrl = encodeURIComponent(mockAuthor.avatar);
    const avatar = screen.getByAltText(mockAuthor.name) as HTMLImageElement;
    expect(avatar).toBeInTheDocument();
    expect(avatar.src).toContain(avatarUrl);
  });

  it('displays the author\'s name', () => {
    render(<PostAuthorInfo author={mockAuthor} />);
    expect(screen.getByText(mockAuthor.name)).toBeInTheDocument();
  });

  it('displays the author\'s bio', () => {
    render(<PostAuthorInfo author={mockAuthor} />);
    expect(screen.getByText(mockAuthor.bio)).toBeInTheDocument();
  });

  it('displays the post date if provided', () => {
    const postDate = 'January 1, 2023';
    render(<PostAuthorInfo author={mockAuthor} postDate={postDate} />);
    expect(screen.getByText(postDate)).toBeInTheDocument();
  });

  it('does not display the post date if not provided', () => {
    render(<PostAuthorInfo author={mockAuthor} />);
    const dateElement = screen.queryByText(/January 1, 2023/);
    expect(dateElement).not.toBeInTheDocument();
  });
});
