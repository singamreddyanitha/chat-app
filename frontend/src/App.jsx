import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

function App() {
  return (
    <>
      <div className="p-4 h-screen flex items-center justify-center">
        {/* <Login /> */}
        {/* <Signup /> */}
        <Home />
      </div>
    </>
  );
}

export default App;

{
  /* these are from deisyUi-> components->select button -> select buttons with brand colors (it is below  button table)
      <button className="btn">Button</button>
<button className="btn btn-neutral">Neutral</button>
<button className="btn btn-primary">Primary</button>
<button className="btn btn-secondary">Secondary</button>
<button className="btn btn-accent">Accent</button>
<button className="btn btn-ghost">Ghost</button>
<button className="btn btn-link text">Link</button> */
}
