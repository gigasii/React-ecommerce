import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import UIProvider from './store/UIProvider';

const app = (
   <UIProvider>
      <BrowserRouter>
         <App/>
      </BrowserRouter>
   </UIProvider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
