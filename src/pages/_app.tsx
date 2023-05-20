import '@/styles/globals.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '@/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
