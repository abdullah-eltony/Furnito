// ** react Hooks
import { useEffect, useState } from 'react'

// functions
import StoreCategories from './StoreCategories'

// components
import TrendySingleProduct from '../TrendySingleProduct'
import Loader from '../loaders/Loader'

// ** redux
import { useSelector } from 'react-redux'

// ** axios import
import axios from 'axios'


const Store = () => {
    const { loading } = useSelector(state => state.LoaderReducer)
    const [products, setProducts] = useState([])
    const [currentCategory, setCurrentCaetegory] = useState('')
    const [isloading, setIsLoading] = useState(loading)
    useEffect(() => {
        const getStoreProducts = async () => {
            setIsLoading(true)
            try {
                let result;
                if (currentCategory === 'All') {
                    result = await axios.get(`http://localhost:5000/gallary-products`)
                } else {
                    result = result = await axios.get(`http://localhost:5000/gallary-products?catigory=${currentCategory}`)
                }

                setProducts(result.data)
                setIsLoading(false)
            } catch (err) {
                console.log(err)
            }
        }
        getStoreProducts()
    }, [currentCategory])
    return (
        <section className='my-5 py-4 overflow-hidden position-static'>
            <div className="container position-static">
                <div className="section-title">
                    <h3>Our Store</h3>
                    <p>Explore a store where quality meets style. We bring you carefully selected products designed to make your home and lifestyle more beautiful.</p>
                </div>
                <div className="row mb-5">
                    <StoreCategories setCurrentCaetegory={setCurrentCaetegory} />
                </div>
                <div className="row">
                    {isloading && <Loader />}
                    {products.map(product => (
                        <TrendySingleProduct
                            img={product.img}
                            customStyle={true}
                            key={product.id}
                            title={product.title}
                            price={product.price}
                            altPrice={product.altPrice}
                            id={product.id}
                            hasBtn={true}
                            object={product}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Store