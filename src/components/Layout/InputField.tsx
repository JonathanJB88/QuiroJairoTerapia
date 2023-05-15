interface InputFieldProps {
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | null | undefined;
  minLength?: number;
  size?: 'small' | 'normal';
}

const inputClassName = 'w-full p-2 font-sans border rounded-md focus:outline-none';

export const InputField = ({ name, type, placeholder, value, onChange, error, minLength, size }: InputFieldProps) => (
  <div className='mb-2'>
    <input
      type={type}
      placeholder={placeholder}
      className={`${inputClassName} ${
        error ? 'border-red-500' : 'focus:ring-2 focus:ring-turquoise border-navy-blue focus:border-transparent'
      } ${size === 'small' ? 'text-sm' : 'text-base'}`}
      name={name}
      value={value}
      onChange={onChange}
      required
      minLength={minLength}
    />
    {error && <p className='p-1 font-sans text-xs text-red-500'>{error}</p>}
  </div>
);
