import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actionCreators from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import './Auth.css';

class Auth extends Component {
    state = {
        authForm :{ 
            email: {
                elementType: 'input',
                elementConfigs: {
                    placeholder: 'Your E-Mail address',
                    type: 'email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                isValid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfigs: {
                    placeholder: 'Your Password',
                    type: 'password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                isValid: false,
                touched: false
            }
        },
        isSignup: true
    }

    isElementValid = (value, rules) => {
        if(!rules) {
            return true;
        }
        let isValid = false;
        if(rules.required) {
            isValid = value.trim() !== '';
        }
        if(rules.minLength) {
            isValid = value.trim().length >= rules.minLength && isValid;
        }
        if(rules.isEmail) {
            const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            isValid = reg.test(value) && isValid; 
        }
        return isValid;
    }


    inputChangeHandler = (event, id) => {
        const newAuthForm = {
            ...this.state.authForm
        };
        const changedElement = {
            ...this.state.authForm[id]
        }
        changedElement.value = event.target.value;
        changedElement.touched = true;
        changedElement.isValid = this.isElementValid(event.target.value, changedElement.validation);
        newAuthForm[id] = changedElement;
        this.setState({
            authForm: newAuthForm
        })
    }

    sumbmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.authForm.email.value, this.state.authForm.password.value, this.state.isSignup);
    }

    switchAuthHandler = () => {
        console.log(this.state.isSignup);   
        this.setState({
            isSignup: !this.state.isSignup
        });
    }

    componentDidMount() {
        if(!this.props.isBurgerBuilding && this.props.authRedirectPath !== '/') {
            this.props.setAuthRedirectPath();
        }
    }

    render() {
        if(this.props.isAuthenticated) {
            return <Redirect to={this.props.authRedirectPath}/>;
        }
        let formElements = [];
        for(let [key, value] of Object.entries(this.state.authForm)) {
            formElements.push({
                id: key,
                configs: value
            });
        }
        let form = (
            <form onSubmit={this.sumbmitHandler}>
                {formElements.map(formElement => <Input 
                key={formElement.id} 
                elementType={formElement.configs.elementType}
                elementConfigs={formElement.configs.elementConfigs}
                value={formElement.configs.value}
                invalid={!formElement.configs.isValid}
                shouldValidate={formElement.configs.validation}
                touched={formElement.configs.touched}
                changed= {(event) => { this.inputChangeHandler(event, formElement.id); }}/>)}
                <Button type="Success">SUBMIT</Button>
            </form>
        );
        return (
            <div className="AuthForm">
                { !this.props.loading && form }
                { this.props.loading ? <Spinner/> :
                <Button type="Danger" clicked={this.switchAuthHandler}>SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'} </Button> }
            </div>
            );
    }
}
const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        isAuthenticated: state.auth.idToken !== null,
        isBurgerBuilding: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actionCreators.auth(email, password, isSignup)),
        setAuthRedirectPath: () => dispatch(actionCreators.setAuthRedirectPath('/'))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);