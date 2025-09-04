
// ** Components
import TrendySingleProduct from "../TrendySingleProduct"

// ** css
import './trendyProduct.css'

// ** hooks
import { useEffect, useState } from "react"

// ** axios import
import axios from "axios"

const TrendyProduct = () => {

  // ** hooks
  const [porducts,setProducts] = useState([])


  // ** fethch apis
  useEffect(()=>{
    const getProducts = async()=>{
      try {
        const result = await axios.get('http://localhost:5000/trendy-products')
        setProducts(result.data)
      }catch(err) {
        console.log(err)
      }
    }
    getProducts()
  },[])
  
  return (
    <section className='trendy-products py-4'>
        <div className="container">
            <div className="section-title">
                <h3 className='fs-2'>Trendy Product</h3>
                <p>Upgrade your lifestyle with our trendy products that blend functionality with modern</p>
            </div>
            <div className="row w-100 justify-content-start m-0">
              {porducts.map(product=>(
                <TrendySingleProduct key={product.id} 
                id={product.id} img={product.img} 
                title={product.title} price={product.price}
                altPrice={product.altPrice} 
                sales={product.sales}
                trendy={true}
                hasBtn={true}
                object={product}
                />
              ))}
            </div>
        </div>
    </section>
  )
}

export default TrendyProduct