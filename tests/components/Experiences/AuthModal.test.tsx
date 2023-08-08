import { render, screen, act } from '@testing-library/react';
import { AuthModal } from '@/components';

import { useAuthStore } from '../../../src/hooks/useAuthStore';
import { useUIStore } from '../../../src/hooks/useUIStore';
import { toastNotification } from '../../../src/helpers';

jest.mock('../../../src/hooks/useAuthStore', () => ({
	useAuthStore: jest.fn(),
}));

jest.mock('../../../src/hooks/useUIStore', () => ({
	useUIStore: jest.fn(),
}));

jest.mock('../../../src/helpers', () => ({
	toastNotification: jest.fn(),
}));

describe('Experiences/AuthModal', () => {
	beforeEach(() => {
		(useAuthStore as jest.Mock).mockReturnValue({
			errorMessage: undefined,
			status: 'idle',
		});
		(useUIStore as jest.Mock).mockReturnValue({
			toggleAuthModal: jest.fn(),
		});
	});

	it('renders without crashing', () => {
		render(<AuthModal />);
		expect(
			screen.getByRole('heading', {
				name: /Acceder para dejar una reseña/i,
			})
		).toBeInTheDocument();
	});

	it('displays toast notification on error', () => {
		(useAuthStore as jest.Mock).mockReturnValueOnce({
			errorMessage: 'Error occurred',
			status: 'idle',
		});
		act(() => {
			render(<AuthModal />);
		});
		expect(toastNotification).toHaveBeenCalledWith('error', 'Error occurred');
	});

	it('displays success toast and closes modal on successful authentication', () => {
		const toggleAuthModal = jest.fn();
		(useAuthStore as jest.Mock).mockReturnValueOnce({
			errorMessage: undefined,
			status: 'authenticated',
		});
		(useUIStore as jest.Mock).mockReturnValueOnce({
			toggleAuthModal,
		});
		act(() => {
			render(<AuthModal />);
		});
		expect(toastNotification).toHaveBeenCalledWith('success', '¡Bienvenido!');
		expect(toggleAuthModal).toHaveBeenCalled();
	});
});
