import { AnimatePresence } from 'framer-motion';
import { AppProps } from 'next/app';
import Script from 'next/script';
import { SessionProvider } from "next-auth/react"
import { useStore } from 'react-redux';
import  { wrapper } from 'redux/store';
import {persistStore } from "redux-persist"; 
import { PersistGate } from 'redux-persist/integration/react';

import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

function MyApp({ Component, pageProps: { session, ...pageProps} }: AppProps) {
  const store = useStore()
  return (

   <PersistGate persistor={persistStore(store)} loading={null}>
      <SessionProvider session={session}>
        <AnimatePresence>
          <Component {...pageProps} />
        {/* <!--Start of Tawk.to Script--> */}
      <Script id="tawk" strategy="lazyOnload">
        {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/63992715daff0e1306dc8891/1gk741cut';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
            })();  
        `}
          </Script>
         
          </AnimatePresence>
        </SessionProvider>
      </PersistGate>

   );
}

export default wrapper.withRedux(MyApp);
