import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link rel='stylesheet' href='https://rsms.me/inter/inter.css' />
        <link href='https://assets.calendly.com/assets/external/widget.css' rel='stylesheet' />
        <script async src='https://assets.calendly.com/assets/external/widget.js' type='text/javascript' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
