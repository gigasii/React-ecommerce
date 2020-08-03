import React, { Component } from 'react';
import Class from './App.css';
import People from '../presentationals/People/People';
import Cockpit from '../presentationals/Cockpit/Cockpit';

class App extends Component {
  state = {
    people: [
      { id: 1, name: 'Giggs', age: 23 },
      { id: 2, name: 'Benny', age: 20 }
    ],
    otherProperty: 'Other property',
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
      <div className={Class.App}>
        <Cockpit
          showPeople={this.state.showPeople}
          clicked={this.toggleVisibleHandler}
        />
        {people}
      </div>
    );
  }
}

export default App;
