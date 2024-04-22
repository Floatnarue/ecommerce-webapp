import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Table from "@/components/Table";
import axios from 'axios';
import { useContext, useEffect, useState } from "react";
import styled from 'styled-components';


const ColumnsWrapper = styled.div` 
    display :grid ;
    grid-template-columns : 1.3fr .7fr ;
    gap :40px ;
    margin-top : 40px ;
`;


const Box = styled.div`
    background-color : #fff ;
    border-radius : 10px ;
    padding : 30px; 
`;

const ProductInfoCell = styled.td`
    padding : 10px ;
    

`;

const ProductImageBox = styled.div`
    max-width : 100 px ;
    max-height : 100 px ;
    padding : 10px;
    display :flex;
    justify-content : center ;
    align-items : center ;
    border-radius : 10px ;
    border : 1px solid rgba(0,0,0,.1) ;
    img{
        max-width : 80px ;
        max-height : 80px ;
    }
`;


const QuantityLabel = styled.span`
    padding : 0 3px ;
`;


const CityHolder = styled.div`
    display :flex ;
    gap : 5px ;
`;


export default function CartPage() {
    const { cartProducts, addProduct, reduceProduct, clearCart } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [portal, setPortal] = useState('');
    const [city, setCity] = useState('');
    const [tel, setTel] = useState('');
    const [isSuccess,setIsSuccess] = useState(false);
    useEffect(() => {
        if (cartProducts.length > 0) {
            try {
                axios.post('/api/cart', { ids: cartProducts }).then(
                    response => {
                        setProducts(response.data);
                    }
                );
            } catch (error) {
                console.log(error)
            }
        }
        else {
            setProducts([]);
        }
    }, [cartProducts])

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        if (window?.location.href.includes('success')) {
            setIsSuccess(true);
            clearCart();
        }
    }, []);

    function moreOfThisProduct(id) {
        addProduct(id);
    }

    function lessOfThisProduct(id) {
        reduceProduct(id);
    }


    async function doPayment() {
        const response = await axios.post('/api/checkout', {
            name, email, address, tel, city, portal, cartProducts,
        });
        if (response.data.url) {
            window.location = response.data.url;
        }
    }

    let total = 0;

    for (const productId of cartProducts) {
        const price = products.find(p => p._id === productId)?.price || 0;
        total += price;

    }

    if (isSuccess) {
        return (
            <>
                <Header />
                <Center>
                    <Box>
                        <h1>
                            Thank you for your order!
                        </h1>
                        <p>the receipt will be in your email soon</p>
                    </Box>
                </Center>
            </>


        )
    }


    return (
        <>
            <Header />
            <Center>
                <ColumnsWrapper>
                    <Box>
                        <h2>Cart</h2>
                        {!cartProducts?.length && (
                            <div>Your cart is empty</div>
                        )}
                        {cartProducts?.length > 0 && (
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Price/unit</th>
                                        <th>Total price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr>
                                            <ProductInfoCell>
                                                <ProductImageBox>
                                                    <img src={product.images[0]} alt='' />
                                                </ProductImageBox>

                                                {product.title}
                                            </ProductInfoCell>
                                            <td>
                                                <Button onClick={() => lessOfThisProduct(product._id)}>-</Button>
                                                <QuantityLabel>
                                                    {cartProducts.filter(id => id === product._id).length}
                                                </QuantityLabel>
                                                <Button onClick={() => moreOfThisProduct(product._id)}>+</Button>
                                            </td>
                                            <td>${product.price}</td>
                                            <td>${product.price * cartProducts.filter(id => id === product._id).length}</td>
                                        </tr>


                                    ))}

                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>${total}</td>
                                    </tr>



                                </tbody>
                            </Table>
                        )}

                    </Box>
                    <Box>
                        {!!cartProducts?.length && (
                            <Box>
                                <h3>Order confirmation</h3>

                                <Input type="text" placeholder="Name" name="name" value={name} onChange={(ev) => setName(ev.target.value)} />
                                <Input type="text" placeholder="Address" name='address' value={address} onChange={(ev) => setAddress(ev.target.value)} />
                                <CityHolder>
                                    <Input type="text" placeholder="City" name='city' value={city} onChange={(ev) => setCity(ev.target.value)} />
                                    <Input type="text" placeholder="Portal Code" name='portal' value={portal} onChange={(ev) => setPortal(ev.target.value)} />
                                </CityHolder>
                                <Input type="text" placeholder="Tel" value={tel} name='tel' onChange={(ev) => setTel(ev.target.value)} />
                                <Input type="text" placeholder="Email" value={email} name='email' onChange={(ev) => setEmail(ev.target.value)} />
                                <input type="hidden" name='products' value={cartProducts.join(',')} />
                                <Button black block outline onClick={doPayment}  >Continue to payment</Button>





                            </Box>
                        )}
                    </Box>

                </ColumnsWrapper>
            </Center>


        </>

    )
}
