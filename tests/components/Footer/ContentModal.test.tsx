import { render, screen } from '@testing-library/react';
import { ContentModal } from '@/components';

const mockContent = <p>Mock Content</p>;

describe('Footer/ContentModal', () => {
	it('renders without crashing', () => {
		render(<ContentModal title='Test Title' content={mockContent} />);
		expect(screen.getByText('Test Title')).toBeInTheDocument();
		expect(screen.getByText('Mock Content')).toBeInTheDocument();
	});
});
