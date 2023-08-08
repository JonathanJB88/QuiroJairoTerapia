import { useEffect, useRef } from 'react';
import autosize from 'autosize';
import { useContact } from '@/hooks';
import { InputField } from '@/components';
import { InputFieldType } from '@/interfaces';
import { toastNotification } from '@/helpers';

const textareaClassname =
	'w-full p-2 font-sans border rounded-md focus:outline-none h-32';

export const ContactForm = () => {
	const {
		name,
		email,
		phone,
		message,
		loading,
		formValidation,
		onInputChange,
		handleSubmit,
	} = useContact();
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const inputFields: InputFieldType[] = [
		{
			name: 'name',
			type: 'text',
			placeholder: 'Tu nombre',
			value: name,
			onChange: onInputChange,
			error: formValidation.name,
		},
		{
			name: 'email',
			type: 'email',
			placeholder: 'Tu correo electrónico',
			value: email,
			onChange: onInputChange,
			error: formValidation.email,
		},
		{
			name: 'phone',
			type: 'tel',
			placeholder: 'Tu número de teléfono',
			value: phone,
			onChange: onInputChange,
			error: formValidation.phone,
		},
	];

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
		if (formValidation.message)
			return toastNotification('error', formValidation.message);
	}, [formValidation.message]);

	return (
		<form
			data-testid='contact-form'
			role='form'
			onSubmit={handleSubmit}
			className='space-y-4'
			noValidate
		>
			{inputFields.map((inputField) => (
				<InputField key={inputField.name} {...inputField} />
			))}
			<textarea
				ref={textareaRef}
				name='message'
				placeholder='Escribe tu mensaje aquí...'
				rows={2}
				aria-label='Escribe tu mensaje aquí'
				value={message}
				onChange={onInputChange}
				className={`${textareaClassname} ${
					formValidation.message
						? 'border-red-500'
						: 'focus:ring-2 focus:ring-turquoise border-navy-blue focus:border-transparent'
				}`}
				required
			/>

			<button
				type='submit'
				className='px-2 py-1 font-sans text-xs font-semibold transition-all duration-200 ease-in-out rounded-md md:text-sm text-navy-blue bg-turquoise md:px-8 md:py-2 hover:bg-opacity-80'
			>
				{loading ? 'Enviando tu mensaje...' : 'Envía tu mensaje'}
			</button>
		</form>
	);
};
