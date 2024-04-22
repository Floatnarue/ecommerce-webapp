import React from 'react'
import Header from '@/components/Header'
import Featured from '@/components/Featured'
import { Product } from '@/models/Product'
import mongooseConnect from '@/lib/mongoose'
import NewProducts from '@/components/NewProducts'
export default function Homepage({featuredProduct,newProducts}) {
  console.log(newProducts)

  console.log(featuredProduct)
  return (
    <div>
      <Header />
      <Featured featuredProduct={featuredProduct}/>
      <NewProducts newProducts = {newProducts}/>
    </div>
  )
}



export async function getServerSideProps () {

    await mongooseConnect() ;
    const featuredProductId ='6603d88fcad7072379f57b78';
    const featuredProduct = await Product.findById(featuredProductId) ;
    const newProducts =await Product.find({},null,{sort : {'_id' : -1 } , limit : 10});
    // find all possible products and sort by updatedTime , then limited to 10 items
    

    return {
      props : {
        featuredProduct : JSON.parse(JSON.stringify(featuredProduct)),
        newProducts : JSON.parse(JSON.stringify(newProducts))
      }
    }
}
 