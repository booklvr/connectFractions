// import EraserTFF from './assets/fonts/Eraser.ttf'
import EraserWOFF from './assets/fonts/eraser-webfont.woff'
import EraserWOFF2 from './assets/fonts/eraser-webfont.woff2'

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
    src: local("Eraser"), url('./assets/fonts/eraser-webfont.woff) format('woff'), 
    url('./assets/fonts/eraser-webfont.woff2)
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
