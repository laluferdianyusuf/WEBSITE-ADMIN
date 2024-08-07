import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/app/store.js";
import Dashboard from "./pages/Dashboard.jsx";
import ExportBill from "./pages/ExportBill.jsx";
import InvoiceExport from "./pages/Invoice.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/billexport" element={<ExportBill />} />
          <Route path="/invoiceexport" element={<InvoiceExport />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
