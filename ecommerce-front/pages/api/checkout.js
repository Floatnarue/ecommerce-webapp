import mongooseConnect from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";

const stripe = require('stripe')(process.env.STRIPE_SK);
//The Stripe Node library provides convenient access to =>
//the Stripe API from applications written in server-side JavaScript.
//For collecting customer and payment information in the browser, use Stripe.js.
export default async function handleCheckout(req, res) {
  
    if (req.method !== 'POST') {
        res.json('Should be POST request !!'); 
        return;
    }

    const {
        name,tel,email,address,city,portal,cartProducts
    } = req.body ;
    
    try {
        await mongooseConnect() ;
    }
    catch(error) {
        console.log(error) ;
    }

    
    const productIds = cartProducts ; 
    //use set to find unique id
    const uniqueId = [...new Set(productIds)] ;
    const productInfos = await Product.find({_id: uniqueId}) ;
    
    let line_items = [] ;
    
    for (const productId of uniqueId) {
        const productInfo = productInfos.find(p => p._id.toString() === productId )
        const quantity = productIds.filter(id => id === productId)?.length || 0 ;
        
        if (quantity > 0 && productInfo) {
            line_items.push({
                quantity,
                price_data : {
                    currency : 'USD' ,
                    product_data : {name : productInfo.title},
                    unit_amount : quantity * productInfo.price *100 ,
                },
                
            })
        } 
    }

    const orderDoc = await Order.create({
        line_items,
        name,
        email,
        address,
        city,
        portal,
        tel,
        paid : false ,
    });

    const session = await stripe.checkout.sessions.create({
        line_items,
        mode : 'payment' ,
        customer_email : email ,
        success_url : process.env.PUBLIC_URL + '/cart?success=true',
        cancel_url : process.env.PUBLIC_URL + '/cart?canceled=true',
        metadata :{orderId :orderDoc._id.toString()},
        // extra data we want to sent
    })

    res.json({
        url : session.url 
        
    })
    

    

}
