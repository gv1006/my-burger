import React from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorhandler';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            purchaseable: false,
            purchasing: false,
            loading: false,
            error: null
        }
    }

    updatePurchasable(updatedIngredients) {
        let valuesArray = Object.values(updatedIngredients);
        let noOfIngredientsSelected = valuesArray.reduce((sum, el)=>{
            return sum + el;
        }, 0);
        return noOfIngredientsSelected > 0;
    }

    updatePurchasing = () => {
        this.setState({purchasing: true});
    }

    closePurchasePopup = () => {
        this.setState({purchasing: false});
    }

    continuePurchasing = () => {
        // let queryParam = "?";
        // for(let [key, value] of Object.entries(this.props.ings)) {
        //     queryParam = queryParam.concat(encodeURIComponent(key), '=', encodeURIComponent(value), '&');
        // }
        // queryParam = queryParam.concat('price=', this.props.price);
        this.props.history.push({
            pathname: "/checkout"
        });
    }
    componentDidMount() {
        // axios.get('https://react-my-burger-a78ed.firebaseio.com/ingredients.json')
        // .then(res => {
        //     this.setState({
        //         ingredients: res.data
        //     });
        // })
        // .catch(error => {
        //     this.setState({error: true});
        // })
    }
    render() {
        let orderSummary = null, comp = null;
        if(this.props.ings) {
            const disabledInfo = {
                ...this.props.ings
            };
            for(let key in disabledInfo) {
                disabledInfo[key] = (this.props.ings[key] <= 0)
            }
            orderSummary = <OrderSummary 
                        ingredients={this.props.ings}
                        cancelPurchasing={this.closePurchasePopup}
                        continuePurchasing={this.continuePurchasing}
                        price={this.props.price.toFixed(2)}/>;
            if(this.state.loading) {
                orderSummary = <Spinner />
            }
            comp = <Aux>
                <Modal show={this.state.purchasing} closeModal={this.closePurchasePopup}>
                    { orderSummary }
                </Modal>
                <Burger ingredients={this.props.ings}/>
                <BuildControls 
                added={this.props.onIngredientsAdded} 
                removed={this.props.onIngredientsRemoved}
                disabled={disabledInfo}
                totalPrice={this.props.price.toFixed(2)}
                purchaseable={this.updatePurchasable(this.props.ings)}
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

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientsAdded: (ingredient) => dispatch({
            type: actionTypes.ADD_INGREDIENTS,
            ingredient: ingredient
        }),
        onIngredientsRemoved: (ingredient) => dispatch({
            type: actionTypes.REMOVE_INGREDIENTS,
            ingredient: ingredient
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));