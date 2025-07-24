import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Reset from "./pages/reset";
import NotFound from "./pages/notfound";
import Index from "./pages";
import ResetPassword from "./pages/resetPass";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/reset-password" element={<ResetPassword /> } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
