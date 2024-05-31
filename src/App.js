import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Products from "./pages/Products";
import Navbar from "./components/navbar/Navbar";
function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/products" element={<Products />} />
        </Routes>
      </div>
    </ChakraProvider>
  );
}

export default App;
