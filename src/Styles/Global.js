import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    *{
        box-sizing:border-box;
        maring:0;
        padding:0;
    }
      body {
        background: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.text};
      }
`

export default GlobalStyles;