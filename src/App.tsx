import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import "./App.css";
import PokemonDetail from "./components/PokemonDetails";
import FetchData from "./components/FetchData";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FetchData />} />
          <Route path=":name/:id" element={<PokemonDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
