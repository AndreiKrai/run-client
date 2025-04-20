import { BrowserRouter,  useRoutes } from "react-router-dom";
import { MainProvider } from "./context/MainContext";
import routes from "./router";
import "./App.css";

const Router = () => {
  const element = useRoutes(routes);
  return element;
};
function App() {
  return (
    <BrowserRouter>
      <MainProvider>
        <Router />
      </MainProvider>
    </BrowserRouter>
  );
}

export default App;
