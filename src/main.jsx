import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/app/store.js";
import Dashboard from "./pages/Dashboard.jsx";
import Product from "./pages/Product.jsx";
import Bills from "./pages/Bills.jsx";
import Hotel from "./pages/Hotel.jsx";
import Slicing from "./pages/Slicing.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bills" element={<Bills />} />
          <Route path="/student" element={<Product />} />
          <Route path="/hotel" element={<Hotel />} />
          <Route path="/slicing" element={<Slicing />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
