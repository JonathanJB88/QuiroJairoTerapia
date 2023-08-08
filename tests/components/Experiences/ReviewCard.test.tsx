import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ReviewCard } from '@/components';
import { formatDate } from '@/helpers';
import { Comment, store } from '@/store';

describe('Experiences/ReviewCard', () => {
	const mockReview: Comment = {
		commentId: '1',
		postId: 'post1',
		user: {
			_id: 'user1',
			name: 'TestUser',
		},
		content: 'This is a test review',
		rating: 5,
		type: 'review',
		approved: true,
		likes: [],
		createdAt: new Date(),
	};

	it('renders without crashing', () => {
		render(
			<Provider store={store}>
				<ReviewCard
					review={mockReview}
					expandedReviewId=''
					setExpandedReviewId={() => {}}
				/>
			</Provider>
		);
		const reviews = screen.getAllByText('This is a test review');
		expect(reviews).toHaveLength(2);
	});

	it('displays the correct rating', () => {
		render(
			<Provider store={store}>
				<ReviewCard
					review={mockReview}
					expandedReviewId=''
					setExpandedReviewId={() => {}}
				/>
			</Provider>
		);
		const allStars = screen.getAllByLabelText(/^Rate \d out of 5$/);
		const filledStars = allStars.filter((star) =>
			star.querySelector('.text-yellow-500')
		);
		expect(filledStars.length).toBe(10);
	});

	it('displays the correct date', () => {
		render(
			<Provider store={store}>
				<ReviewCard
					review={mockReview}
					expandedReviewId=''
					setExpandedReviewId={() => {}}
				/>
			</Provider>
		);
		const dates = screen.getAllByText(formatDate(mockReview.createdAt));
		expect(dates).toHaveLength(2);
	});

	it('displays the correct username', () => {
		render(
			<Provider store={store}>
				<ReviewCard
					review={mockReview}
					expandedReviewId=''
					setExpandedReviewId={() => {}}
				/>
			</Provider>
		);
		const usernames = screen.getAllByText('- TestUser');
		expect(usernames).toHaveLength(2);
	});

	it('expands the review content when clicked', () => {
		render(
			<Provider store={store}>
				<ReviewCard
					review={mockReview}
					expandedReviewId=''
					setExpandedReviewId={() => {}}
				/>
			</Provider>
		);
		fireEvent.click(screen.getByText('Leer más'));
		expect(screen.getByText('Mostrar menos')).toBeInTheDocument();
	});

	it('collapses the review content when expanded content is clicked', () => {
		const setExpandedReviewId = jest.fn();
		render(
			<Provider store={store}>
				<ReviewCard
					review={mockReview}
					expandedReviewId='1'
					setExpandedReviewId={setExpandedReviewId}
				/>
			</Provider>
		);
		fireEvent.click(screen.getByText('Mostrar menos'));
		expect(setExpandedReviewId).toHaveBeenCalledWith('');
	});
});
