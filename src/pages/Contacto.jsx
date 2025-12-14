import React from "react";

export default function Contacto() {
  return (
    <div className="w-full">
      <section className="w-full grid grid-cols-1 md:grid-cols-2 ">
        <div className="bg-[#2072b2] flex items-center justify-center py-12 md:py-0">
          <h1 className="text-white text-3xl md:text-4xl font-semibold tracking-wide">
            CONTACTO
          </h1>
        </div>

        <div className="h-[350px]">
          <img
            src="/images/contacto.jpg"
            alt="Ejecutiva de soporte al cliente"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </section>

      <section className="flex justify-center py-10 md:py-16 bg-[#EDEDED]">
        <div className="bg-white rounded-xl p-6 md:p-10 w-[90%] md:w-[70%] shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="bg-[#F5F5F5] p-3 rounded-md outline-none"
              placeholder="Nombre"
            />
            <input
              className="bg-[#F5F5F5] p-3 rounded-md outline-none"
              placeholder="Apellido"
            />
          </div>

          <div className="mt-4">
            <input
              className="w-full bg-[#F5F5F5] p-3 rounded-md outline-none"
              placeholder="e-mail"
            />
          </div>

          <div className="mt-4">
            <input
              className="w-full bg-[#F5F5F5] p-3 rounded-md outline-none"
              placeholder="Empresa"
            />
          </div>

          <div className="mt-4">
            <input
              className="w-full bg-[#F5F5F5] p-3 rounded-md outline-none"
              placeholder="Giro"
            />
          </div>

          <div className="mt-4">
            <input
              className="w-full bg-[#F5F5F5] p-3 rounded-md outline-none"
              placeholder="Número de empleados"
            />
          </div>

          <div className="mt-4">
            <textarea
              className="w-full bg-[#F5F5F5] p-3 rounded-md outline-none"
              placeholder="Mensajes"
              rows={4}
            />
          </div>

          <div className="flex justify-end mt-4">
            <button className="px-8 py-2 bg-[#4AA3A0] text-white rounded-md text-lg">
              Enviar
            </button>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-32 py-10 text-gray-700 bg-[#EDEDED]">
        <p className="text-sm leading-relaxed mb-6">
          Si necesita de nuestra asistencia personalizada para su compañía
          podemos elaborar un programa adecuado a sus necesidades,
          <br />
          no dude en llamarnos al:
        </p>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span>📞</span>
            <p className="font-semibold">55 5523 3807 / 55 5543 5152</p>
          </div>

          <p className="text-sm text-gray-600 ml-8">
            Lada sin costo desde el interior de la República Mexicana:
          </p>

          <div className="flex items-center gap-2 ml-8">
            <span>📞</span>
            <p className="font-semibold">800 507 3120</p>
          </div>

          <p className="text-sm text-gray-600 ml-8">
            Del extranjero: (+52) 55 5523 3807
          </p>

          <div className="flex items-start gap-2 pt-2">
            <span>📧</span>
            <p className="text-sm text-gray-700">contacto@bienestarpae.com</p>
          </div>
        </div>
      </section>

      <div>
        <img
          src="https://images.pexels.com/photos/8867435/pexels-photo-8867435.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Equipo de call center"
          className="w-full h-80 md:h-[420px] object-cover"
        />
      </div>
    </div>
  );
}
