import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

interface CustomArrowProps {
  clickHandler: () => void;
  hasArrow: boolean;
  label: string;
}

export const CustomArrow = ({ clickHandler, hasArrow, label }: CustomArrowProps) => (
  <button
    type='button'
    onClick={clickHandler}
    className={`absolute ${
      label.startsWith('next') ? 'right-0' : 'left-0'
    } z-20 transform -translate-y-1/2 top-1/2 focus:outline-none focus:ring-0`}
    aria-label={label}
    disabled={!hasArrow}
  >
    {label.startsWith('next') ? <GrFormNext size={22} /> : <GrFormPrevious size={22} />}
  </button>
);
