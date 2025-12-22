import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Typography
} from "@material-tailwind/react";

const pillarsFirstRow = [
  {
    slug: "accion-nom-035",
    title: "Acción NOM-035",
    desc: "El costo de no atender el riesgo psicosocial en la empresa es incalculable.",
    icon: (
      <svg className="w-10 h-10 text-[#00A4CF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    slug: "custom-care",
    title: "Customer CARE",
    desc: "Cálida atención a cliente 24/7 X 365.",
    icon: (
      <svg className="w-10 h-10 text-[#00A4CF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    slug: "cobertura-completa",
    title: "Cobertura completa",
    desc: "De especialidades psicológicas y consultorías especializadas.",
    icon: (
      <svg className="w-10 h-10 text-[#00A4CF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  }
];

const pillarsSecondRow = [
  {
    slug: "well-being-coaching",
    title: "Well-being coaching fitness emocional.",
    desc: "Fortalecer su estabilidad emocional.",
    icon: (
      <svg className="w-10 h-10 text-[#00A4CF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>  
    ),
  },
  {
    slug: "webinars",
    title: "Webinars + Conferencias ON-SITE",
    desc: "Nos interesa ser un acompañamiento completo.",
    icon: (
      <svg className="w-10 h-10 text-[#00A4CF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    slug: "cism",
    title: "CISM",
    desc: "Intervención en crisis.",
    icon: (
      <svg className="w-10 h-10 text-[#00A4CF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function Service() {
  const allPillars = [...pillarsFirstRow, ...pillarsSecondRow];
  return (
    <> 
      <div className="flex flex-col w-full font-sans">
          <section className="flex flex-col md:flex-row h-auto md:h-[350px] w-full">
            <div className="w-full md:w-1/2 bg-[#56cbf1] flex flex-col justify-center px-8 md:px-20 py-12">
              <Typography variant="h1" color="white" className="text-4xl md:text-6xl font-normal leading-tight pl-40">
                Servicios <br />
                Bienestar PAE
              </Typography>
            </div>
            <div className="w-full md:w-1/2 relative h-[300px] md:h-full">
              <img 
                src="/images/services.jpg" 
                alt="Imagen de servicios" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </section>
      </div>
      <section className="bg-[#EBEBEB] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <Typography variant="h3" className="text-gray-800 font-normal">
              Nuestros pilares con los
            </Typography>
            <Typography variant="h3" className="text-[#00C2E8] font-bold">
              que hacemos la diferencia.
            </Typography>
          </div>
          <div className="flex justify-center"> 
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {allPillars.map((item, idx) => (
                <PillarCard key={idx} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
function PillarCard({ item }) {
  return (
    <Link to={`/servicio/${item.slug}`} className="block w-80 h-full">
      <Card className="w-full h-full shadow-sm hover:shadow-lg transition-shadow border border-gray-100 rounded-xl cursor-pointer flex flex-col"> 
        <CardBody className="flex flex-col items-center text-center p-8 h-full flex-grow">
          <div className="mb-4 p-3 bg-cyan-50 rounded-full">
              {item.icon}
          </div>
          <Typography variant="h6" color="blue-gray" className="mb-2 font-bold">
            {item.title}
          </Typography>
          <Typography className="text-gray-500 text-sm mb-6 flex-grow">
            {item.desc}
          </Typography>
          <div className="mt-auto flex justify-center w-full"> 
            <div className="transition-colors hover:bg-gray-100 rounded">
                <div className="border border-gray-300 rounded px-4 py-1">
                    <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                    </svg>
                </div>
            </div>
          </div> 
        </CardBody>
      </Card>
    </Link>
  );
}