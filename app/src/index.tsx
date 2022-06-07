import React from "react";
import { render } from "react-dom";
import { createGlobalStyle } from "styled-components";

import Root from "./components/Root";

const GlobalStyle = createGlobalStyle`
  html, body, #app {
    font-family: sans-serif;
    margin: 0; 
    padding: 0;
    width: 100%;
    height: 100%;
  }
  ul {
    list-style-type: none;
    margin: 0; 
    padding: 0;
  }
`;

render(
  <>
    <GlobalStyle />
    <Root />
  </>,
  document.getElementById("app")
);
