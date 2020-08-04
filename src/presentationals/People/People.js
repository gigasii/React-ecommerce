import React, {useEffect} from 'react';
import Person from './Person/Person';

const people = (props) => {
   // UseEffect only called after render (According to dependencies)
   useEffect(() => {
      console.log('[People.js has updated]');
   }, [props.people]);

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