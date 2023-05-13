interface InputFieldProps {
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | null | undefined;
  minLength?: number;
}

const inputClassName = 'w-full p-2 font-sans border rounded-md border-navy-blue focus:outline-none';

export const InputField = ({ name, type, placeholder, value, onChange, error, minLength }: InputFieldProps) => (
  <div className='mb-2'>
    <input
      type={type}
      placeholder={placeholder}
      className={`${inputClassName} ${error ? 'border-red-500' : 'focus:ring-2 focus:ring-turquoise'}`}
      name={name}
      value={value}
      onChange={onChange}
      required
      minLength={minLength}
    />
    {error && <p className='p-1 font-sans text-xs text-red-500'>{error}</p>}
  </div>
);
