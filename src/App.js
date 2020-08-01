import React, { Component } from 'react';
import Class from './App.css';
import Person from './Person/Person';

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

  retriveProperties = (className) => {
    return className.join(' ');
  }

  render() 
  {
    let togglePeople  = null;
    const textClass   = [Class.red, Class.bold];
    const btnClass    = [];  
    
    if (this.state.showPeople)
    {
      // Toggle people visibility
      togglePeople = (
        <div>
          {
            this.state.people.map((person, index) => {
              return <Person
                key={person.id}
                name={person.name}
                age={person.age}
                click={this.deletePersonHandler.bind(this, index)}
                changed={this.nameChangeHandler.bind(this, person.id)}
              />
            })
          }
        </div>
      );
      // Toggle button color
      btnClass.push(Class.Red);
    }
    
    return (
      <div className={Class.App}>
        <p className={this.retriveProperties(textClass)}>React Practice</p>
        <button
          className={this.retriveProperties(btnClass)}
          onClick={this.toggleVisibleHandler}
        >Toggle</button>
        {togglePeople}
      </div>
    );
  }
}

export default App;
