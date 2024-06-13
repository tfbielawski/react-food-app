import LOGO from "../assets/logo.jpg";
import React, {useContext} from "react";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from '../store/UserProgressContext.jsx';

function Header() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    //Reduce the array of items to a single value
    //total is new derived value, from calling reduce on each item in array
    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0);

    function handleShowCart(){
        userProgressCtx.showCart();
    }
    return (
        <header id="main-header">
            <div id="title">
                <img src={LOGO} alt="Food Order Web Application"/>
                <h1>React Food Order Web Application</h1>
            </div>
            <nav>
                <Button textOnly={true} onClick={handleShowCart}>Cart ({totalCartItems})</Button>
            </nav>
        </header>
    )
}

export default Header;