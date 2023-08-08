import { render, screen, fireEvent } from '@testing-library/react';
import { ChatHeader } from '@/components';
import { useUIStore } from '../../../src/hooks';

// Mock the useUIStore hook
jest.mock('../../../src/hooks', () => ({
	useUIStore: jest.fn(),
}));

describe('Quirobot/ChatHeader', () => {
	let toggleChatBoxMock: jest.Mock;

	beforeEach(() => {
		toggleChatBoxMock = jest.fn();
		(useUIStore as jest.Mock).mockReturnValue({
			toggleChatBox: toggleChatBoxMock,
		});
	});

	it('renders the header correctly', () => {
		render(<ChatHeader />);

		// Check if the header contains the correct text
		expect(screen.getByText('Quirobot 👋')).toBeInTheDocument();

		// Check if the header contains the correct icons and image
		expect(screen.getByLabelText('Toggle chatbox')).toBeInTheDocument();
		expect(screen.getByAltText('quirobot')).toBeInTheDocument();
	});

	it('calls toggleChatBox when the header is clicked', () => {
		render(<ChatHeader />);

		fireEvent.click(screen.getByLabelText('Toggle chatbox'));

		expect(toggleChatBoxMock).toHaveBeenCalledTimes(1);
	});

	it('calls toggleChatBox when the image button is clicked', () => {
		render(<ChatHeader />);

		fireEvent.click(screen.getByLabelText('image-button'));

		expect(toggleChatBoxMock).toHaveBeenCalledTimes(1);
	});
});
