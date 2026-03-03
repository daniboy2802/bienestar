import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { label: "CONÓZCANOS", to: "/conozcanos" },
  { label: "SERVICIO",   to: "/servicio" },
  { label: "NOM-035",      to: "/nom35" },
  { label: "CONTACTO",   to: "/contacto" },
];

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-[#F1F1F1] border-b border-gray-300 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <NavLink to="/" onClick={closeMenu}>
            <img
              src="/images/Logo_PAE.svg"
              alt="Bienestar PAE"
              className="h-12 sm:h-16 w-auto cursor-pointer"
            />
          </NavLink>
        </div>
        
        {/* Desktop Navigation */}
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

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-[#005781] hover:text-[#0097C4] transition-colors"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={closeMenu}
          />
          {/* Menu */}
          <nav className="absolute top-full left-0 right-0 bg-[#F1F1F1] border-b border-gray-300 shadow-lg z-50 md:hidden">
            <div className="px-4 py-4 space-y-2">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    [
                      "block px-4 py-3 text-sm uppercase tracking-[0.16em] text-[#005781] rounded-md transition-colors",
                      "hover:bg-gray-200 hover:text-[#0097C4]",
                      isActive
                        ? "bg-gray-200 text-[#0097C4] font-semibold border-l-4 border-[#00A4CF]"
                        : "",
                    ].join(" ")
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </nav>
        </>
      )}
    </header>
  );
}