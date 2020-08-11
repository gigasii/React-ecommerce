import React, { Component, Fragment } from 'react';
import Modal from '../components/UI/Modal/Modal';

const withError = (WrappedComponent, axios) => {
   return class extends Component 
   {
      constructor(props)
      {
         super(props);
         this.state = {
            error: null
         }
         this.reqInterceptor = axios.interceptors.request.use(req => {
            this.errorNotifiedHandler();
            return req;
         })
         this.resInterceptor = axios.interceptors.response.use(res => res, err => {
            this.setState({error: err});
         });
      }

      componentWillUnmount()
      {
         axios.interceptors.request.eject(this.reqInterceptor);
         axios.interceptors.response.eject(this.resInterceptor);
      }

      errorNotifiedHandler = () => {
         this.setState({error: null});
      }

		render() 
		{
         const errorMessage = this.state.error ? this.state.error.message : null;
			return (
				<Fragment>
               <Modal 
                  show={this.state.error}
                  modalClosed={this.errorNotifiedHandler}
               >
						<p>{errorMessage}</p>
					</Modal>
					<WrappedComponent {...this.props} />
				</Fragment>
			);
		}
	}
}

export default withError;