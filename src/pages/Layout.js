import { Outlet } from "react-router-dom";
import NavGeneral from "../components/NavGeneral";
const Layout = () => {
  return (
    <main className="App">
      <div className="flex flex-col space-y-8 ">
        <NavGeneral />
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
