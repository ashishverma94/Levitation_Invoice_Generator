import {
  HomePage,
  LoginPage,
  SignupPage,
  InvoicePage,
  InvoicePicPage,
} from "./routes/Routes.js";
import { useEffect } from "react";
import Store from "./redux/store.js";
import { ToastContainer } from "react-toastify";
import { loadUser } from "./redux/actions/user.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/pic" element={<InvoicePicPage />} />

          <Route
            path="/invoice"
            element={
              <ProtectedRoute>
                <InvoicePage />
              </ProtectedRoute>
            }
          />

          <Route path="/sign-up" element={<SignupPage />} />
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition:Bounce
        />
      </BrowserRouter>
    </>
  );
}

export default App;
