import {
  Navbar,
  IconButton,
  Collapse,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import logo from "../logo.svg";
export default function AppNavbar() {
  const [open, setOpen] = useState(false);
  const [openHospedajeMobile, setOpenHospedajeMobile] = useState(false);

  return (
    <Navbar
      className="sticky top-0 z-50 mx-auto max-w-full border-b bg-white/90 px-4 py-2 backdrop-blur"
      fullWidth
    >
      <div className="mx-auto flex w-full max-w-screen-xl items-center justify-between text-blue-gray-900">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-12 w-12" />
          <span className="sr-only">Inicio</span>
        </Link>

        {/* Menú Desktop */}
        <div className="hidden items-center gap-6 lg:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              (isActive ? "font-semibold" : "font-normal") +
              " transition-colors hover:text-blue-600"
            }
          >
            Inicio
          </NavLink>

          <NavLink
            to="/"
            className={({ isActive }) =>
              (isActive ? "font-semibold" : "font-normal") +
              " transition-colors hover:text-blue-600"
            }
          >
            Servicios
          </NavLink>

          {/* Hospedaje (Dropdown Desktop) */}
          <Menu placement="bottom-start">
            <MenuHandler>
              <button
                type="button"
                className="flex items-center gap-1 font-normal transition-colors hover:text-blue-600"
                aria-haspopup="menu"
              >
                Test
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </MenuHandler>
            <MenuList className="p-1">
              <Link to="/">
                <MenuItem onClick={() => document.activeElement?.blur()}>
                  Test1
                </MenuItem>
              </Link>
              <Link to="/">
                <MenuItem onClick={() => document.activeElement?.blur()}>
                Test2
                </MenuItem>
              </Link>
              <Link to="/f">
                <MenuItem onClick={() => document.activeElement?.blur()}>
                Test3
                </MenuItem>
              </Link>
            </MenuList>
          </Menu>

          <NavLink
            to="/"
            className={({ isActive }) =>
              (isActive ? "font-semibold" : "font-normal") +
              " transition-colors hover:text-blue-600"
            }
          >
            Nosotros
          </NavLink>
        </div>

        {/* Botón móvil */}
        <IconButton
          variant="text"
          className="ml-2 lg:hidden"
          onClick={() => {
            setOpen((cur) => !cur);
            // Si cierro el menú principal, cierro también el submenú
            if (open) setOpenHospedajeMobile(false);
          }}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {/* Ícono hamburguesa / X */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </IconButton>
      </div>

      {/* Menú móvil */}
      <Collapse open={open} className="lg:hidden">
        <div className="mx-auto mt-2 flex w-full max-w-screen-xl flex-col items-center gap-3 text-center text-blue-gray-900">
          <NavLink
            to="/"
            onClick={() => {
              setOpen(false);
              setOpenHospedajeMobile(false);
            }}
            className="py-1 font-medium hover:text-blue-600"
          >
            Inicio
          </NavLink>

          <NavLink
            to="/servicios"
            onClick={() => {
              setOpen(false);
              setOpenHospedajeMobile(false);
            }}
            className="py-1 font-medium hover:text-blue-600"
          >
            Servicios
          </NavLink>

          {/* Título Hospedaje (toggle) */}
          <button
            type="button"
            className="flex items-center justify-center gap-1 py-1 font-medium hover:text-blue-600"
            onClick={() => setOpenHospedajeMobile((v) => !v)}
            aria-expanded={openHospedajeMobile}
            aria-controls="submenu-hospedaje"
          >
            Hospedaje
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 transition-transform ${
                openHospedajeMobile ? "rotate-180" : ""
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {/* Submenú móvil (condicional, no Collapse) */}
          {openHospedajeMobile && (
            <div
              id="submenu-hospedaje"
              className="flex flex-col items-center gap-1 text-blue-gray-800"
            >
              <Link
                to="/tuk-tulum"
                onClick={() => {
                  setOpen(false);
                  setOpenHospedajeMobile(false);
                }}
                className="py-1 hover:text-blue-600"
              >
                Tuk Tulum
              </Link>
              <Link
                to="/casa-delfines"
                onClick={() => {
                  setOpen(false);
                  setOpenHospedajeMobile(false);
                }}
                className="py-1 hover:text-blue-600"
              >
                Casa Delfines
              </Link>
              <Link
                to="/finca-las-aguilas"
                onClick={() => {
                  setOpen(false);
                  setOpenHospedajeMobile(false);
                }}
                className="py-1 hover:text-blue-600"
              >
                Finca las Aguilas
              </Link>
            </div>
          )}

          <NavLink
            to="/nosotros"
            onClick={() => {
              setOpen(false);
              setOpenHospedajeMobile(false);
            }}
            className="py-1 font-medium hover:text-blue-600"
          >
            Nosotros
          </NavLink>
        </div>
      </Collapse>
    </Navbar>
  );
}
