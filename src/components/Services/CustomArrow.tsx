import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

interface CustomArrowProps {
	clickHandler: () => void;
	hasArrow: boolean;
	label: string;
}

export const CustomArrow = ({
	clickHandler,
	hasArrow,
	label,
}: CustomArrowProps) => {
	const isNext = label.startsWith('next');
	const buttonStyle = `absolute ${
		isNext ? 'right-0' : 'left-0'
	} z-20 transform -translate-y-1/2 top-1/2 focus:outline-none focus:ring-0 w-8 h-8`;

	return (
		<button
			type='button'
			onClick={clickHandler}
			className={buttonStyle}
			aria-label={label}
			disabled={!hasArrow}
		>
			{isNext ? (
				<GrFormNext size={22} className='mb-1 ml-2' />
			) : (
				<GrFormPrevious size={22} />
			)}
		</button>
	);
};
