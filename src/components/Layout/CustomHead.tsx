import Head from 'next/head';

interface CustomHeadProps {
  title: string;
  description?: string;
  keywords?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
const defaultDescription = 'QuiroJairoTerapia - Alivio y bienestar en tus manos';
const defaultKeywords = 'QuiroJairoTerapia, Quiromasajes, Terapia, Alivio, Bienestar, Manos, Masajes';

export const CustomHead = ({ title, description, keywords }: CustomHeadProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description || defaultDescription} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='keywords' content={keywords || defaultKeywords} />
      <meta name='author' content='QuiroJairoTerapia' />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description || defaultDescription} />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={`${baseUrl}`} />
      <meta property='og:image' content={`${baseUrl}/images/quirojairoterapialogo.png`} />
      <meta property='og:site_name' content='QuiroJairoTerapia' />
      <meta property='og:locale' content='es_ES' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  );
};
