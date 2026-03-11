import React, { useEffect } from "react";

const CheckIcon = () => (
  <svg
    className="w-5 h-5 text-cyan-600 mr-3 mt-0.5 flex-shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const sections = [
  {
    title: "1. Recopilación de Información",
    content:
      "Recopilamos información personal a través de nuestro formulario de contacto en https://bienestarpae.com. Los datos incluyen:",
    items: [
      "Nombre y Apellido.",
      "Nombre de la Empresa.",
      "Dirección de correo electrónico.",
      "Contenido del mensaje.",
    ],
  },
  {
    title: "2. Uso de la Información (Sistema de Alertas)",
    content:
      "La información recopilada se utiliza exclusivamente para generar alertas de prospección en tiempo real.",
    subs: [
      {
        label: "Destinatarios:",
        text: "Las notificaciones SMS se envían únicamente al personal interno autorizado de Bienestar PAE (equipo comercial).",
      },
      {
        label: "Finalidad:",
        text: "Garantizar una respuesta rápida a las solicitudes de los usuarios. Los datos del usuario externo se transmiten dentro del cuerpo del mensaje SMS para fines operativos internos.",
      },
    ],
  },
  {
    title: "3. Consentimiento (Opt-in)",
    content: null,
    subs: [
      {
        label: "Usuarios del Sitio Web:",
        text: "Al completar el formulario de contacto, los usuarios aceptan que su información sea procesada y transmitida a nuestro equipo comercial para recibir una respuesta a su solicitud.",
      },
      {
        label: "Personal Interno:",
        text: "Los empleados que reciben estas alertas han proporcionado su consentimiento previo y sus números han sido configurados manualmente en nuestra infraestructura de AWS Lambda.",
      },
    ],
  },
  {
    title: "5. Protección y Compartición de Datos",
    content:
      "Bienestar PAE no vende, alquila ni comparte listas de números de teléfono o datos personales recopilados a través del flujo de SMS con terceros para fines de marketing o publicidad. El uso de los datos es estrictamente transaccional y limitado a la infraestructura de AWS (Amazon Web Services).",
  },
  {
    title: "6. Seguridad",
    content:
      "Implementamos medidas de seguridad técnicas mediante el uso de AWS IAM, cifrado en tránsito y acceso restringido a las variables de entorno de AWS Lambda para proteger la integridad de los números de teléfono y la información de los prospectos.",
  },
];

export default function PoliticaPrivacidad() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="font-sans antialiased bg-white min-h-screen">
      <section className="flex flex-col md:flex-row w-full max-w-full">
        <div className="w-full md:w-1/2 bg-[#2072b2] flex items-center justify-start p-8 md:pl-24 lg:pl-32 min-h-[150px] md:min-h-[350px]">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-normal tracking-wide pl-8 md:pl-16">
            Política de privacidad
          </h1>
        </div>
        <div className="w-full md:w-1/2 relative h-[250px] md:h-auto md:min-h-[300px]">
          <img
            src="/images/contacto.jpg"
            alt="Política de privacidad"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>
      </section>

      <section className="bg-[#f2f2f2] md:bg-[#EDEDED] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed mb-10">
              En Bienestar PAE nos tomamos muy en serio la privacidad y la seguridad de los datos. Esta política describe cómo recopilamos y utilizamos la información a través de nuestro sitio web y nuestro sistema de alertas SMS operado mediante AWS.
            </p>

            <div className="space-y-10">
              {sections.map((section, index) => (
                <div key={index}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-start">
                    <CheckIcon />
                    <span>{section.title}</span>
                  </h2>
                  <div className="pl-8 space-y-4">
                    {section.content && (
                      <p className="text-lg text-gray-900 leading-relaxed">
                        {section.content}
                      </p>
                    )}
                    {section.items && (
                      <ul className="space-y-2 list-none pl-0">
                        {section.items.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start text-lg text-gray-900"
                          >
                            <CheckIcon />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.subs && (
                      <div className="space-y-4">
                        {section.subs.map((sub, i) => (
                          <p
                            key={i}
                            className="text-lg text-gray-900 leading-relaxed"
                          >
                            <strong className="text-gray-900">
                              {sub.label}
                            </strong>{" "}
                            {sub.text}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-300">
              <p className="text-sm text-gray-600">
                Última actualización: 11 de marzo de 2026.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
