import React, { Component, Fragment } from 'react';
import Class from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Context from '../../store/context';

class Layout extends Component 
{
   // Initialization required for use of context
   static contextType = Context;

   state = {
      showSideDrawer: false
   }

   componentDidMount()
   {
      this.context.setAuthentication(localStorage.getItem(process.env.REACT_APP_TOKEN) !== null);
   }

   sideDrawerClosedHandler = () => {
      this.setState({ showSideDrawer: false });
   }

   sideDrawerToggleHandler = () => {
      this.setState(state => {
         return { showSideDrawer: !state.showSideDrawer };
      });
   }

   render() {
      return (
         <Fragment>
            <Toolbar
               drawerToggleClicked={this.sideDrawerToggleHandler}
               auth={this.context.state.authenticate}
            />
            <SideDrawer
               show={this.state.showSideDrawer}
               closed={this.sideDrawerClosedHandler}
               auth={this.context.state.authenticate}
            />
            <main className={Class.Content}>
               {this.props.children}
            </main>
         </Fragment>
      );
   }
}

export default Layout;