import { Outlet } from 'react-router-dom';
import Header from "./components/Header/Header.tsx";

function App() {
  return (
      <div className="app-wrapper">
        <Header />

        <main>
          <Outlet />
        </main>
      </div>
  );
}

export default App;