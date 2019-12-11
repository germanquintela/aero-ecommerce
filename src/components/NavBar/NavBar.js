import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Points from "../Points"
import Cart from '../Cart'
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as Carticon } from "../../assets/cart.svg";
import { ReactComponent as Profile } from "../../assets/profile.svg";
import './NavBar.scss';

export default function NavBar(props) {

    const {product, userData: {loading, result}, modifyPoints} = props
    const [cart, setCart] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);
    const [totalCost, setTotalCost] = useState(0);
    const [loadingRedeem, setLoadingRedeem] = useState(false)
    const [errorRedeem, setErrorRedeem] = useState()

        useEffect(() => {
           const cartItems = cart
           if(product) {
            cartItems.push(product)
            setCart(cartItems)
            setTotalCost(totalCost + product.cost)
           }
           
        }, [ product ])



        const openCart = () => {
            setCartOpen(true);
        }

        const closeCart = () => {
            setCartOpen(false);
        }

        const deleteProduct = (id) => {
            const filtered = [];
            const result = cart.map(item => {
                if(item._id !== id) {
                    filtered.push(item)
                } else {
                    setTotalCost(totalCost - item.cost)
                }  
            })
             setCart(filtered)
        }

        const buyProducts = () => {
            setLoadingRedeem(true)
            cart.map(item => {
                (async () => {
                    try {
                         await fetch('https://coding-challenge-api.aerolab.co/redeem',  {
                            crossDomain:true,
                            method: 'POST',
                              headers: {
                                  Accept: 'application/json',
                                  'Content-Type': 'application/json',
                                  'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGU2ZjI2NjYzOTZhMjAwNmRhMzI0NjciLCJpYXQiOjE1NzU0MTY0MjJ9.Ih-gIHeea1BKWCqlCA4aJf88AynBYkny6rEiK291IxQ`
                              },
                              body: JSON.stringify({
                                productId: item._id
                              })
    
                          });
                        setLoadingRedeem(false);
                        console.log('ok')
                        modifyPoints(result.points - item.cost)
                    } catch (error) {
                        setErrorRedeem(error);
                        setLoadingRedeem(false);
                        console.log(error)
                    }
                })();
            })
            setCart([])
        }



    return(
        <nav className="nav">
            <Link to="/">
                <Logo/> 
            </Link>
           

            <div className="nav__items">
                <div className="nav__items__points-container">
                    <p className="nav__items__points-container__my-points">Points:</p>
                    {!loading &&
                        <Points points={result.points}/>
                    }
                </div>
                <div className="nav__items__cart-container">
                    <Link to='/me'>
                        <Profile/>
                    </Link>
                </div>
                <div className="nav__items__cart-container">
                    {(cart.length >= 1) &&
                        <div className="nav__items__cart-container__cart-pill">{cart.length }</div>
                    }
                    <Carticon onClick={() => openCart()}/>
                </div>
            </div>
            {!loading &&
                <Cart cartOpen={cartOpen} buyProducts={buyProducts} totalCost={totalCost} cart={cart} closeCart={closeCart} userPoints={result.points} deleteProduct={deleteProduct} loadingRedeem={loadingRedeem}/>
            }
        </nav>
    )
}

