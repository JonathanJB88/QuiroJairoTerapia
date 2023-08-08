import { render, screen } from '@testing-library/react';
import { BubbleChat } from '@/components';

describe('Quirobot/BubbleChat', () => {
	it('renders without crashing', () => {
		render(<BubbleChat message='Hello' direction='start' />);
		expect(screen.getByText('Hello')).toBeInTheDocument();
	});

	it('displays the provided message', () => {
		render(<BubbleChat message='Test Message' direction='start' />);
		expect(screen.getByText('Test Message')).toBeInTheDocument();
	});

	it('displays the provided username', () => {
		render(<BubbleChat message='Hello' direction='start' username='John' />);
		expect(screen.getByText('John')).toBeInTheDocument();
	});

	it('defaults to "Quirobot" if no username is provided', () => {
		render(<BubbleChat message='Hello' direction='start' />);
		expect(screen.getByText('Quirobot')).toBeInTheDocument();
	});

	it('displays the time', () => {
		render(<BubbleChat message='Hello' direction='start' />);
		const timeElement = screen.getByText(/AM|PM/, { selector: 'time' });
		expect(timeElement).toBeInTheDocument();
	});

	it('applies styles based on the direction prop', () => {
		const { rerender } = render(
			<BubbleChat message='Hello' direction='start' />
		);
		expect(screen.getByText('Hello').closest('div')).toHaveClass('items-start');

		rerender(<BubbleChat message='Hello' direction='end' />);
		expect(screen.getByText('Hello').closest('div')).toHaveClass('items-end');
	});

	it('applies animation class if animation prop is true', () => {
		render(<BubbleChat message='Hello' direction='start' animation={true} />);
		expect(screen.getByText('Hello').closest('div')).toHaveClass(
			'animate-pulse-short'
		);
	});

	it('converts links in the message to clickable links', () => {
		render(<BubbleChat message='Visit http://example.com' direction='start' />);
		const link = screen.getByRole('link', { name: 'http://example.com' });
		expect(link).toHaveAttribute('href', 'http://example.com');
	});
});
