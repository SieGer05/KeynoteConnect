import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main>
          <AppRouter />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;