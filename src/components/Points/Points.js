import React from 'react';

import Points from "../../assets/points.svg"
import './Points.scss'

export default function userPoints(props) {

    const {points} = props
    return(
        <div className="points">
            <p className="points__amount" >{points}</p>
            <img className="points__icon" src={Points} alt="" />
        </div>
    )

}