const { createGlobalStyle } = require('styled-components')

export const GlobalStyle = createGlobalStyle`

:root{
    --cellWidth: 60px;
    --white: white;
    --blue: blue;
    --yellow: yellow;
 }

 *,*::before,*::after{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family: 'Poppins', sans-serif;
}
`
