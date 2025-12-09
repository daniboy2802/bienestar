import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from "@material-tailwind/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Servicio from './pages/Service';
import Servicios from './pages/Servicios';
import Nom35 from './pages/Nom35';
import Contacto from './pages/Contacto';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <MainLayout>
        <Home />
      </MainLayout>
    )
  },
  {
    path: "/servicio/:slug", 
    element: (
      <MainLayout>
        <Servicios />
      </MainLayout>
    )
  },
  {
    path: "/conozcanos",
    element: (
      <MainLayout>
        <AboutUs />
      </MainLayout>
    )
  },
  {
    path: "/servicio",
    element: (
      <MainLayout>
        <Servicio />
      </MainLayout>
    )
  },
  {
    path: "/nom35",
    element: (
      <MainLayout>
        <Nom35 />
      </MainLayout>
    )
  },
  {
    path: "/contacto",
    element: (
      <MainLayout>
        <Contacto />
      </MainLayout>
    )
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
