// Hooks
import { useEffect, useState } from 'react'

// css
import './ourStore/store.css'

// axios
import axios from 'axios'

// components
import { Link } from 'react-router-dom'
import { useDebounce } from '../hooks/useDebounce'

const ProductSuggustion = ({ value, hideShearchField }) => {
  const debounced = useDebounce(value, 500) // 500ms delay
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // fetch APIs
  useEffect(() => {
    const source = axios.CancelToken.source()

    const getSuggestions = async () => {
      try {
        if (!debounced) {
          setSuggestions([])
          setError(null)
          return
        }

        setLoading(true)
        setError(null)

        const result = await axios.get(
          `http://localhost:5000/gallary-products`,
          { cancelToken: source.token }
        )
        const filtered = result.data.filter(item => 
        item.title.toLowerCase().includes(debounced.toLowerCase()) ||
        item.catigory.toLowerCase().includes(debounced.toLowerCase())
      );
        setSuggestions(filtered)
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request canceled')
        } else {
          console.log(err)
          setError('Something went wrong')
        }
      } finally {
        setLoading(false)
      }
    }

    getSuggestions()

    return () => {
      source.cancel()
    }
  }, [debounced])

  const handleClick = () => {
    hideShearchField()
  }

  return (
    <>
      {loading && <p className="text-center mt-3">Loading...</p>}
      {error && <p className="text-center mt-3 text-danger">{error}</p>}
      {!loading && !error && suggestions.length === 0 && debounced && (
        <p className="text-center mt-3">No results found</p>
      )}
      <ul className="product-suggestion mt-4">
        {suggestions.map((sug) => (
          <Link
            to={`productdetails/:${sug.id}`}
            className="d-flex gap-4 align-items-center my-3 text-decoration-none"
            key={sug.id}
            onClick={handleClick}
          >
            <div className="suggestion__img border">
              <img src={sug.img} alt="product-img" />
            </div>
            <div className="suggestion__info">
              <h3>{sug.title}</h3>
              <div className="product__tax my-2">
                <span className="price text-black">${sug.price}</span>
                <span className="altPrice">{sug.altPrice}</span>
              </div>
            </div>
          </Link>
        ))}
      </ul>
    </>
  )
}

export default ProductSuggustion
