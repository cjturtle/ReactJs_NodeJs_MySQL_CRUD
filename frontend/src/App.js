import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "../src/pages/Home";
import Create from "./pages/Create";
import Details from "./pages/Details";
import Update from "./pages/Update";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/read" element={<Home />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
