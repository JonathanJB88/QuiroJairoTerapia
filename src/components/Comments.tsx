import { useEffect } from 'react';

export const Comments = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.commento.io/js/commento.js';
    script.defer = true;
    script.setAttribute('data-auto-init', 'true');
    script.setAttribute('data-url', window.location.href);

    const container = document.getElementById('commento');
    container?.appendChild(script);

    return () => {
      container?.removeChild(script);
    };
  }, []);

  return (
    <div className='mt-8'>
      <div id='commento'></div>
    </div>
  );
};
