import { render, screen } from '@testing-library/react';
import { Experiences } from '@/components';
import { Provider } from 'react-redux';
import { store } from '@/store';

import { useAuthStore } from '../../../src/hooks/useAuthStore';
import { useCommentStore } from '../../../src/hooks/useCommentStore';
import { useReviewsData } from '../../../src/hooks/useReviewsData';
import { useWindowSize } from '../../../src/hooks/useWindowSize';
import { toastNotification } from '../../../src/helpers/toastNotification';

jest.mock('../../../src/hooks/useAuthStore', () => ({
	useAuthStore: jest.fn(),
}));

jest.mock('../../../src/hooks/useCommentStore', () => ({
	useCommentStore: jest.fn(),
}));

jest.mock('../../../src/hooks/useReviewsData', () => ({
	useReviewsData: jest.fn(),
}));

jest.mock('../../../src/hooks/useWindowSize', () => ({
	useWindowSize: jest.fn(),
}));

jest.mock('../../../src/helpers/toastNotification', () => ({
	toastNotification: jest.fn(),
}));

describe('Experiences/Experiences component', () => {
	beforeEach(() => {
		(useWindowSize as jest.Mock).mockReturnValue({ width: 800 });
		(useAuthStore as jest.Mock).mockReturnValue({ user: null });
		(useCommentStore as jest.Mock).mockReturnValue({
			comments: [],
			errorMessage: null,
			getComments: jest.fn(),
		});
		(useReviewsData as jest.Mock).mockReturnValue({
			averageRating: 4.5,
			formattedAverage: '4.5',
			recentReviews: [
				{
					rating: 5,
					createdAt: new Date().toISOString(),
					content: 'Test review',
					user: { name: 'TestUser' },
					commentId: '1',
					approved: true,
				},
			],
		});
		(toastNotification as jest.Mock).mockImplementation(() => {});
	});

	it('renders without crashing', () => {
		render(
			<Provider store={store}>
				<Experiences />
			</Provider>
		);
		expect(
			screen.getByText(/Experiencias de QuiroJairoTerapia/i)
		).toBeInTheDocument();
	});

	it('displays the average rating and formatted average', () => {
		render(
			<Provider store={store}>
				<Experiences />
			</Provider>
		);
		expect(screen.getByText('4.5')).toBeInTheDocument();
	});

	it('renders the carousel with the correct number of ReviewCard components', () => {
		render(
			<Provider store={store}>
				<Experiences />
			</Provider>
		);
		const cardsCarousel = screen.getAllByText('Test review');
		expect(cardsCarousel.length).toBe(4); // Adjusted to expect 4 instead of 1 due to Carousel settings
	});

	it('displays the CommentBox component', () => {
		render(
			<Provider store={store}>
				<Experiences />
			</Provider>
		);
		expect(screen.getByText(/Escribe tu reseña/)).toBeInTheDocument();
	});
});
