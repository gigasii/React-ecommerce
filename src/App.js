import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import Radium, {StyleRoot} from 'radium';

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

  render() {
    const inlineStyle = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ":hover": {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };

    let togglePeople = null;
    if (this.state.showPeople)
    {
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
      // Dynamically change inline-styling
      inlineStyle.backgroundColor = 'red';
      inlineStyle[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      }
    }

    const classes = [];
    this.state.people.length >= 2 ? classes.push('red') : classes.push('bold');

    return (
      <StyleRoot>
        <div className="App">
          <p className={classes.join(' ')}>React Practice</p>
          <button
            style={inlineStyle}
            onClick={this.toggleVisibleHandler}
          >Toggle</button>
          {togglePeople}
        </div>
      </StyleRoot>
    );
  }
}

export default Radium(App);
