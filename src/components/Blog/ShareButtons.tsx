import { IoIosCopy } from 'react-icons/io';
import { Social } from '@/components';
import { FaFacebookF, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { toastNotification } from '@/helpers';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

interface ShareButtonsProps {
  title: string;
  currentPath: string;
}

export const ShareButtons = ({ title, currentPath }: ShareButtonsProps) => {
  const url = encodeURIComponent(`${baseUrl}${currentPath}`);
  const text = encodeURIComponent(title);

  const copyShareLink = `${baseUrl}${currentPath}`;
  const whatsappShareLink = `https://api.whatsapp.com/send?text=${text}%20${url}`;
  const facebookShareLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  const twitterShareLink = `https://twitter.com/share?url=${url}&text=${text}`;
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(copyShareLink).then(() => {
      toastNotification('success', '¡Enlace copiado al portapapeles, listo para compartir!');
    });
  };

  return (
    <div className='grid grid-cols-2 gap-4 md:grid-cols-1'>
      <div className='flex items-center space-x-3'>
        <div className='p-1 rounded-md shadow-md bg-light-gray'>
          <IoIosCopy
            size={32}
            className='transition-all duration-200 ease-in-out cursor-pointer text-turquoise hover:text-navy-blue'
            onClick={copyLinkToClipboard}
          />
        </div>
        <p className='font-sans text-light-gray text-shadow'>Copia el enlace</p>
      </div>
      <div className='flex items-center space-x-3'>
        <div className='p-1 rounded-md shadow-md bg-light-gray'>
          <Social Icon={FaFacebookF} href={facebookShareLink} />
        </div>
        <p className='font-sans text-light-gray text-shadow'>Facebook</p>
      </div>
      <div className='flex items-center space-x-3'>
        <div className='p-1 rounded-md shadow-md bg-light-gray'>
          <Social Icon={FaTwitter} href={twitterShareLink} />
        </div>
        <p className='font-sans text-light-gray text-shadow'>Twitter</p>
      </div>
      <div className='flex items-center space-x-3'>
        <div className='p-1 rounded-md shadow-md bg-light-gray'>
          <Social Icon={FaWhatsapp} href={whatsappShareLink} />
        </div>
        <p className='font-sans text-light-gray text-shadow'>Whatsapp</p>
      </div>
    </div>
  );
};
