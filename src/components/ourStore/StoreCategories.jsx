// ** axios import
import axios from 'axios'

// ** css 
import './store.css'

//  hooks
import { useEffect, useState } from 'react'

const StoreCategories = ({ setCurrentCaetegory }) => {

    // ** hooks
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const getCategories = async () => {
            try {
                const result = await axios.get('http://localhost:5000/catigories')
                setCategories(result.data)
            } catch (err) {
                return err.message
            }
        }
        getCategories()

    }, [])
    const handlClick = (event) => {
        const currentBtn = event.target;
        document.querySelector('.active-btn').classList.remove('active-btn')
        currentBtn.classList.add('active-btn')
        setCurrentCaetegory(currentBtn.innerText)
    }
    return (
        <div className="row">
            <div className="categories flex flex-wrap">
                <button onClick={handlClick} className={'active-btn'}>All</button>
                {categories.map((category, index) => (
                    <button onClick={handlClick} key={category}>{category}</button>
                ))}
            </div>
        </div>
    )
}

export default StoreCategories