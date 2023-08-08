import {
	render,
	screen,
	fireEvent,
	act,
	waitFor,
} from '@testing-library/react';
import { ChatButton, quirobotCta } from '@/components';
import { useUIStore } from '../../../src/hooks';

// Mock the useUIStore hook
jest.mock('../../../src/hooks', () => ({
	useUIStore: jest.fn(),
}));

describe('Quirobot/ChatButton', () => {
	let toggleChatBoxMock: jest.Mock;

	beforeEach(() => {
		toggleChatBoxMock = jest.fn();
		(useUIStore as jest.Mock).mockReturnValue({
			showChatBox: false,
			toggleChatBox: toggleChatBoxMock,
		});
	});

	it('renders correctly', () => {
		render(<ChatButton />);
		expect(screen.getByAltText('quirobot')).toBeInTheDocument();
	});

	it('toggles chat box on button click', () => {
		render(<ChatButton />);
		fireEvent.click(screen.getByAltText('quirobot'));
		expect(toggleChatBoxMock).toHaveBeenCalledTimes(1);
	});

	it('hides bubble chat on scroll', async () => {
		render(<ChatButton />);
		expect(screen.getByText(quirobotCta)).toBeInTheDocument();

		const divContainer = screen.getByLabelText('bubble-chat-container');

		act(() => {
			window.dispatchEvent(new Event('scroll'));
		});

		await waitFor(() => {
			expect(divContainer).toHaveClass(
				'transition-all duration-200 ease-in-out opacity-0 invisible'
			);
		});
	});

	it('shows bubble chat on mouse enter and hides on mouse leave', async () => {
		render(<ChatButton />);
		const image = screen.getByAltText('quirobot');
		const divContainer = screen.getByLabelText('bubble-chat-container');

		fireEvent.mouseEnter(image);
		expect(divContainer).not.toHaveClass(
			'transition-all duration-200 ease-in-out opacity-0 invisible'
		);

		fireEvent.mouseLeave(image);

		await waitFor(() => {
			expect(divContainer).toHaveClass(
				'transition-all duration-200 ease-in-out opacity-0 invisible'
			);
		});
	});

	it('hides bubble chat after 10 seconds', async () => {
		jest.useFakeTimers();
		render(<ChatButton />);
		expect(screen.getByText(quirobotCta)).toBeInTheDocument();

		const divContainer = screen.getByLabelText('bubble-chat-container');

		act(() => {
			jest.advanceTimersByTime(10000);
		});

		await waitFor(() => {
			expect(divContainer).toHaveClass(
				'transition-all duration-200 ease-in-out opacity-0 invisible'
			);
		});
		jest.useRealTimers();
	});
});
