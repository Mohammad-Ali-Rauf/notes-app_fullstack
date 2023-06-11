import { type AppType } from 'next/dist/shared/lib/utils';
import '~/styles/globals.css';
import NextNProgress from 'nextjs-progressbar';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <NextNProgress />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
