import { useContext } from "react";
// import Home from "./pages/home/Home";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {BrowserRouter, Routes,Route,redirect,Navigate} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function App() {

  const {user} = useContext(AuthContext);
  return(
    <BrowserRouter>
      <Routes>
          <Route path="/" element={user ? <Home/> : <Register/>}/>
          <Route path="/login" element={user ?<Navigate to="/"/>:<Login/>}/>
          <Route path="/profile/:username" element={<Profile/>}/>
          <Route path="/register" element={user?<Navigate to="/"/>:<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
