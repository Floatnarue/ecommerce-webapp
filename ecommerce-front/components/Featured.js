import styled from 'styled-components';
import Center from './Center';

import Button from './Button';
import ButtonLink from './ButtonLink';
import CartIcon from './icons/cart';
import { useContext } from 'react';
import { CartContext } from './CartContext';



const Bg = styled.div`
    background-color : #222 ;
    color : #fff ;
    padding : 50px 0 ;
`;


const Title = styled.h1`
    margin : 0 ;
    font-weight : normal ;
`;

const Desc = styled.p`
    color  : #aaa ;
    font-size : .8rem ;
`;

const ColumnWrapper = styled.div`
    display : grid ;
    grid-template-columns : 1fr ;
    gap : 40px ;
    img{
        max-width: 100%;
        max-height: 200px;
        display: block;
        margin: 0 auto;
      }
    div:nth-child(1) {
        order: 2;
      }
    @media screen and (min-width: 768px) {
        grid-template-columns: 1.1fr 0.9fr;
        div:nth-child(1) {
          order: 0;
        }
        img{
          max-width: 100%;
        }
      }
    `;


const Column = styled.div`
    display :flex ;
    align-items : center ;
`;


const ButtonWrapper = styled.div`
    display : flex ;
    gap : 10px ;
    margin-top : 20px;
`;





export default function Featured({ featuredProduct }) {
    const { addProduct } = useContext(CartContext);

    function addFeaturedToCart(product) {
        addProduct(product._id)
    }



    return (
        <Bg>
            <Center>
                <ColumnWrapper>
                    <Column>
                        <div>
                            <Title>
                                {featuredProduct?.title}
                            </Title>
                            <Desc>
                                {featuredProduct?.description}
                            </Desc>
                            <ButtonWrapper>
                                <ButtonLink white={1} outline={1} href={'/products/' + featuredProduct?._id} >
                                    Read more
                                </ButtonLink>
                                <Button primary onClick={addFeaturedToCart} >
                                    <CartIcon />
                                    Add to cart
                                </Button>
                            </ButtonWrapper>

                        </div>
                    </Column>
                    <Column>
                        <img

                            // insert the aws s3 image link would be nice !!
                            src="https://media.wired.com/photos/6500ad57fe61eb702d721b58/4:3/w_1913,h_1435,c_limit/Apple-iPhone-15-Pro-Hero-Gear.jpg"
                            alt="">

                        </img>
                    </Column>

                </ColumnWrapper>

            </Center>

        </Bg>
    );
};
