import { render, screen } from '@testing-library/react';
import { PostMeta } from '@/components';

describe('Blog/PostMeta', () => {
  it('renders the component and displays the provided date', () => {
    const testDate = '2023-06-10';
    render(<PostMeta date={testDate} />);

    const dateElement = screen.getByText(testDate);
    expect(dateElement).toBeInTheDocument();
    expect(dateElement).toHaveClass('px-2');
    expect(dateElement).toHaveClass('py-1');
    expect(dateElement).toHaveClass('font-sans');
    expect(dateElement).toHaveClass('rounded-md');
    expect(dateElement).toHaveClass('text-2xs');
    expect(dateElement).toHaveClass('md:text-xs');
    expect(dateElement).toHaveClass('text-start');
    expect(dateElement).toHaveClass('w-fit');
    expect(dateElement).toHaveClass('text-turquoise');
    expect(dateElement).toHaveClass('bg-navy-blue');
  });
});
