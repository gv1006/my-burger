import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return class ErrorHandlerComp extends Component {
        state={
            error: null
        }
        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(null, err=>{
                this.setState({error: err.message});
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        clicked = () => {
            this.setState({
                error: null
            });
        }
        render() {
            console.log(this.state.error);
            return(
                <Aux>
                    <Modal show={this.state.error} closeModal={this.clicked}>{this.state.error}</Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    }
}

export default withErrorHandler;