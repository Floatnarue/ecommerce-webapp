
import styled from 'styled-components';
import ProductBox from './ProductBox';
import Center from './Center';


const ProductGrid = styled.div`
    display :grid ;
    grid-template-columns : 1fr 1fr 1fr 1fr;
    gap : 20px ;
    padding-top : 20px ;

`;

const Title = styled.h2`
  font-size: 2rem;
  margin:30px 0 20px;
  font-weight: normal;
`;
export default function NewProducts({ newProducts }) {
    return (

        <Center>
            <Title>New Arrivals</Title>
            <ProductGrid>
                {newProducts?.length > 0 && newProducts.map(product => (
                    <ProductBox {...product} />
                ))}

            </ProductGrid>
        </Center>

    )
}
