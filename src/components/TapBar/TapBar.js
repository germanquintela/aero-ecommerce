import React, { useState } from 'react';
import './TapBar.scss';


export default function ProductSection(props) {

    const { lowestPrice, highestPrice, mostRecent } = props
    const [tabActive, setTabActive] = useState('mostRecentTab')

    const activeMostRecent = () => {
        mostRecent()
        setTabActive('mostRecentTab')
    }

    const activeHighestPrice = () => {
        highestPrice()
        setTabActive('highestPriceTab')
    }

    const lowestPricePrice = () => {
        lowestPrice()
        setTabActive('lowestPriceTab')
    }
    return(
        <div className="tapbar">
            <button className={"tapbar__button" + (tabActive === 'mostRecentTab' ? ' tapbar__button--active' : '')} onClick={ () => activeMostRecent()}>Most recent</button>
            <button className={"tapbar__button" + (tabActive === 'lowestPriceTab' ? ' tapbar__button--active' : '')} onClick={ () => lowestPricePrice()}>Lowest price</button>
            <button className={"tapbar__button" + (tabActive === 'highestPriceTab' ? ' tapbar__button--active' : '')} onClick={ () => activeHighestPrice()}>Highest price</button>
        </div>
    )

}
