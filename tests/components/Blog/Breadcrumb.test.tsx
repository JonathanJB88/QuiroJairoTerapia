import { render, screen, fireEvent } from '@testing-library/react';
import { Breadcrumb } from '@/components'; 
import { CategoryType } from '@/interfaces';

const mockCategories: CategoryType[] = [
  { title: 'Category 1', _id: 'category-id-1' },
  { title: 'Category 2', _id: 'category-id-2' },
  { title: 'Category 3', _id: 'category-id-3' },
];

const onNavigateMock = jest.fn();

describe('Blog/Breadcrumb', () => {
  beforeEach(() => {
    render(<Breadcrumb categories={mockCategories} onNavigate={onNavigateMock} />);
  });

  it('renders the "Consejos" button', () => {
    const consejosButton = screen.getByText('Consejos');
    expect(consejosButton).toBeInTheDocument();
  });

  it('triggers the onNavigate function when "Consejos" button is clicked', () => {
    const consejosButton = screen.getByText('Consejos');
    fireEvent.click(consejosButton);
    expect(onNavigateMock).toHaveBeenCalledTimes(1);
  });

  it('renders the correct categories', () => {
    mockCategories.forEach((category) => {
      const categoryElement = screen.getByText(category.title);
      expect(categoryElement).toBeInTheDocument();
    });
  });
});
