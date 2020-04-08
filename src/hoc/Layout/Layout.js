import  React from 'react';
import { connect } from 'react-redux';

import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import './Layout.css';

class Layout extends React.Component  {
    state={
        showSideDrawer: false
    }

    onClicked = () => {
        console.log("onClicked");
        this.setState({
            showSideDrawer: false
        });
    }

    onMenuClick = () => {
        this.setState({
            showSideDrawer: !this.state.showSideDrawer
        });
    }

    render() {
        return (
            <Aux>
        <Toolbar 
            menuClicked={this.onMenuClick}
            isAuth={this.props.isAuthenticated}/>
        <SideDrawer closed={this.onClicked} open={this.state.showSideDrawer}/>
        <main className="content">
            {this.props.children} 
        </main>
    </Aux>
        );
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.idToken !== null
    };
};

export default connect(mapStateToProps)(Layout);
