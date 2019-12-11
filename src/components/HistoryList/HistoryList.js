import React, { useState, useEffect } from 'react';
import Points from '../Points'
import './HistoryList.scss';
import Spinner from 'react-spinner-material';
import HistoryCard from '../HistoryCard'

export default function HistoryList(props) {
    const {history: {loading, result, error}} = props

    return (
        <div className="history">
            {!loading &&
                    result.map((result,index) => 
                        <HistoryCard result={result} key={index} />
                    )
            }
        </div>
    )
}