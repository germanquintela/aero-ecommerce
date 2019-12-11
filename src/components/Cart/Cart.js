import React from 'react'
import './Cart.scss'
import Points from '../Points'
import Close from "../../assets/close.svg"
import Spinner from 'react-spinner-material';

export default function Cart(props) {

    const {cartOpen, closeCart ,  cart, totalCost, userPoints, deleteProduct, buyProducts, loadingRedeem} = props

    return (
       <div className={'cart ' + (cartOpen ? 'cart--open' : '')}>
           
           <div className="cart__header">
               <button className="cart__header__close" onClick={() => closeCart()}><img src={Close} alt=''/></button>
                <p className="cart__header__title">Order summary</p>
                <div className="cart__header__total-container">
                    <p className="cart__header__total-container__title">Total</p>
                    { !(totalCost > userPoints) ? 
                        <Points points={totalCost} /> :
                        <p className="cart__header__total-container__points-red">Puntos insuficientes</p>
                    }
                    
                </div>

                <button className={"cart__header__button " + (loadingRedeem ? 'hidden' : '')} onClick={() => buyProducts()}>Buy now</button>
                <Spinner size={30} spinnerColor={"#0644a3"} spinnerWidth={2} visible={loadingRedeem} />

           </div>   

           <div className="cart__body">
                <p className="cart__body__title">My cart</p>

                { cart.length ? (
                    cart.map((productItem,index) => {
                        return (
                        <div className="cart__body__product" key={index} onClick={()=>deleteProduct(productItem._id)}>
                            <div className="cart__body__product__error">
                                <p className="cart__body__product__error__msj">Remove</p>
                            </div>
                            <p className="cart__body__product__name">{productItem.name}</p>
                            <p className="cart__body__product__cost"> {productItem.cost}</p>
                            
                        </div> )
                    })
                ) : <p className="cart__body__msj">Your cart is empty</p>
                }
           </div>
            
       </div>
    )
}
