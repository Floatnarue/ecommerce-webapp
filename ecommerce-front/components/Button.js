import styled , {css}from 'styled-components';
import { primary } from '@/lib/colors';

export const ButtonStyle = css`
      
    border : 0 ;
    padding : 5px 15px ;
    border-radius : 5px ;   
    box-sizing : border-box ;
    cursor : pointer ;
    display :inline-flex ;
    text-decoration : none ;
    font-weight : bold;
    svg {
      height : 15px ;
      margin-right :5px ;
      
    }
    align-items : center ;
    
    
    ${props => props.size === 'l' && css`
        font-size : 1.2rem ;
        padding :10px 20px ;
        svg {
          height : 18px ;
        }
    `} 
    ${props => props.primary && !props.outline && css`
        background-color : ${primary};
        color : #fff ;
        border : 1px solid ${primary}
    `}
    ${props => props.white && !props.outline && css`
        background-color : #fff;
        color : #000 ;
    `}

    ${props => props.black && !props.outline && css`
        background-color : #000;
        color : #000 ;
    `}
    ${props => props.black && props.outline && css`
        background-color : transparent;
        color : #000 ;
        border : 1px solid #000 ;
    `}


    ${props => props.white && props.outline && css`
        background-color : transparent;
        color : #fff ;
        border : 1px solid #fff ;
    `}

    ${props => props.primary && props.outline && css`
        background-color : transparent;
        color : ${primary} ;
        border : 1px solid ${primary} ;
    `}
    

    ${props => props.block && css `
        display :block;
        width :100% ;
    `};
    
`;



const StyledButton = styled.button`
    ${ButtonStyle}

`;


export default function Button({ children, ...rest }) {
  return (
    <StyledButton {...rest} >{children}</StyledButton>
  )
}
