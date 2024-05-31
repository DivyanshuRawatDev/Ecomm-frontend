import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Products from "./pages/Products";
import Navbar from "./components/navbar/Navbar";
import LoginPage from "./pages/LoginPage";
import Signup from "./pages/Signup";
function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </ChakraProvider>
  );
}

export default App;
