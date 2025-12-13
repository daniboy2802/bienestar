import React from "react";
import { useParams } from "react-router-dom";

const services = {
  "accion-nom-035": {
    img: "/images/coberturac.jpg",
    name: "Estrategia para aplicación,cumplimiento y seguimiento de la nom - 035",
    phrase:
      '"Es impensable el costo que representa para una empresa, el no cuidar el RIESGO PSICOSOCIAL".',
    description:
      "Diseñamos e implementamos estrategias personalizadas para prevenir riesgos psicosociales y cumplir con la NOM-035, fortaleciendo el bienestar y la productividad de su equipo.",
    extrainfo: {
      paragraph1: "Lo que hacemos: ",
      list: {
        list1: "Diagnóstico, plan de acción y evaluación.",
        list2: "Prevención de violencia, estrés laboral y eventos traumáticos.",
        list3: "Promoción de un entorno laboral saludable.",
      },
      paragraph2: "Beneficios:",
      secondlist: {
        slist1: "Evaluaciones, reportes e inducción a todo el personal.",
        slist2: "Soporte en tiempo real y campañas de difusión.",
        slist3: "Confidencialidad total de la información.",
      },
      paragraph3:
        "Proteja el bienestar emocional de su equipo y potencie la eficiencia de su empresa.",
    },
  },
  "custom-care": {
    img: "/images/coberturac.jpg",
    name: "Customer care Cálida atención a cliente 24/7 x 365",
    phrase:
      '"Disponibilidad absoluta con el trato más cordial y pertinente, con honestidad y máxima confidencialidad, porque sabemos que se trata de sus emociones".',
    description:
      "Nuestro objetivo principal es que sus empleados y sus familiares cercanos se sientan apoyados y protegidos, recibiendo acompañamiento y contención inmediata ante cualquier situación o crisis",
    extrainfo: {
      paragraph1: "Nuestra respuesta telefónica es: ",
      list: {
        list1: "24/7, los 365 dias del año",
        list2: "Rapida, precisa y eficiente",
        list3: "Con un enfoque 100% emocional",
      },
      paragraph2:
        "Un empleado en equilibrio y estabilidad puede cumplir mejor con sus labores y generar un compromiso sólido con la empresa",
    },
  },
  "cobertura-completa": {
    img: "/images/coberturac.jpg",
    name: "Cobertura completa de especialidades psicológicas y consultorías especializadas",
    phrase:
      '"Contar con el mejor equipo de psicólogos especializados, con cobertura nacional, es solo el principio".',
    description:
      "Contamos con una sólida infraestructura tecnológica y un equipo humano altamente especializado para responder de manera inmediata a cualquier situación o necesidad de sus empleados, brindando:",
    extrainfo: {
      list: {
        list1: "Atención inmediata y mancio de crisis.",
        list2: "Terapia breve, presencial o a distancia.",
        list3: "Cobertura nacional y 100% contidencialidad.",
        list4: "Canalización a instituciones especializadas. según el caso.",
      },
      paragraph2: "Áreas de atención psicológica:",
      paragraph3:
        "Tanatología • Pareja • Familia • Adicciones • Trastornos depresivos • Ansiedad • Estrés postraumático",
      paragraph4: "Especializacion adicional: ",
      paragraph5:
        "Asesoría Legal • Fiscal • Financiera • Nutricional • Capacitación en Liderazgo",
    },
  },
  "well-being-coaching": {
    img: "/images/coberturac.jpg",
    name: "Well-being coaching fitness emocional.",
    phrase:
      '"Fortalecer su estabilidad emocional es asegurar su éxito personal y laboral".',
    description:
      "En CAPAZ somos un spoyo firme y estratégico para acompañar a las personas en el camino hacia su mejor versión, ayudándoles a alcanzar la calidad de vida que merecen conforme a sus propias metas y aspiraciones. Através de un entrenamiento mental y emocional, promovemos un estado de armonía interior que les permite potenciar sus talentos y mantener un equilibrio saludable entre su vida personal y profesional. Guiamos a cada participante hacia un estilo de vida sano, basado en cambios posítivos, la definición de sus capacidades y la consecución de metas y objetivos, con un sólido balance físico, mental y social.",
  },
  webinars: {
    img: "/images/coberturac.jpg",
    name: "Webinars + conterencies on-site",
    phrase:
      '"Nos interesa ser un acompañamiento integral y estar siempre cerca de sus necesidades."',
    description:
      "Contamos con un amplio catálogo de temas de interés dischados especialmente para las empresas y sus colaboradores, que abordar desde aspectos venerales ‹le bienestar hasta temas específicos según las necesidades particulares de cada oncanizacion Nuestras conferencias presenciales y webinars en linca son impartidos por psicólogos y especialistas altamente calificados, garantizando experiencias de aprendizaje significativas, pricticas y con impacto real en el entorno laboral ",
  },
  cism: {
    img: "/images/coberturac.jpg",
    name: "Intervención en Crisis",
    phrase:
      '"Estar ahí, en el momento preciso y con respuesta inmodiata, es por lo que hoy somos el número uno".',
    description:
      "Nuestro programa de Intervención en Crisis (CISM) está discñado para brindar apoyo inmediato y especializado ante situaciones críticas que impactan el bienestar emocional de los colaboradores.La intervención se realiza directamente en las instalaciones de las empresas que confian en nosotros, trabajando con grupos reducidos de hasta 15 empleados. Durante las sesiones, se ofrecen pláticas y acompañamiento emocional orientados a disminuir el impacto psicológico derivado de eventos traumáticos, como accidentes laborales, pérdidas humanas o crisis personales y colectivas. Nuestro objetivo es restaurar la estabilidad emocional de los colaboradores y favorecer su pronta recuperación.",
  },
};

const ServiceCard = ({ icon, title, description, slug }) => (
  <a
    href={`/servicio/${slug}`}
    className="w-full h-full shadow-sm hover:shadow-lg transition-shadow border border-gray-100 rounded-xl bg-white"
  >
    <div className="flex flex-col items-center text-center p-8 h-full">
      <div className="mb-4 p-3 bg-cyan-50 rounded-full">
        <div className="text-cyan-700 w-8 h-8">{icon}</div>
      </div>
      <h5 className="text-gray-900 font-bold text-base leading-tight mb-2">
        {title}
      </h5>
      <p className="text-sm text-gray-500 mb-6 flex-grow">{description}</p>
      <div className="mt-auto flex justify-center w-full">
        <a
          href={`/servicio/${slug}`}
          className="transition-colors hover:bg-gray-100 rounded"
        >
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
        </a>
      </div>
    </div>
  </a>
);

export default function Servicios() {
  const { slug } = useParams();
  const slugToUse = slug && services[slug] ? slug : "cobertura-completa";
  const serviceData = services[slugToUse];
  if (!serviceData) {
    return (
      <div className="text-center p-20 min-h-screen bg-gray-50">
        <h2 className="text-3xl text-red-600 font-bold">Error 404</h2>
        <p className="text-gray-600 mt-2">El servicio solicitado no existe.</p>
      </div>
    );
  }

  const cardServices = Object.entries(services).filter(
    ([key]) => key !== slugToUse
  );

  const icons = {
    "well-being-coaching": (
      <svg
        className="w-full h-full"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    "custom-care": (
      <svg
        className="w-full h-full"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    "accion-nom-035": (
      <svg
        className="w-full h-full"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    "capaz-180": (
      <svg
        className="w-full h-full"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M3 12l2-2m0 0l7-7 4 4 3 3M5 12h14m-12 5h10m-10 4h10m-3-4l-3-3"
        />
      </svg>
    ),
    webinars: (
      <svg
        className="w-full h-full"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M15 10l4.55 4.55a.8.8 0 01-.56 1.36H5.01a.8.8 0 01-.56-1.36L9.5 10m5.5 0v6M12 18h.01"
        />
      </svg>
    ),
    cism: (
      <svg
        className="w-full h-full"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    "cobertura-completa": (
      <svg
        className="w-full h-full"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M3.055 11H5a2 2 0 012 2v2a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5a2.5 2.5 0 002.5 2.5h.5a2.5 2.5 0 012.5 2.5v1M21 13a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  };

  const capaz180Service = {
    name: "CAPAZ 180",
    description: "Servicio para lograr las metas",
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <section className="relative min-h-[500px] flex items-center pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={serviceData.img || "/images/psicologa-hero.jpg"}
            alt={`Imagen de ${serviceData.name}`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-7xl w-full px-6 lg:px-28 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="text-white pt-10">
            <div className="mb-4">
              <div className="w-12 h-12 mb-4 text-white opacity-90">
                {icons[slugToUse] || icons["cobertura-completa"]}
              </div>
              <h1 className="text-4xl md:text-5xl font-light leading-snug drop-shadow-lg">
                {serviceData.name}
              </h1>
            </div>
          </div>
          <div className="hidden lg:block" />
        </div>
      </section>
      <main className="max-w-7xl mx-auto px-6 py-16">
        <p className="text-4xl font-semibold text-gray-700 mb-10 leading-snug text-center w-full px-28">
          {serviceData.phrase}
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 text-gray-700">
            <p className="text-lg mb-8">{serviceData.description}</p>
            {serviceData.extrainfo && (
              <>
                {Object.keys(serviceData.extrainfo).map((key, index) => {
                  if (key.startsWith("paragraph")) {
                    const isTitle =
                      key === "paragraph1" ||
                      key === "paragraph2" ||
                      key === "paragraph4";
                    return (
                      <p
                        key={index}
                        className={`mt-6 ${
                          isTitle
                            ? "text-xl font-semibold text-gray-800 mb-3"
                            : "text-gray-700"
                        }`}
                      >
                        {serviceData.extrainfo[key]}
                      </p>
                    );
                  }

                  if (key === "list" && serviceData.extrainfo.list) {
                    return (
                      <ul key={index} className="space-y-3 list-none mb-6">
                        {Object.values(serviceData.extrainfo.list).map(
                          (item, i) => (
                            <li key={`list-i${i}`} className="flex items-start">
                              <svg
                                className="w-5 h-5 mr-2 text-cyan-600 flex-shrink-0 mt-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span>{item}</span>
                            </li>
                          )
                        )}
                      </ul>
                    );
                  }

                  if (
                    key === "secondlist" &&
                    serviceData.extrainfo.secondlist
                  ) {
                    return (
                      <ul key={index} className="space-y-3 list-none mt-4 mb-6">
                        {Object.values(serviceData.extrainfo.secondlist).map(
                          (item, i) => (
                            <li
                              key={`slist-i${i}`}
                              className="flex items-start"
                            >
                              <svg
                                className="w-5 h-5 mr-2 text-cyan-600 flex-shrink-0 mt-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span>{item}</span>
                            </li>
                          )
                        )}
                      </ul>
                    );
                  }

                  return null;
                })}
              </>
            )}
          </div>

          <div className="hidden lg:block"></div>
        </div>
      </main>
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="border-t border-gray-600 pt-12 mb-12"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
            {cardServices.map(([key, s]) => (
              <ServiceCard
                key={key}
                slug={key}
                icon={icons[key]}
                title={s.name}
                description={s.description.slice(0, 50) + "..."}
              />
            ))}
            {slugToUse !== "capaz-180" && (
              <ServiceCard
                key="capaz-180"
                slug="capaz-180"
                icon={icons["capaz-180"]}
                title={capaz180Service.name}
                description={capaz180Service.description}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
