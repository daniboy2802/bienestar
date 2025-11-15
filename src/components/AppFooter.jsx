import { Typography } from "@material-tailwind/react";
import Logo from "../logo.svg";

export default function AppFooter() {
  return (
    <footer className="bg-brand-dark text-brand-beige pt-10 pb-6 mt-20  shadow-inner">
      <div className="mx-auto max-w-screen-xl px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Columna izquierda: Logo */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <img
            src={Logo}
            alt="The Puerto Escondido Group logo"
            className="w-40 mb-4 opacity-90"
          />
          <Typography className="text-sm text-brand-beige/80 leading-relaxed max-w-md">
            Somos tu aliado confiable en la costa oaxaqueña.  
            Brindamos asesoría legal, migratoria, fiscal e inmobiliaria con más de 20 años de experiencia.
          </Typography>
        </div>

        {/* Columna derecha: Información de contacto */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-2">
          <Typography variant="h6" className="font-semibold text-brand-beige mb-2">
            Contáctanos
          </Typography>

          <Typography className="text-brand-beige/90 font-medium">
            +52 954 201 4314
          </Typography>

          <Typography
            as="a"
            href="mailto:bahíadelfines1234@gmail.com"
            className="text-brand-beige/80 hover:text-white transition-colors"
          >
            bahiadelfines1234@gmail.com
          </Typography>

          <Typography className="text-brand-beige/80 mt-2 leading-relaxed">
            Calle del Morro 806, Col. Santa María Puerto <br />
            Escondido, Oaxaca, México 70934
          </Typography>
        </div>
      </div>

      {/* Línea divisoria */}
      <div className="border-t border-brand-beige/20 mt-8 pt-4">
        <Typography
          variant="small"
          className="text-center text-brand-beige/70 text-sm tracking-wide"
        >
          © {new Date().getFullYear()} Todos los derechos reservados a The puerto escondido Group
        </Typography>
      </div>
    </footer>
  );
}
