import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
   margin: 0;
   padding: 0;
   box-sizing: border-box;
   outline: 0;
  }

  ::-moz-selection { /* Code for Firefox */
      color: ${props => props.theme.g5};
      background: ${props => props.theme.red};
    }

    ::selection {
      color: ${props => props.theme.g5};
      background: ${props => props.theme.red};
    }

  html,
  body,
  #root {
    width: 100%;
    height: 100%;
  }

  body {
    background: ${props => props.theme.g4};
    color: ${props => props.theme.g1};
  }

  body, input, button {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
  }

  button {
    cursor: pointer;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active  {
    -webkit-box-shadow: 0 0 0 30px ${props => props.theme.g3} inset !important;
  }
`;
