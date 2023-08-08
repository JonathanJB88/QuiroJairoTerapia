import { render, screen, fireEvent } from '@testing-library/react';
import { StarRating } from '@/components';

describe('Experiences/StarRating', () => {
	it('renders without crashing', () => {
		render(<StarRating rating={3} readOnly={true} />);
		const stars = screen.getAllByLabelText(/^Rate \d out of 5$/);
		expect(stars.length).toBe(5);
	});

	it('renders the correct number of filled stars based on rating', () => {
		render(<StarRating rating={3} readOnly={true} />);
		const allStars = screen.getAllByLabelText(/^Rate \d out of 5$/);
		const filledStars = allStars.filter((star) =>
			star.querySelector('.text-yellow-500')
		);
		expect(filledStars.length).toBe(3);
	});

	it('renders half-filled star correctly', () => {
		render(<StarRating rating={3.5} readOnly={true} />);
		const allStars = screen.getAllByLabelText(/^Rate \d out of 5$/);
		const filledStars = allStars.filter((star) =>
			star.querySelector('.text-yellow-500')
		);
		expect(filledStars.length).toBe(4); // 3 full stars and 1 half-filled star
		const partialStar = filledStars[3].querySelector('.text-yellow-500');
		expect(partialStar).toHaveStyle(
			'clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%)'
		);
	});

	it('does not change rating when readOnly is true', () => {
		render(<StarRating rating={3} readOnly={true} />);
		const star = screen.getByLabelText('Rate 5 out of 5');
		fireEvent.click(star);
		const allStarsAfterClick = screen.getAllByLabelText(/^Rate \d out of 5$/);
		const filledStarsAfterClick = allStarsAfterClick.filter((star) =>
			star.querySelector('.text-yellow-500')
		);
		expect(filledStarsAfterClick.length).toBe(3);
	});

	it('changes rating when readOnly is false', () => {
		const handleRatingChange = jest.fn();
		render(
			<StarRating
				rating={3}
				readOnly={false}
				onRatingChange={handleRatingChange}
			/>
		);
		const star = screen.getByLabelText('Rate 5 out of 5');
		fireEvent.click(star);
		expect(handleRatingChange).toHaveBeenCalledWith(5);
	});
});
