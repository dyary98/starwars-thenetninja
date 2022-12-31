import React from "react";

const Planet = ({ planet }) => {
  return (
    <div>
      <div className="card">
        <h3>{planet.name}</h3>
        <p>Population - {planet.population} </p>
        <p>Terrain - {planet.terrain}</p>
      </div>
    </div>
  );
};

export default Planet;
