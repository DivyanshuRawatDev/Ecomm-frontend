import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Products from "./pages/Products";
import Navbar from "./components/navbar/Navbar";
import LoginPage from "./pages/LoginPage";
import Signup from "./pages/Signup";
import Footer from "./components/footer/Footer";
import CartPage from "./pages/CartPage";
import ProtectedRoute from "./utils/ProtectedRoutes";
function App() {
  return (
    <ChakraProvider>
      <div className="App flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />} />

            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </ChakraProvider>
  );
}

export default App;
