import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${props => props.alt ? 'red' : 'green'};
  color: white;
  font: inherit;
  border: 1px solid blue;
  padding: 8px;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
    color: black;
  }
`;

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
    }

    const classes = [];
    this.state.people.length >= 2 ? classes.push('red') : classes.push('bold');

    return (
      <div className="App">
        <p className={classes.join(' ')}>React Practice</p>
        <StyledButton
          alt={this.state.showPeople}
          onClick={this.toggleVisibleHandler}
        >Toggle</StyledButton>
        {togglePeople}
      </div>
    );
  }
}

export default App;
