import styled, { createGlobalStyle } from 'styled-components';

interface ButtonProps {
    btnType?: string;
}

const GlobalStyle = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'Nunito', sans-serif;
        background-color: #353535;
        color: #ffffff;
        display: flex;
        justify-content: center;
    }

`

export const Button = styled.button<ButtonProps>`
    padding: 10px 20px;
    font-size: 18px;
    background-color: ${props => props.btnType === "logoff" ? "red" : "#3a5d9b" };
    color: white;
    border: 1px solid ${props => props.btnType === "logoff" ? "darkRed" : "#253c63" };
    cursor: pointer;
    transition: all 500ms;

    &:hover {
        background-color: ${props => props.btnType === "logoff" ? "darkRed" : "#253c63" };
    }
`; 

export default GlobalStyle;