import { render, screen } from '@testing-library/react';
import { PostCategories } from '@/components';
import { CategoryType } from '@/interfaces';

describe('Blog/PostCategories', () => {
  it('renders the category label', () => {
    const mockCategories: CategoryType[] = [
      { _id: '1', title: 'Test Category' },
    ];
    render(<PostCategories categories={mockCategories} />);
    expect(screen.getByText('Categoría')).toBeInTheDocument();
  });

  it('displays the title of the first category', () => {
    const mockCategories: CategoryType[] = [
      { _id: '1', title: 'Test Category' },
    ];
    render(<PostCategories categories={mockCategories} />);
    expect(screen.getByText('Test Category')).toBeInTheDocument();
  });

  it('displays the count of additional categories if more than one', () => {
    const mockCategories: CategoryType[] = [
      { _id: '1', title: 'Test Category 1' },
      { _id: '2', title: 'Test Category 2' },
      { _id: '3', title: 'Test Category 3' },
    ];
    render(<PostCategories categories={mockCategories} />);
    expect(screen.getByText('+2')).toBeInTheDocument();
  });

  it('does not display the count if only one category', () => {
    const mockCategories: CategoryType[] = [
      { _id: '1', title: 'Test Category' },
    ];
    render(<PostCategories categories={mockCategories} />);
    const additionalCount = screen.queryByText(/^\+/);
    expect(additionalCount).not.toBeInTheDocument();
  });
});
