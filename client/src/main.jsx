import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import store from "./Redux/Store";
import { Provider } from "react-redux";
// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// if (!PUBLISHABLE_KEY) {
//   throw new Error("Missing Publishable Key");
// }
createRoot(document.getElementById("root")).render(
  // <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
  //  <BrowserRouter>
  //  <App/>
  //  </BrowserRouter>
  // </ClerkProvider>
  <Provider store={store}>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </Provider>
);
