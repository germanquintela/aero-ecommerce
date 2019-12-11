import React, { useState } from 'react';
import Points from '../Points'
import './ProductCard.scss';
import Spinner from 'react-spinner-material';


export default function ProductCard(props) {
    const {category, cost, img, name, aviable, id, addCart} = props
    const [loading, setLoading] = useState(true)


    return(
        <div className="product-card">
            <div className="product-card__image-container">  
                <img className={'product-card__image-container__image' + (loading ? ' hidden' : '')} src={img} alt="" onLoad={() => setLoading(false)} />
                <Spinner size={30} spinnerColor={"#0644a3"} spinnerWidth={2} visible={loading} />
            </div>
            <div className="product-card__info-container">
                <p className="product-card__info-container__type"> {category}</p>
                <div className="product-card__info-container__product">
                    <p className="product-card__info-container__product__name"> {name}</p>
                    <Points points={cost}/>
                </div>
                { !(aviable > 0) ?
                    <button className="product-card__info-container__button" onClick={() => addCart(id)}> Add to cart</button> :
                    <button className="product-card__info-container__button--disabled"> You need {aviable} points</button>
                }
                
            </div>
        </div>
    )

}