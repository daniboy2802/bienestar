import React from "react";

export default function Nom35() {
  const CheckIcon = () => (
    <svg className="w-6 h-6 text-[#0C6AB9] mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
  return (
    <div className="font-sans antialiased bg-white">
      <section className="flex flex-col md:flex-row w-full max-w-full">
        <div className="w-full md:w-1/2 bg-[#41affd] flex items-center justify-start p-8 md:pl-24 lg:pl-32 min-h-[150px] md:min-h-[350px]">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-normal tracking-wide">
            NOM-035
          </h1>
        </div>
        <div className="w-full md:w-1/2 relative h-[250px] md:h-auto md:min-h-[300px]">
          <img 
            src="/images/nom038T.jpg" 
            alt="Imagen Nom035 titulo" 
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            NOM-035 STPS:
          </h2>
          <p className="text-4xl md:text-5xl font-light text-gray-900 mb-10">
            <strong>Prevención de Riesgos Psicosociales</strong>
          </p>
          <p className="text-lg text-gray-900 leading-relaxed mb-4">
            <strong>La NOM-035</strong>, publicada en <strong>2018</strong>, será obligatoria desde octubre de 2019 para todas las empresas en México.
          </p>
          <p className="text-lg text-gray-900 leading-relaxed mb-6">
            El incumplimiento puede generar multas de hasta <strong>$535,350 pesos</strong>.
          </p>
          <p className="text-lg text-gray-900 leading-relaxed mb-12">
            Esta norma permite a las empresas identificar y prevenir riesgos psicosociales en el entorno laboral promoviendo un ambiente saludable y productivo.
          </p>
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-5">
              Obligaciones del patrón
            </h3>
            <p className="text-lg text-gray-900 leading-relaxed mb-4">
              Implementar y difundir una política que incluya:
            </p>
            <ul className="space-y-4 list-none pl-0">
              <li className="flex items-start text-lg text-gray-900">
                <CheckIcon />
                <span>Prevención de factores de <strong>riesgo psicosocial</strong>.</span>
              </li>
              <li className="flex items-start text-lg text-gray-900">
                <CheckIcon />
                <span>Prevención de <strong>violencia laboral</strong>.</span>
              </li>
              <li className="flex items-start text-lg text-gray-900">
                <CheckIcon />
                <span>Promoción de un <strong>entorno organizacional favorable</strong>.</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-5">
              Obligaciones de los trabajadores
            </h3>
            <ul className="space-y-4 list-none pl-0">
              <li className="flex items-start text-lg text-gray-900">
                <CheckIcon />
                <span>Cumplir con las medidas de prevención establecidas por la empresa.</span>
              </li>
              <li className="flex items-start text-lg text-gray-900">
                <CheckIcon />
                <span>Evitar prácticas que perjudiquen el entorno laboral o generen violencia.</span>
              </li>
              <li className="flex items-start text-lg text-gray-900">
                <CheckIcon />
                <span>Participar en la identificación y evaluación de riesgos psicosociales.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="w-full relative h-[300px] md:h-[400px]">
        <img 
          src="/images/nom038F.jpg" 
          alt="Imagen footer nom035" 
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </section>

    </div>
  );
}