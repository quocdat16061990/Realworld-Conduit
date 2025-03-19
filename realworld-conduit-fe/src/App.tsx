import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useRouteElement from "@/useRouteElements";
function App() {
  const routeElement = useRouteElement();
  return (
    <div>
      {routeElement}
      <ToastContainer />
    </div>
  );
}

export default App;
