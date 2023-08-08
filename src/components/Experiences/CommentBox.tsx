import { useCallback, useEffect, useMemo, useRef } from 'react';
import autosize from 'autosize';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { AuthModal, StarRating } from '@/components';
import { useAuthStore, useSubmitComment, useUIStore } from '@/hooks';
import { CommentType } from '@/interfaces';

interface CommentBoxProps {
	type: CommentType;
	postId?: string;
}

const textareaClass =
	'w-full p-2 font-sans text-sm border md:text-base rounded-md focus:outline-none h-32 focus:ring-2 focus:ring-turquoise border-navy-blue focus:border-transparent';

export const CommentBox = ({ type, postId }: CommentBoxProps) => {
	const { status, user, logout } = useAuthStore();
	const {
		showAuthModal,
		showDropdown,
		toggleAuthModal,
		toggleDropdown,
		resetUI,
	} = useUIStore();
	const {
		content,
		rating,
		isPosting,
		onInputChange,
		handleRatingChange,
		handleSubmit,
		onResetForm,
	} = useSubmitComment(type, postId);

	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const handleLogout = useCallback(() => {
		logout();
		onResetForm();
		resetUI();
	}, [logout, onResetForm, resetUI]);

	const handleOutsideClick = useCallback(
		(event: MouseEvent) => {
			if (
				showDropdown &&
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node) &&
				textareaRef.current &&
				!textareaRef.current.contains(event.target as Node)
			) {
				toggleDropdown();
			}
		},
		[showDropdown, toggleDropdown]
	);

	const checkIfTextareaIsFocused = useCallback(() => {
		if (document.activeElement === textareaRef.current && showDropdown) {
			toggleDropdown();
		}
	}, [showDropdown, toggleDropdown]);

	useEffect(() => {
		const currentTextareaRef = textareaRef.current;
		if (currentTextareaRef) {
			autosize(currentTextareaRef);
		}
		return () => {
			if (currentTextareaRef) {
				autosize.destroy(currentTextareaRef);
			}
		};
	}, []);

	useEffect(() => {
		document.addEventListener('mousedown', handleOutsideClick);
		document.addEventListener('focusin', checkIfTextareaIsFocused);
		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
			document.removeEventListener('focusin', checkIfTextareaIsFocused);
		};
	}, [handleOutsideClick, checkIfTextareaIsFocused]);

	const userDropdown = useMemo(
		() =>
			status === 'authenticated' && (
				<div className='relative' ref={dropdownRef}>
					<button
						className='flex items-center space-x-2 text-xs font-semibold transition-all duration-200 ease-in-out text-navy-blue hover:text-turquoise'
						onClick={toggleDropdown}
					>
						<span>{user?.name}</span>
						<RiArrowDropDownLine size={30} />
					</button>
					{showDropdown && (
						<div className='absolute right-0 mt-2 bg-white rounded shadow-md'>
							<button
								className='block w-full px-2 py-1 text-xs font-semibold text-left transition-all duration-200 ease-in-out text-navy-blue hover:text-turquoise'
								onClick={handleLogout}
							>
								Logout
							</button>
						</div>
					)}
				</div>
			),
		[status, user, showDropdown, toggleDropdown, handleLogout]
	);

	const loginButton = useMemo(
		() =>
			status === 'unauthenticated' && (
				<button
					className='text-xs font-semibold transition-all duration-200 ease-in-out text-navy-blue hover:text-turquoise'
					onClick={toggleAuthModal}
				>
					Iniciar Sesión
				</button>
			),
		[status, toggleAuthModal]
	);

	return (
		<div className='relative p-4 rounded-lg shadow-md bg-light-gray'>
			<div className='absolute top-0 right-0 p-4'>
				{userDropdown}
				{loginButton}
			</div>
			{showAuthModal && <AuthModal />}

			<div className='flex flex-col space-y-4'>
				<h3 className='text-lg font-bold md:text-xl font-roboto text-navy-blue'>
					Escribe tu {type === 'review' ? 'reseña' : 'comentario'}
				</h3>
				<textarea
					className={`${textareaClass} ${!user ? 'cursor-not-allowed' : ''}`}
					placeholder={
						user
							? 'Describe tu experiencia aquí...'
							: 'Inicia sesión para escribir un comentario.'
					}
					rows={2}
					aria-label={
						user
							? 'Describe tu experiencia aquí'
							: 'Inicia sesión para escribir un comentario.'
					}
					disabled={!user}
					ref={textareaRef}
					name='content'
					value={content}
					onChange={onInputChange}
				/>
				<div
					className={`flex flex-row items-center ${
						type === 'review' ? 'justify-between' : 'justify-end'
					}`}
				>
					{type === 'review' && (
						<div className='flex flex-col items-center justify-center md:flex-row'>
							<h2 className='font-bold md:text-xl font-roboto text-navy-blue md:px-2'>
								Califica el Servicio
							</h2>
							<div>
								<StarRating
									rating={rating || 5}
									onRatingChange={handleRatingChange}
									readOnly={!user}
								/>
							</div>
						</div>
					)}
					<button
						data-testid='submit-comment-button'
						className='flex flex-col items-center px-2 py-1 font-sans text-xs font-semibold transition-all duration-200 ease-in-out rounded-md md:flex-row md:text-sm text-navy-blue bg-turquoise md:px-8 md:py-2 hover:bg-opacity-80'
						type='submit'
						onClick={handleSubmit}
					>
						{isPosting ? (
							<span className='mr-1'>Publicando...</span>
						) : (
							<>
								<span className='mr-1'>Publicar</span>
								<span>comentario</span>
							</>
						)}
					</button>
				</div>
			</div>
		</div>
	);
};
