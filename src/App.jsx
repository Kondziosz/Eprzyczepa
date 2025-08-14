import "./App.css";
import NavBar from "./Components/NavBar";
import Oferta from "./Components/Oferta";
import Cennik from "./manual/Cennik";
import Kontakt from "./Components/Kontakt";
import Karty from "./manual/Karty";
import Mapa from "./manual/mapa";
import Hero from "./manual/Hero";
import Info from "./manual/Info";
import Przyczepy from "./Components/Przyczepy";
import Serwis from "./manual/Serwis";
import Rezerwacja from "./Components/Rezerwacja";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

function Main() 
{
  return (
    <div>
      <Hero />
      <Oferta />
      <Mapa />
      <Przyczepy />
      <Karty />
      <Info />
      <Cennik />
      <Serwis />
      <Kontakt />
    </div>
  );
}
function Layout() 
{
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "/rezerwacja",
        element: <Rezerwacja />,
      },
    ],
  },
]);

function App() 
{
  return <RouterProvider router={router} />;
}

export default App;
