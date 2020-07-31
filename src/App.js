import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    person: {
      name: 'Giggs',
      age: 23
    },
    otherProperty: 'Other property'
  }

  personChangeHandler = (name_, age_) => {
    this.setState({
      person: {
        name: name_,
        age: age_
      }
    });
  }

  nameChangeHandler = (event) => {
    this.setState({
      person: {
        name: event.target.value,
        age: 23
      }
    });
  }

  render() {
    return (
      <div className="App">
        <h1>React Practice</h1>
        <Person 
          name={this.state.person.name} 
          age={this.state.person.age}
          clicked={this.personChangeHandler.bind(this, 'Max', '10')}
          changed={this.nameChangeHandler}
        >{this.state.otherProperty}
        </Person>
      </div>
    );
  }
}

export default App;
