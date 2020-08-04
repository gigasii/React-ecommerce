import React, { Component, Fragment } from 'react';
import Class from './App.css';
import People from '../presentationals/People/People';
import Cockpit from '../presentationals/Cockpit/Cockpit';
import withClass from '../utilities/withClass';
import Context from '../utilities/context';

class App extends Component {
  state = {
    people: [
      { id: 1, name: 'Giggs', age: 23 },
      { id: 2, name: 'Benny', age: 20 }
    ],
    showContext: 'Delete',
    showPeople: false
  }

  nameChangeHandler = (id, event) => {
    const index = this.state.people.findIndex(person => {
      return person.id === id;
    })
    const newPeople = [...this.state.people];
    newPeople[index].name = event.target.value;

    this.setState({
      people: newPeople
    });
  }

  toggleVisibleHandler = () => {
    this.setState({
      showPeople: !this.state.showPeople
    })
  }

  deletePersonHandler = (index) => {
    const people = [...this.state.people];
    people.splice(index, 1);
    this.setState({
      people: people
    });
  }

  render() 
  {
    // Toggle people visibility
    let people = null;
    if (this.state.showPeople)
    {
      people = <People
        people={this.state.people}
        clicked={this.deletePersonHandler}
        changed={this.nameChangeHandler}
      />
    }
    
    return (
      <Fragment>
        <Cockpit
          showPeople={this.state.showPeople}
          clicked={this.toggleVisibleHandler}
        />
        <Context.Provider 
          value={{
            contextText: this.state.showContext
          }}
        >
          {people}
        </Context.Provider>
      </Fragment>
    );
  }
}

export default withClass(App, Class.App);
