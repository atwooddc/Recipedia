import "./App.css";
import HomePage from "./pages/homepage/home.page";
import Register from "./pages/register/register.page";

const App = () => {
  return (
    <div className="app">
      <h1>Welcome to Recipedia!</h1>
      <Register />
    </div>
  );
};

export default App;
