import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBulder';

class App extends Component {
   render() {
      return (
         <Layout>
            <BurgerBuilder />
         </Layout>
      );
   }
}

export default App;
