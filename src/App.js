import { Navigate, Route, Routes } from "react-router-dom";
import GlobalProvider from "./context/GlobalState";
import Home from "./page/Home";

function App() {
  return (
    <Routes>
      <Route
        path="/v1"
        element={
          <GlobalProvider>
            <Home />
          </GlobalProvider>
        }
      />
      <Route path="*" element={<Navigate to="/v1" replace />} />
    </Routes>
  );
}

export default App;
