import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import elementStyles from './not-bun-elements.module.css';
import {ingredientType} from "../../../utils/data-type";
import React, {useRef} from 'react';
import {decreaseIngredient, moveIngredient, removeIngredient} from "../../../services/slices";
import {useDispatch} from "react-redux";
import {useDrag, useDrop} from "react-dnd";
import PropTypes from "prop-types";


const NotBunElements = React.memo(({ ingredient, index }) => {
    const dispatch = useDispatch()
    const ref = useRef(null)

    const handleRemove = () => {
        dispatch(removeIngredient(ingredient.uuid))
        dispatch(decreaseIngredient(ingredient))
    }

    const [{ id }, drop] = useDrop({
        accept: 'ingredients',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(ingredient, monitor) {
            if (!ref.current) return

            const current = ingredient.index;
            const target = index;

            if (current === target) return

            const targetBoundingRect = ref.current.getBoundingClientRect()
            const hoverMiddleY = (targetBoundingRect.bottom - targetBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - targetBoundingRect.top;

            if (current < target && hoverClientY < hoverMiddleY) return
            if (current > target && hoverClientY > hoverMiddleY) return

            dispatch(moveIngredient({ current, target }));

            ingredient.index = target
        }
    })

    const [{ opacity, transform }, drag] = useDrag({
        type: 'ingredients',
        item: () => {
            return { ingredient, index }
        },
        collect: monitor => ({
            transform: monitor.isDragging() ? "scale(0.96)" : "scale(1)",
            opacity: monitor.isDragging() ? 0.7 : 1
        })
    });

    drag(drop(ref));


    return (
        <div ref={ref} className={`${elementStyles.ingredient} mr-4`} style={{ opacity, transform }} data-handler-id={id}>
            
            <div  className={elementStyles.drag} >
                { ingredient.type !== "bun" ? <DragIcon type="primary" /> : <> </> }
            </div>
                <ConstructorElement
                    isLocked={ingredient.type === "bun"}
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                    handleClose={handleRemove}
                />
        </div>
    )
})


NotBunElements.propTypes = {
    ingredient: ingredientType.isRequired,
    index: PropTypes.number.isRequired
}


export default NotBunElements