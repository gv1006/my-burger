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
import * as actionCreators from '../../store/actions/index'; 

class BurgerBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            purchaseable: false,
            purchasing: false,
            loading: false,
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
        if(this.props.isAuthenticated) {
            this.setState({purchasing: true});
        } else {
            this.props.setAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    closePurchasePopup = () => {
        this.setState({purchasing: false});
    }

    continuePurchasing = () => {
        this.props.onInitPurchased();
        this.props.history.push({
            pathname: "/checkout"
        });
    }
    componentDidMount() {
        this.props.onInitIngredients();
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
                onOrderNowClick={this.updatePurchasing}
                isAuth={this.props.isAuthenticated}/>
            </Aux>
        }
        else if(this.props.err) {
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
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        err: state.burgerBuilder.error,
        isAuthenticated: state.auth.idToken !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientsAdded: (ingredient) => dispatch(actionCreators.addIngredients(ingredient)),
        onIngredientsRemoved: (ingredient) => dispatch(actionCreators.removeIngredients(ingredient)),
        onInitIngredients: () => dispatch(actionCreators.initIngredients()),
        onInitPurchased: () =>dispatch(actionCreators.purchaseBurgerInit()),
        setAuthRedirectPath: (path) => dispatch(actionCreators.setAuthRedirectPath(path))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));