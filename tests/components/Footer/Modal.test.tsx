import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from '@/components';

describe('Footer/Modal', () => {
	const mockOnClose = jest.fn();

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders without crashing when isOpen is true', () => {
		render(
			<Modal isOpen={true} onClose={mockOnClose}>
				<p>Modal Content</p>
			</Modal>
		);

		expect(screen.getByText('Modal Content')).toBeInTheDocument();
	});

	it('does not render when isOpen is false', () => {
		render(
			<Modal isOpen={false} onClose={mockOnClose}>
				<p>Modal Content</p>
			</Modal>
		);

		expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
	});

	it('calls onClose when close button is clicked', () => {
		render(
			<Modal isOpen={true} onClose={mockOnClose}>
				<p>Modal Content</p>
			</Modal>
		);

		fireEvent.click(screen.getByText('×'));
		expect(mockOnClose).toHaveBeenCalledTimes(1);

		fireEvent.click(screen.getByText(/Cerrar/i));
		expect(mockOnClose).toHaveBeenCalledTimes(2);
	});
});
