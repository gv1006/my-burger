import React from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorhandler';

const INGREDIENTS_PRICE = {
    salad: 1.5,
    bacon: 2.6,
    meat: 3.4,
    cheese: 1.5
};

class BurgerBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: null,
            totalPrice: 0,
            purchaseable: false,
            purchasing: false,
            loading: false,
            error: null
        }
        this.onIngredientsAdded = this.onIngredientsAdded.bind(this);
        this.onIngredientsDeleted = this.onIngredientsDeleted.bind(this);
    }

    updatePurchasable(updatedIngredients) {
        let valuesArray = Object.values(updatedIngredients);
        let noOfIngredientsSelected = valuesArray.reduce((sum, el)=>{
            return sum + el;
        }, 0);
        this.setState({purchaseable: noOfIngredientsSelected > 0} );
    }

    updatePurchasing = () => {
        console.log('update Purchasing');
        this.setState({purchasing: true});
    }
    onIngredientsAdded(type) {
        let oldIngredientsCount = this.state.ingredients[type];
        let newIngredientCount = oldIngredientsCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = newIngredientCount;
        let updatedPrice = this.state.totalPrice + INGREDIENTS_PRICE[type];
        this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice});
        this.updatePurchasable(updatedIngredients);
    }

    onIngredientsDeleted(type) {
        let oldIngredientsCount = this.state.ingredients[type];
        if(oldIngredientsCount <= 0) {
            return;
        }
        let newIngredientCount = oldIngredientsCount - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = newIngredientCount;
        let updatedPrice = this.state.totalPrice - INGREDIENTS_PRICE[type];
        this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice});
        this.updatePurchasable(updatedIngredients);
    }

    closePurchasePopup = () => {
        console.log("closing poptup");
        this.setState({purchasing: false});
    }

    continuePurchasing = () => {
        console.log("continue");
        let queryParam = "?";
        for(let [key, value] of Object.entries(this.state.ingredients)) {
            queryParam = queryParam.concat(encodeURIComponent(key), '=', encodeURIComponent(value), '&');
        }
        queryParam = queryParam.concat('price=', this.state.totalPrice);
        this.props.history.push({
            pathname: "/checkout",
            search: queryParam
        });
    }
    componentDidMount() {
        axios.get('https://react-my-burger-a78ed.firebaseio.com/ingredients.json')
        .then(res => {
            this.setState({
                ingredients: res.data
            });
        })
        .catch(error => {
            this.setState({error: true});
        })
    }
    render() {
        let orderSummary = null, comp = null;
        if(this.state.ingredients) {
            const disabledInfo = {
                ...this.state.ingredients
            };
            for(let key in disabledInfo) {
                disabledInfo[key] = (this.state.ingredients[key] <= 0)
            }
            orderSummary = <OrderSummary 
                        ingredients={this.state.ingredients}
                        cancelPurchasing={this.closePurchasePopup}
                        continuePurchasing={this.continuePurchasing}
                        price={this.state.totalPrice.toFixed(2)}/>;
            if(this.state.loading) {
                orderSummary = <Spinner />
            }
            comp = <Aux>
                <Modal show={this.state.purchasing} closeModal={this.closePurchasePopup}>
                    { orderSummary }
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                added={this.onIngredientsAdded} 
                removed={this.onIngredientsDeleted}
                disabled={disabledInfo}
                totalPrice={this.state.totalPrice.toFixed(2)}
                purchaseable={this.state.purchaseable}
                onOrderNowClick={this.updatePurchasing}/>
            </Aux>
        }
        else if(this.state.error) {
            comp = <p>Ingredients cannot be loaded now!!!!!</p>
        }
        else {
            comp = <Spinner />
        }
        return(
            <Aux>
                {comp}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);