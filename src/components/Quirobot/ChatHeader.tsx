import Image from 'next/image';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { useUIStore } from '@/hooks';

export const ChatHeader = () => {
	const { toggleChatBox } = useUIStore();

	const handleToggleClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		toggleChatBox();
	};

	return (
		<div
			role='button'
			aria-label='Toggle chatbox'
			tabIndex={0}
			onClick={handleToggleClick}
			className='flex items-center justify-between p-2 text-white cursor-pointer bg-turquoise md:rounded-t-xl'
		>
			<div className='flex items-center'>
				<div className='w-8 h-8 rounded-full shadow-sm drop-shadow-sm shadow-navy-blue'>
					<div className='w-full h-full overflow-hidden rounded-full'>
						<button
							onClick={handleToggleClick}
							aria-label='image-button'
							className='w-full h-full'
						>
							<Image
								src='/images/quirobot_picture.jpeg'
								alt='quirobot'
								width={64}
								height={64}
								className='rounded-full animate-pulse-short'
							/>
							<span className='absolute bottom-0 right-0 w-2 h-2 bg-green-500 border-2 border-white rounded-full'></span>
						</button>
					</div>
				</div>
				<span className='ml-2 font-sans font-bold'>Quirobot 👋</span>
			</div>
			<RiArrowDropDownLine size={30} />
		</div>
	);
};
