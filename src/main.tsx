import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@mantine/charts/styles.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import DaysSurvived from "./pages/DaysSurvived/DaysSurvived.tsx";
import { ItemsBarChart } from "./pages/Items/ItemsBarChart.tsx";
import Map from "./pages/Map.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/survived/:chart?" element={<DaysSurvived />}></Route>
      <Route path="/items" element={<ItemsBarChart />}></Route>
      <Route path="/map" element={<Map />}></Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
