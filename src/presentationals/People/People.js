import React from 'react';
import Person from './Person/Person';

const people = (props) => {
   // Debugging for rendering
   console.log('[People.js is rendered]');

   return props.people.map((person, index) => {
      return <Person
         key={person.id}
         name={person.name}
         age={person.age}
         click={props.clicked.bind(this, index)}
         change={props.changed.bind(this, person.id)}
      />
   });
};

export default people;