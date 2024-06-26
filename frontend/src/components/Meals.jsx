import useHttp from "../hooks/useHttp";
import MealItem from "./MealItem";
import Error from './Error.jsx';

//create the config object outside of the component to avoid infinite loops
const requestConfig = {};

export default function Meals() {
    const { 
        data: loadedMeals, 
        isLoading, 
        error,
        //initialData is an empty array: when component is first loaded, no data is returned and it won't fail
        //empty object
    } = useHttp("https://react-food-app-w70n.onrender.com/meals", requestConfig, []);


    if(isLoading) {
        return <h2 className="center">Please allow 2 to 3 minutes for the backend load data for the first time.
        Render (free backend hosting) spins down the backend after a period of inactivity...</h2>;
    }

    if(error) {
        return <Error title="Sum ting went wong." message={error} />;
    }

    return (
        <ul id="meals">
            {loadedMeals.map((meal) => (
            <MealItem key={meal.id} meal={meal}/>
            ))}
        </ul>
    );
}

