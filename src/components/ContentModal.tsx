interface ContentModalProps {
  title: string;
  content: React.ReactNode;
}

export const ContentModal = ({ title, content }: ContentModalProps) => {
  return (
    <div className='select-none'>
      <h2 className='mb-4 text-2xl font-bold text-navy-blue'>{title}</h2>
      {content}
    </div>
  );
};
