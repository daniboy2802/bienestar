import React from "react";
import Logo from "../logo.svg"; // <-- cambia según tu ruta

export default function AppFooterFooter() {
  return (
    <footer className="bg-[#0274BE] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Left - Logo */}
        <div className="flex flex-col items-start">
          <img src={Logo} alt="Bienestar PAE" className="w-40 mb-4" />

          <p className="text-sm tracking-wide opacity-90">
            RECONOCE. RESPETA. SANA. POTENCIA.
          </p>
        </div>

        {/* Middle - Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contáctenos</h3>

          <div className="flex items-center gap-4 mb-3">
            {/* Facebook */}
            <a href="/" className="hover:opacity-80 transition">
              <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
                <path d="M22 12.07C22 6.48 17.52 2.07 12 2.07S2 6.48 2 12.07c0 4.99 3.66 9.12 8.44 9.88v-6.99h-2.54v-2.89h2.54V9.41c0-2.51 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.77l-.44 2.89h-2.33V22c4.78-.76 8.44-4.89 8.44-9.93z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a href="/" className="hover:opacity-80 transition">
              <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
                <path d="M12 2.2c3.18 0 3.56.01 4.82.07 1.17.05 1.97.24 2.67.52a5.4 5.4 0 0 1 1.95 1.27 5.4 5.4 0 0 1 1.27 1.95c.28.7.47 1.5.52 2.67.06 1.26.07 1.64.07 4.82s-.01 3.56-.07 4.82c-.05 1.17-.24 1.97-.52 2.67a5.4 5.4 0 0 1-1.27 1.95 5.4 5.4 0 0 1-1.95 1.27c-.7.28-1.5.47-2.67.52-1.26.06-1.64.07-4.82.07s-3.56-.01-4.82-.07c-1.17-.05-1.97-.24-2.67-.52a5.4 5.4 0 0 1-1.95-1.27 5.4 5.4 0 0 1-1.27-1.95c-.28-.7-.47-1.5-.52-2.67C2.21 15.56 2.2 15.18 2.2 12s.01-3.56.07-4.82c.05-1.17.24-1.97.52-2.67A5.4 5.4 0 0 1 4.06 2.56a5.4 5.4 0 0 1 1.95-1.27c.7-.28 1.5-.47 2.67-.52C8.44 0.71 8.82 0.7 12 0.7m0 1.8c-3.15 0-3.52.01-4.77.07-1.02.05-1.58.22-1.95.37-.49.19-.84.41-1.21.78-.37.37-.59.72-.78 1.21-.15.37-.32.93-.37 1.95-.06 1.25-.07 1.62-.07 4.77s.01 3.52.07 4.77c.05 1.02.22 1.58.37 1.95.19.49.41.84.78 1.21.37.37.72.59 1.21.78.37.15.93.32 1.95.37 1.25.06 1.62.07 4.77.07s3.52-.01 4.77-.07c1.02-.05 1.58-.22 1.95-.37.49-.19.84-.41 1.21-.78.37-.37.59-.72.78-1.21.15-.37.32-.93.37-1.95.06-1.25.07-1.62.07-4.77s-.01-3.52-.07-4.77c-.05-1.02-.22-1.58-.37-1.95a3.57 3.57 0 0 0-2-2c-.37-.15-.93-.32-1.95-.37-1.25-.06-1.62-.07-4.77-.07zm0 3.42a5.38 5.38 0 1 1 0 10.76 5.38 5.38 0 0 1 0-10.76zm0 8.88a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm5.44-9.94a1.26 1.26 0 1 1 0-2.52 1.26 1.26 0 0 1 0 2.52z"/>
              </svg>
            </a>
          </div>

          <p className="flex items-center gap-3 mb-2">
            <span>📞</span> (+52) 800 507 3120
          </p>

          <p className="flex items-center gap-3">
            <span>✉️</span> contacto@bienestarpae.com
          </p>
        </div>

        {/* Right - Menu */}
        <div className="text-sm space-y-2 tracking-wide">
          <a href="/" className="block hover:underline">CONÓZCANOS</a>
          <a href="/" className="block hover:underline">¿QUÉ ES?</a>
          <a href="/" className="block hover:underline">SERVICIO</a>
          <a href="/" className="block hover:underline">NOM35</a>
          <a href="/" className="block hover:underline">BLOG</a>
          <a href="/" className="block hover:underline">CONTACTO</a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto mt-10">
        <div className="border-t border-white w-full opacity-60 mb-4"></div>

        <p className="text-center text-xs tracking-[0.25em] opacity-90">
          Políticas de Privacidad | 2025 DERECHOS RESERVADOS
        </p>
      </div>
    </footer>
  );
}
