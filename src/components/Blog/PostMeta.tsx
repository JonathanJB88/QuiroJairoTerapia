interface PostMetaProps {
  date: string;
}

export const PostMeta = ({ date }: PostMetaProps) => {
  return (
    <span className='px-2 py-1 font-sans rounded-md text-2xs md:text-xs text-start w-fit text-turquoise bg-navy-blue'>
      {date}
    </span>
  );
};
