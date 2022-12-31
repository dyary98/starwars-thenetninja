import React from "react";
import Navbar from "./Components/Navbar";
import People from "./Components/People";
import Planets from "./Components/Planets";

import { useState } from "react";

function App() {
  const [page, setPage] = useState("planets");
  return (
    <div className="App">
      <h1>star wars info</h1>
      {console.log(page + "slaw")}
      <Navbar setPage={setPage} />
      {console.log(page)}
      <div className="content">
        {page === "planets" ? <Planets /> : <People />}
      </div>
    </div>
  );
}

export default App;
