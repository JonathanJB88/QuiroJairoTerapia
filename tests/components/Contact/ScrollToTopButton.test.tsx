import { render, screen, fireEvent } from '@testing-library/react';
import { ScrollToTopButton } from '@/components';

describe('Contact/ScrollToTopButton', () => {
	it('renders without crashing', () => {
		const mockOnClick = jest.fn();
		render(<ScrollToTopButton onClick={mockOnClick} />);

		const buttonElement = screen.getByRole('button');
		expect(buttonElement).toBeInTheDocument();
	});

	it('triggers onClick function when clicked', () => {
		const mockOnClick = jest.fn();
		render(<ScrollToTopButton onClick={mockOnClick} />);

		const buttonElement = screen.getByRole('button');
		fireEvent.click(buttonElement);
		expect(mockOnClick).toHaveBeenCalledTimes(1);
	});
});
