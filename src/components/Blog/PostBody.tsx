import Image from 'next/image';
import { ChildType, BlockContentType, BlockType, StyleType } from '@/interfaces';

type TypeHandler = Record<BlockType, (block: BlockContentType) => JSX.Element | JSX.Element[] | null>;
type StyleHandler = Record<StyleType, (block: BlockContentType) => JSX.Element | JSX.Element[] | null>;

const styleHandlers: StyleHandler = {
  [StyleType.H1]: (block) => (
    <h1 className='my-4 font-sans text-xl font-bold md:text-3xl text-navy-blue'>{block.children[0].text}</h1>
  ),
  [StyleType.H2]: (block) => (
    <h2 className='my-3 font-sans text-lg font-bold md:text-2xl text-navy-blue-lighter'>{block.children[0].text}</h2>
  ),
  [StyleType.H3]: (block) => (
    <h3 className='my-2 font-sans text-base font-semibold text-black text-opacity-75 md:text-xl'>
      {block.children[0].text}
    </h3>
  ),
  [StyleType.H4]: (block) => (
    <h4 className='my-2 font-sans text-sm font-medium text-black md:text-lg text-opacity-60'>
      {block.children[0].text}
    </h4>
  ),
  [StyleType.Blockquote]: (block) => (
    <blockquote className='px-4 py-3 mx-10 my-5 font-sans text-sm italic font-bold border-l-4 rounded-md md:text-base border-turquoise bg-light-gray text-turquoise'>
      {block.children[0].text}
    </blockquote>
  ),
  [StyleType.Normal]: (block) => {
    if (block.listItem) {
      return (
        <li className='mx-6 font-sans text-sm list-disc list-inside md:text-base text-navy-blue'>
          {block.children[0].text}
        </li>
      );
    }
    const { markDefs, children } = block;
    return children.map((child: ChildType) => {
      if (child.marks && child.marks.length > 0) {
        let styleClass = 'my-2 text-gray-800 text-sm md:text-base';
        if (child.marks.includes('em')) styleClass += ' italic';
        if (child.marks.includes('strong')) styleClass += ' font-bold';

        const { href } = markDefs.find((markDef) => markDef._key === child.marks[0]) || {};
        if (href) {
          return (
            <a
              key={child._key}
              href={href}
              target='_blank'
              rel='noopener noreferrer'
              className={styleClass + ' underline text-navy-blue'}
            >
              {child.text}
            </a>
          );
        }
        return (
          <p key={child._key} className={styleClass}>
            {child.text}
          </p>
        );
      }
      return (
        <p key={child._key} className='my-2 text-gray-800'>
          {child.text}
        </p>
      );
    });
  },
};

const typeHandlers: TypeHandler = {
  [BlockType.Block]: (block: BlockContentType) => {
    const handler = styleHandlers[block.style];
    if (!handler) {
      console.error(`Handler not found for block style "${block.style}"`);
      return null;
    }
    return handler(block);
  },
  [BlockType.Image]: (block: BlockContentType) => {
    const { asset } = block;
    if (!asset) return null;
    const altText = 'Imagen descriptiva del artículo';

    return (
      <div className='relative mx-auto my-6 pb-[50%] w-3/4'>
        <Image
          src={asset.url}
          alt={altText}
          loading='lazy'
          fill
          sizes='(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1280px'
          className='rounded-md shadow-lg'
        />
      </div>
    );
  },
};

const renderBody = (body: BlockContentType[]) => {
  return body.map((block) => {
    const handler = typeHandlers[block._type];
    if (!handler) {
      console.error(`No handler for block type "${block._type}"`);
      return null;
    }
    return <div key={block._key}>{handler(block)}</div>;
  });
};

// PostBody Component
export const PostBody = ({ body }: { body: BlockContentType[] }) => {
  return <div>{renderBody(body)}</div>;
};
