import { render, screen, fireEvent } from '@testing-library/react';
import { LikeButton } from '@/components';

describe('Blog/LikeButton', () => {
  const mockOnClick = jest.fn();
  const mockLikes = 5;

  beforeEach(() => {
    render(<LikeButton onClick={mockOnClick} likes={mockLikes} />);
  });

  it('renders the like icon', () => {
    const likeIcon = screen.getByRole('button');
    expect(likeIcon).toBeInTheDocument();
  });

  it('displays the correct number of likes', () => {
    expect(screen.getByText(mockLikes.toString())).toBeInTheDocument();
  });

  it('displays the "Me gusta" text', () => {
    expect(screen.getByText('Me gusta')).toBeInTheDocument();
  });

  it('calls the onClick function when clicked', () => {
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
