import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import TapBar from '../TapBar'
import ProductCard from '../ProductCard'
import './ProductSection.scss';



export default function ProductSection(props) {

    const { title, getProductsCart, productsData: { result }, userData: {points}} = props

    const [products, setProducts] = useState(result)
    const [searchResult, setSearchResult] = useState('result')
    const [cartProducts, setCartProducts] = useState([])
    
    const searchValue = useSelector(state => state.search)

    useEffect(() => {

        if(searchValue === "" || searchValue === " " || !searchValue || searchValue.length <= 1 ) {
            setProducts(result);
            setSearchResult(searchValue.search)
        } else {
            const filtered = result.filter(function(item) {
                const productToFilter = item.name.toUpperCase()
                return productToFilter.indexOf(searchValue.search.toUpperCase()) > -1
            })
            setProducts(filtered) 
        }
        
    }, [searchValue]);

    const mostRecent = () => {
        setProducts(result);     
    }

    const lowestPrice = () => {
        const descending = result.slice(0).sort((a, b) => (a.cost - b.cost))
        setProducts(descending);     
    }

    const highestPrice = () => {    
        const ascending = result.slice(0).sort((a, b) => (b.cost - a.cost))
        setProducts(ascending);    
    }



    const addCart = (id) => {
        // const productsState = cartProducts

        result.map((product, index) => {
            if(id === product._id) {
                //  return productsState.push(product)
                getProductsCart(product)
           }
        
        })

        // setCartProducts(productsState)

    }


    return(
        <section className="product-section">
            <div className="product-section__header">
                <h3 className="product-section__header__title">{title}</h3>
                <TapBar lowestPrice={lowestPrice} highestPrice={highestPrice}  mostRecent={mostRecent}/>
            </div>
            <div className="product-section__body">
                {products.map(product => 
                    <ProductCard key={product._id} category={product.category} cost={product.cost} name={product.name} id={product._id} img={product.img.url} addCart={addCart} aviable={(product.cost > points) ? product.cost - points : -1} />
                )}
            </div>
            <div className="product-section__footer">
                <p className="product-section__footer__count">{products.length} of {result.length} Products</p>
            </div>

        </section>
    )

}