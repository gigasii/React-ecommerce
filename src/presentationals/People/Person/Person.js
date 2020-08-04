import React, {Component, Fragment} from 'react';
import Class from './Person.css';
import withClass from '../../../utilities/withClass';
import Context from '../../../utilities/context';

class Person extends Component
{
  // Initialization required for use of context
  static contextType = Context;

  constructor(props)
  {
    super(props);
    this.inputReference = React.createRef();
  }

  componentDidMount()
  {
    this.inputReference.current.focus();
  }

  render()
  {
    console.log('[Person.js is rendered]');
    return (
      <Fragment>
        <p>Hi I'm {this.props.name}, I am {this.props.age}</p>
        <p onClick={this.props.click}>{this.context.contextText}</p>
        <input type="text" 
          onChange={this.props.change} 
          value={this.props.name}
          ref={this.inputReference}
        />
      </Fragment>
    );
  }
}

export default withClass(Person, Class.Person);