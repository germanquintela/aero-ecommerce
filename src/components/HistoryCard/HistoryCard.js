import React, { useState } from 'react';
import Points from '../Points'
import Spinner from 'react-spinner-material';
import './HistoryCard.scss'


export default function HistoryCard(props) {
const {result: {img, category, cost, name}} = props
const [loading, setLoading] = useState(true)

    return (
        <div className="history-card">
            <div className="history-card__image-container">            
            
                <img className="history-card__image-container__image" src={img.url} alt="" onLoad={() => setLoading(false)} />
                <Spinner size={30} spinnerColor={"#0644a3"} spinnerWidth={2} visible={loading} />

            </div>
            <div className="history-card__info-container">
                <p className="history-card__info-container__type"> {category}</p>
                <div className="history-card__info-container__product">
                    <p className="history-card__info-container__product__name"> {name}</p>
                    <Points points={cost}/>
                </div>
            </div>
        </div>
    )
}