import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { label: "CONÓZCANOS", to: "/conozcanos" },
  { label: "SERVICIO",   to: "/servicio" },
  { label: "NOM35",      to: "/nom35" },
  { label: "CONTACTO",   to: "/contacto" },
];

export default function AppNavbar() {
  return (
    <header className="bg-[#F1F1F1] border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <NavLink to="/">
            <img
              src="/images/Logo_PAE.svg"
              alt="Bienestar PAE"
              className="h-16 w-auto cursor-pointer"
            />
          </NavLink>
        </div>
        <nav className="hidden md:flex items-center gap-10 text-sm tracking-[0.16em] text-[#005781]">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                [
                  "pb-1 uppercase",
                  "hover:text-[#0097C4] transition-colors",
                  isActive
                    ? "border-b-2 border-[#00A4CF] font-semibold"
                    : "border-b-2 border-transparent",
                ].join(" ")
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}