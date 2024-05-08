import { Outlet } from "react-router-dom";
import { Nav } from "./Nav";
import { GlobalSpinner } from "./GlobalSpinner";

export function Root() {
  return (
    <>
      <Nav />
      <GlobalSpinner>
        <Outlet />
      </GlobalSpinner>
    </>
  );
}
