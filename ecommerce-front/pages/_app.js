import { CartContextProvider } from '@/components/CartContext';
import { createGlobalStyle } from 'styled-components';

const GlobalStyled = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
  body {
    background-color : #eee ;
    padding : 0;
    margin : 0 ;
    font-family: "Roboto", sans-serif;
  }
`;
export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyled />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>

    </>
  );
}
