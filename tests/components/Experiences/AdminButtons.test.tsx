import { render, screen, fireEvent } from '@testing-library/react';
import { AdminButtons } from '@/components';
import { UserRole } from '@/models/User';

import { useAuthStore } from '../../../src/hooks/useAuthStore';
import { useCommentStore } from '../../../src/hooks/useCommentStore';
import { toastNotification } from '../../../src/helpers/toastNotification';

jest.mock('../../../src/hooks/useAuthStore', () => ({
	useAuthStore: jest.fn(),
}));

jest.mock('../../../src/hooks/useCommentStore', () => ({
	useCommentStore: jest.fn(),
}));

jest.mock('../../../src/helpers/toastNotification', () => ({
	toastNotification: jest.fn(),
}));

describe('Experiences/AdminButtons', () => {
	beforeEach(() => {
		(useAuthStore as jest.Mock).mockReturnValue({
			user: { role: UserRole.ADMIN },
		});
		(useCommentStore as jest.Mock).mockReturnValue({
			updateComment: jest.fn().mockResolvedValue({ ok: true, msg: 'Success' }),
			deleteComment: jest.fn().mockResolvedValue({ ok: true, msg: 'Deleted' }),
		});
	});

	it('does not render buttons if user is not an ADMIN', () => {
		(useAuthStore as jest.Mock).mockReturnValueOnce({
			user: { role: UserRole.USER },
		});
		render(<AdminButtons commentId='123' approved={false} />);
		expect(screen.queryByText('Aprobar')).not.toBeInTheDocument();
		expect(screen.queryByText('Eliminar')).not.toBeInTheDocument();
	});

	it('renders the Aprobar button if comment is not approved', () => {
		render(<AdminButtons commentId='123' approved={false} />);
		expect(screen.getByText('Aprobar')).toBeInTheDocument();
	});

	it('does not render the Aprobar button if comment is approved', () => {
		render(<AdminButtons commentId='123' approved={true} />);
		expect(screen.queryByText('Aprobar')).not.toBeInTheDocument();
	});

	it('always renders the Eliminar button for ADMIN', () => {
		render(<AdminButtons commentId='123' approved={true} />);
		expect(screen.getByText('Eliminar')).toBeInTheDocument();
	});

	it('calls updateComment with correct parameters when Aprobar is clicked', () => {
		const { updateComment } = useCommentStore();
		render(<AdminButtons commentId='123' approved={false} />);
		fireEvent.click(screen.getByText('Aprobar'));
		expect(updateComment).toHaveBeenCalledWith({
			commentId: '123',
			approved: true,
		});
	});

	it('calls deleteComment with correct parameters when Eliminar is clicked', () => {
		const { deleteComment } = useCommentStore();
		render(<AdminButtons commentId='123' approved={true} />);
		fireEvent.click(screen.getByText('Eliminar'));
		expect(deleteComment).toHaveBeenCalledWith('123');
	});

	it('shows a success toast when updateComment is successful', async () => {
		const { updateComment } = useCommentStore();
		(updateComment as jest.Mock).mockResolvedValueOnce({
			ok: true,
			msg: 'Updated successfully',
		});

		render(<AdminButtons commentId='123' approved={false} />);
		fireEvent.click(screen.getByText('Aprobar'));

		await expect(updateComment).toHaveBeenCalledWith({
			commentId: '123',
			approved: true,
		});
		expect(toastNotification).toHaveBeenCalledWith(
			'success',
			'Updated successfully'
		);
	});

	it('shows an error toast when updateComment fails', async () => {
		const { updateComment } = useCommentStore();
		(updateComment as jest.Mock).mockResolvedValueOnce({
			ok: false,
			msg: 'Update failed',
		});

		render(<AdminButtons commentId='123' approved={false} />);
		fireEvent.click(screen.getByText('Aprobar'));

		await expect(updateComment).toHaveBeenCalledWith({
			commentId: '123',
			approved: true,
		});
		expect(toastNotification).toHaveBeenCalledWith('error', 'Update failed');
	});

	it('shows a success toast when deleteComment is successful', async () => {
		const { deleteComment } = useCommentStore();
		(deleteComment as jest.Mock).mockResolvedValueOnce({
			ok: true,
			msg: 'Deleted successfully',
		});

		render(<AdminButtons commentId='123' approved={true} />);
		fireEvent.click(screen.getByText('Eliminar'));

		await expect(deleteComment).toHaveBeenCalledWith('123');
		expect(toastNotification).toHaveBeenCalledWith(
			'success',
			'Deleted successfully'
		);
	});

	it('shows an error toast when deleteComment fails', async () => {
		const { deleteComment } = useCommentStore();
		(deleteComment as jest.Mock).mockResolvedValueOnce({
			ok: false,
			msg: 'Delete failed',
		});

		render(<AdminButtons commentId='123' approved={true} />);
		fireEvent.click(screen.getByText('Eliminar'));

		await expect(deleteComment).toHaveBeenCalledWith('123');
		expect(toastNotification).toHaveBeenCalledWith('error', 'Delete failed');
	});
});
