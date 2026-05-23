import Router from "./routes/Router";
import { StoreProvider } from "./context/StoreContext";
import AuroraCanvas from "./components/AuroraCanvas";

function App() {
  return (
    <StoreProvider>
      <AuroraCanvas />
      <Router />
    </StoreProvider>
  );
}

export default App;