import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './BurgerIngredients.css';

class BurgerIngredients extends Component{
    render() {
        let burgerIngredients = null;
        switch(this.props.ingredients) {
            case 'bread-bottom':
                burgerIngredients = <div className='BreadBottom'></div>;
                break;
            case 'bread-top':
                // BreadTop
                burgerIngredients = (
                <div className='BreadTop'>
                    <div className='Seeds1'></div>
                    <div className='Seeds2'></div>
                </div>
                );
                break;
            case 'meat':
                burgerIngredients = <div className='Meat'></div>;
                break;
            case 'cheese':
                burgerIngredients = <div className='Cheese'></div>;
                break;
            case 'bacon':
                burgerIngredients = <div className='Bacon'></div>;
                break;
            case 'salad':
                burgerIngredients = <div className='Salad'></div>;
                break;
            default:
                burgerIngredients = null;
        }
        return burgerIngredients;
    }
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.string.isRequired
};
export default BurgerIngredients;