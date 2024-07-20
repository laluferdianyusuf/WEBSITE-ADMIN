import "./App.css";
import Sidebar from "./components/navigations/Sidebar";
import Dashboard from "./components/Admin";

function App() {
  return (
    <div>
      <Sidebar />
      <Dashboard />
    </div>
  );
}

export default App;
