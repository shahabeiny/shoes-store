import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import "./Panel.css";
import Sidebar from "../Sidebar/Sidebar";

export default function Panel() {


  return (
    <div className="panel">

      <Suspense>
        <Sidebar />
      </Suspense>

      <main className="main">
        <div className="container">
          <div className="panel__wrapper">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
