import { useEffect, useRef } from 'react';
import {
	BubbleChat,
	ChatHeader,
	Message,
	QuirobotChatForm,
} from '@/components';
import { useSubmitChat } from '@/hooks';

export const QuirobotChat = () => {
	const { chatMessages, loading, isFormValid, formValidation } =
		useSubmitChat();

	const chatBoxRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const currentChatBoxRef = chatBoxRef.current;
		if (!currentChatBoxRef) return;
		currentChatBoxRef.scrollTop = currentChatBoxRef.scrollHeight;
	}, [chatMessages, loading, isFormValid]);

	return (
		<div className='fixed bottom-0 right-0 z-50 flex flex-col w-full h-full max-w-md shadow-lg md:h-1/2 bg-light-gray md:rounded-xl md:bottom-4 md:right-4'>
			<ChatHeader />
			<div
				aria-label='chat-box'
				ref={chatBoxRef}
				className='flex-grow p-2 overflow-y-auto'
			>
				{chatMessages.map((msg, index) => (
					<Message
						msg={msg}
						index={index}
						isLast={index === chatMessages.length - 1}
						key={index}
					/>
				))}
				{loading && (
					<BubbleChat animation message='Escribiendo...' direction='start' />
				)}
				{formValidation.message && (
					<BubbleChat message={formValidation.message} direction='start' />
				)}
			</div>
			<div className='border-t border-navy-blue border-opacity-20' />
			<QuirobotChatForm />
		</div>
	);
};
