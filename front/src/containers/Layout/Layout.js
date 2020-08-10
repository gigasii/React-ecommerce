import React, { Component, Fragment } from 'react';
import Class from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component
{
   state = {
      showSideDrawer: false
   }

   sideDrawerClosedHandler = () => {
      this.setState({
         showSideDrawer: false
      });
   }

   sideDrawerToggleHandler = () => {
      this.setState((prevState) => {
         return {showSideDrawer: !prevState.showSideDrawer}
      });
   }

   render()
   {
      return (
         <Fragment>
            <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
            <SideDrawer
               show={this.state.showSideDrawer}
               closed={this.sideDrawerClosedHandler}
            />
            <main className={Class.Content}>
               {this.props.children}
            </main>
         </Fragment>
      );
   }
}

export default Layout;