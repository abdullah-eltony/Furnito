// ** Components
import SingleProductDetails from '../components/SingleProductDetails'


// ** react import
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

// ** bootstrap Icons
import { X } from 'react-bootstrap-icons';

// ** axios import
import axios from 'axios';

// custom Hooks import
import { useGetLocation } from '../hooks/useGetLocation'

const ViewProduct = () => {

  useGetLocation()

  // ** vars
  let { id } = useParams();
  id = id.match(/\d+/g)[0];

  // Hooks
  const [targetProduct, setTargetProduct] = useState({})

  useEffect(() => {
    let result;
    const getTargetProduct = async () => {
      result = await axios.get(`http://localhost:5000/gallary-products?id=${id}`)
      setTargetProduct(result.data[0])
    }
    getTargetProduct()
  }, [id])


  return (
    <section className='py-4 overflow-hidden w-100 mt-0' style={{ position: 'absolute', top: '0' }}>
      <div className="container">
        <div className="productDtsl position-relative p-5 rounded bg-white" style={{ zIndex: '99' }}>
          <SingleProductDetails
            id={targetProduct.id}
            img={targetProduct.img}
            name={targetProduct.title}
            price={targetProduct.price}
            altPrice={targetProduct.altPrice}
            sales={targetProduct.sales}
            object={targetProduct}
          />
          <Link to='/shop' style={{ color: '#599a8d', position: 'absolute', top: '15px', right: '15px' }}>{<X size={30} />}</Link>
        </div>
      </div>
      <div className="overlay show bg-black"></div>
    </section>
  )
}

export default ViewProduct