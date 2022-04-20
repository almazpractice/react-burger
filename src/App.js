import React from 'react';
import AppHeader from './components/app-header/app-header'
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor'
import data from './utils/data'


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: data
        };
        this.onClick = this.onClick.bind(this);
        this.order = []
    }

    onClick (ingredient) {
        this.setState(prevState => ({
            ...prevState,
            data: this.state.data.map( (product) => {
                if (product.name === ingredient.name) {
                    if (product.type === 'bun' && product.__v == 1) {
                        return product
                    }
                    product.__v += 1
                    return product
                }
                return product
            } )
        }));
    }

    
    render() {
        const totalSum = this.state.data.reduce((acc, cur) => acc + cur.price * cur.__v, 0)
        return (
            <>
                <AppHeader />
                <main className='containerForBurgers'>
                    <BurgerIngredients data={this.state.data} onClick={this.onClick}/>
                    <BurgerConstructor data={this.state.data} state={this.state} total={totalSum} />
                </main>
            </>
        );
    }
}

export default App;
