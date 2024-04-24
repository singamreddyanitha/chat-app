
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Signup from "./pages/signup/Signup.jsx";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext.jsx";

function App() {

  const {authUser} = useAuthContext();

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        {/* <Route path = "/" element = {<Home />} /> */}
        {/* <Route path = "/login" element = {<Login />} />  */}
        {/* <Route path = "/signup" element = {<Signup />} />  */}
        <Route path = "/" element = {authUser ? <Home /> : <Navigate to ="/login" />} /> 
        <Route path = "/login" element = {authUser ? <Navigate to = "/" /> : <Login />} /> 
        <Route path = "/signup" element = {authUser ? <Navigate to = "/" /> : <Signup />} /> 
      </Routes>

      <Toaster/>
      
    </div>
  )
}

export default App;




// STARTER CODE SNIPPET
// import "./App.css";
// import Home from "./pages/home/Home";
// import Login from "./pages/login/Login";
// import Signup from "./pages/signup/Signup";

// function App() {
//   return (
//     <>
//       <div className="p-4 h-screen flex items-center justify-center">
//         {/* <Login /> */}
//         {/* <Signup /> */}
//         <Home />
//       </div>
//     </>
//   );
// }

// export default App;

// {
//   /* these are from deisyUi-> components->select button -> select buttons with brand colors (it is below  button table)
//       <button className="btn">Button</button>
// <button className="btn btn-neutral">Neutral</button>
// <button className="btn btn-primary">Primary</button>
// <button className="btn btn-secondary">Secondary</button>
// <button className="btn btn-accent">Accent</button>
// <button className="btn btn-ghost">Ghost</button>
// <button className="btn btn-link text">Link</button> */
// }
