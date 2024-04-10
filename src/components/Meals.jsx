import React, { useState, useEffect  } from "react";
import MealItem from "./MealItem";

function Meals() {
    //State to handle delay in getting meals when app loads
    const [loadedMeals, setLoadedMeals] = useState([]);

    useEffect(() =>{
        async function fetchMeals(){        
            const response = await fetch("http://localhost:3000/meals");
    
            if(!response.ok){
                //...
            }
            // const meals = await response.json();
            const meals = await response.json();
            //set meals state with backend response
            setLoadedMeals(meals);
        }
        fetchMeals();
    }, []);
  
    return (
        <ul id="meals">
            {loadedMeals.map((meal) => (
            <MealItem key={meal.id} meal={meal}/>
            ))}
        </ul>
    );
}

export default Meals;