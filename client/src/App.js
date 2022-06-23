import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import CreatePokemon from "./components/CreatePokemon";
import Details from "./components/Details";
function App() {
  return (
    //en cada path le digo renderizame este componente
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/pokemon/:id" element={<Details />} />
          <Route path="/createpokemon" element={<CreatePokemon />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
