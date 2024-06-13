import React, {useContext} from "react";
import {currencyFormatter} from "../utils/formatting.js"
import Button from "./UI/Button.jsx";
import CartContext from "../store/CartContext.jsx";

function MealItem({meal}) {
    const cartCtx = useContext(CartContext);
    function handleAddMealToCart(){
        cartCtx.addItem(meal);
    }
    return (
        <li className="meal-item">
            <article>
                {/* Need the url iot get the image from the images folder */}
                {/* <img src={`http://localhost:3000/${meal.image}`} alt={meal.name}/> */}
                <img src={`https://react-food-app-w70n.onrender.com/${meal.image}`} alt={meal.name}/>
                <div>
                    <h3>{meal.name}</h3>
                    {/* Use the formatter to render hte price */}
                    <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
                    <p className="meal-item-description">{meal.description}</p>
                </div>
                <p className="meal-item-actions">
                    <Button onClick={handleAddMealToCart}>ADD TO CART</Button>
                </p>
            </article>
        </li>
    )
}

export default MealItem;