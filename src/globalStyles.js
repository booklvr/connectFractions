import Eraser from './assets/fonts/Eraser.ttf'
import Kbreindeergames from './assets/fonts/Kbreindeergames-ra2O.ttf'

const { createGlobalStyle } = require('styled-components')

export const GlobalStyle = createGlobalStyle`

:root{
    --cellWidth: 60px;
    --white: white;
    --blue: blue;
    --yellow: yellow;
 }

 @font-face {
     font-family: 'Eraser';
     src: url(${Eraser}) format('ttf')
 }

 
 @font-face {
    font-family: 'Kbreindeergames';
    src: url(${Kbreindeergames}) format('ttf')
}

 *,*::before,*::after{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family: 'Poppins', sans-serif;
}

body,
    html,
    a {
        font-family: 'Poppins', sans-serif;
            }
    body {

        // margin:0;
        // padding:0;
        border: 0;
        outline: 0;
        

        overflow-x: hidden;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin:0;
        padding:0;
    }
    a {

        text-decoration: none;
        outline: none;
    }
    button{
        border:none;
        outline:none;
        &:focus{
            outline:none;
        }
    }

    *:focus {
        outline: none;
    }
`
