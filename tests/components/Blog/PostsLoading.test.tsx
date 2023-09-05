import { render, screen } from '@testing-library/react';
import { PostsLoading } from '@/components';

describe('Blog/PostsLoading', () => {
  it('renders the component and displays the correct text', () => {
    render(<PostsLoading />);

    const loadingText = screen.getByText('Scroll para ver más posts...');
    expect(loadingText).toBeInTheDocument();
    expect(loadingText).toHaveClass('px-1');
    expect(loadingText).toHaveClass('font-sans');
    expect(loadingText).toHaveClass('text-center');
    expect(loadingText).toHaveClass('rounded-md');
    expect(loadingText).toHaveClass('w-fit');
    expect(loadingText).toHaveClass('text-turquoise');
    expect(loadingText).toHaveClass('bg-navy-blue');
  });
});
