import { render, screen, fireEvent } from '@testing-library/react';
import { CustomArrow } from '@/components';

describe('Services/CustomArrow', () => {
	const mockClickHandler = jest.fn();

	beforeEach(() => {
		mockClickHandler.mockClear();
	});

	it('renders without crashing', () => {
		render(
			<CustomArrow
				clickHandler={mockClickHandler}
				hasArrow={true}
				label='next-arrow'
			/>
		);
		expect(screen.getByRole('button')).toBeInTheDocument();
	});

	it('renders the next arrow icon when label starts with "next"', () => {
		render(
			<CustomArrow
				clickHandler={mockClickHandler}
				hasArrow={true}
				label='next-arrow'
			/>
		);
		expect(screen.getByLabelText('next-arrow')).toBeInTheDocument();
	});

	it('renders the previous arrow icon when label does not start with "next"', () => {
		render(
			<CustomArrow
				clickHandler={mockClickHandler}
				hasArrow={true}
				label='previous-arrow'
			/>
		);
		expect(screen.getByLabelText('previous-arrow')).toBeInTheDocument();
	});

	it('calls the clickHandler when clicked', () => {
		render(
			<CustomArrow
				clickHandler={mockClickHandler}
				hasArrow={true}
				label='next-arrow'
			/>
		);
		fireEvent.click(screen.getByRole('button'));
		expect(mockClickHandler).toHaveBeenCalledTimes(1);
	});

	it('is disabled when hasArrow is false', () => {
		render(
			<CustomArrow
				clickHandler={mockClickHandler}
				hasArrow={false}
				label='next-arrow'
			/>
		);
		expect(screen.getByRole('button')).toBeDisabled();
	});

	it('is not disabled when hasArrow is true', () => {
		render(
			<CustomArrow
				clickHandler={mockClickHandler}
				hasArrow={true}
				label='next-arrow'
			/>
		);
		expect(screen.getByRole('button')).not.toBeDisabled();
	});
});
