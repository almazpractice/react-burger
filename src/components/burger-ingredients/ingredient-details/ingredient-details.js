import styles from './ingredient-details.module.css';
import {useDispatch, useSelector} from "react-redux";
import PropertiesText from './properties-text/properties-text';
import {useLocation} from "react-router-dom";
import {useEffect} from "react";
import {setSelectedIngredient} from "../../../services/slices";



function IngredientDetails () {
    const location = useLocation();
    const dispatch = useDispatch();
    const allIngredients = useSelector(state => state.ingredients.ingredients);
    const ingredient = useSelector(state => state.ingredients.selectedIngredient)
    useEffect(() => {
        const id = location.pathname.split("/")[2]
        const ingredient = allIngredients.filter(x => x._id === id)[0]
        dispatch(setSelectedIngredient(ingredient));
    }, [dispatch, location, allIngredients])

    return (
        ingredient &&
    <section className={`${styles.detailSection} p-10 pb-5`}>
        <img src={ingredient.image_large} alt={ingredient.name}/>
        <p className="text text_type_main-medium mt-3 mb-8"> {ingredient.name}</p>
        <div className={styles.propertiesWrapper}>
            <PropertiesText name="Каллории, ккал" value={ingredient.calories}/>
            <PropertiesText name={"Белки, г"} value={ingredient.proteins}/>
            <PropertiesText name={"Жиры, г"} value={ingredient.fat}/>
            <PropertiesText name={"Углеводы, г"} value={ingredient.carbohydrates}/>
        </div>
    </section>
    )
}

export default IngredientDetails
