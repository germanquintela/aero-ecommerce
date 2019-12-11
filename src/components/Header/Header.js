import React, { useState} from 'react';
import {useDispatch} from 'react-redux';
import { setSearchValueAction } from '../../actions/searchAction'

import './Header.scss';

export default function Header(props) {
    const {userData} = props

    const [search, setSearch] = useState('')
    
    const dispatch = useDispatch()

    const searchInput = (e) => {
        setSearch(e.target.value)
        dispatch(setSearchValueAction(search))
    }

    return (
        <header className="header">
            <h1 className="header__name">Hi {userData.name},</h1>
            <h2 className="header__title">What are you searching for?</h2>
            <input className="header__input" type="text" placeholder="E.g: iPhone, MacBook" onChange={(e) => searchInput(e)} />
        </header>
    )
}