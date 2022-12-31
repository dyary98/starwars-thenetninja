import React from "react";

const Person = ({ person }) => {
  return (
    <div>
      <div className="card">
        <h3>{person.name}</h3>
        <p>birth_year - {person.birth_year} </p>
        <p>gender - {person.gender}</p>
      </div>
    </div>
  );
};

export default Person;
