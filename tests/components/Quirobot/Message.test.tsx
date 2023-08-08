import { render, screen } from '@testing-library/react';
import { Message } from '@/components';
import { ChatMessage, Role } from '@/store';

describe('Quirobot/Message', () => {
	it('renders assistant message with start direction', () => {
		const mockMsg: ChatMessage = {
			role: Role.ASSISTANT,
			content: 'Hello from assistant',
		};

		render(<Message msg={mockMsg} index={0} isLast={false} />);

		const messageElement = screen.getByText('Hello from assistant');
		expect(messageElement).toBeInTheDocument();
		expect(messageElement.closest('div')).toHaveClass('items-start');
		expect(screen.queryByText('Cliente')).not.toBeInTheDocument();
	});

	it('renders user message with end direction and Cliente username', () => {
		const mockMsg: ChatMessage = {
			role: Role.USER,
			content: 'Hello from user',
		};

		render(<Message msg={mockMsg} index={0} isLast={false} />);

		const messageElement = screen.getByText('Hello from user');
		expect(messageElement).toBeInTheDocument();
		expect(messageElement.closest('div')).toHaveClass('items-end');
		expect(screen.getByText('Cliente')).toBeInTheDocument();
	});

	it('renders nothing for unknown role', () => {
		const mockMsg: ChatMessage = {
			role: 'unknown' as Role,
			content: 'Hello from unknown',
		};

		const { container } = render(
			<Message msg={mockMsg} index={0} isLast={false} />
		);
		expect(container.firstChild).toBeNull();
	});
});
