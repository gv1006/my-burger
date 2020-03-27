import  React from 'react';
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
        <Toolbar menuClicked={this.onMenuClick}/>
        <SideDrawer closed={this.onClicked} open={this.state.showSideDrawer}/>
        <main className="content">
            {this.props.children} 
        </main>
    </Aux>
        );
    }
};
export default Layout;
