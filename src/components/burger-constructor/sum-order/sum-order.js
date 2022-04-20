import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"


const SumOrder = ({ total }) => {
    return (
        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }} className="mt-10">
            <div style={{ display: 'flex', alignItems: 'center' }} className="mr-10">
                <span className="text text_type_digits-medium mr-2"> {total} </span>
                <CurrencyIcon type="primary"/>
            </div>
            <Button type="primary" size="large">Оформить заказ</Button>
        </section>
    )
}

export default SumOrder