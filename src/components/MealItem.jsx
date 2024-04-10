import React from "react";
import {currencyFormatter} from "../utils/formatting.js"

function MealItem({meal}) {
    return (
        <li className="meal-item">
            <article>
                {/* Need the url iot get the image from the images folder */}
                <img src={`http://localhost:3000/${meal.image}`} alt={meal.name}/>
                <div>
                    <h3>{meal.name}</h3>
                    {/* Use the formatter to render hte price */}
                    <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
                    <p className="meal-item-description">{meal.description}</p>
                </div>
                <p className="meal-item-actions">
                    <button>ADD TO CART</button>
                </p>
            </article>
        </li>
    )
}

export default MealItem;