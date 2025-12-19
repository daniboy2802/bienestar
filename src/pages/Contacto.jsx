import React, { useState } from "react";

// URL de la Lambda a través de API Gateway
// IMPORTANTE: Reemplazar con la URL real de tu API Gateway
const LAMBDA_ENDPOINT = process.env.REACT_APP_LAMBDA_ENDPOINT || 'https://your-api-gateway-url.execute-api.us-east-1.amazonaws.com/prod/contact';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    empresa: "",
    giro: "",
    numero_empleados: "",
    mensaje: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Limpiar estado de envío al cambiar campos
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(LAMBDA_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        // Limpiar formulario
        setFormData({
          nombre: "",
          apellido: "",
          email: "",
          empresa: "",
          giro: "",
          numero_empleados: "",
          mensaje: "",
        });
      } else {
        setSubmitStatus('error');
        console.error('Error en la respuesta:', data);
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error al enviar formulario:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="bg-[#F5F5F5] p-3 rounded-md outline-none focus:ring-2 focus:ring-[#2072b2]"
                placeholder="Nombre"
              />
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
                className="bg-[#F5F5F5] p-3 rounded-md outline-none focus:ring-2 focus:ring-[#2072b2]"
                placeholder="Apellido"
              />
            </div>

            <div className="mt-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-[#F5F5F5] p-3 rounded-md outline-none focus:ring-2 focus:ring-[#2072b2]"
                placeholder="e-mail"
              />
            </div>

            <div className="mt-4">
              <input
                type="text"
                name="empresa"
                value={formData.empresa}
                onChange={handleChange}
                required
                className="w-full bg-[#F5F5F5] p-3 rounded-md outline-none focus:ring-2 focus:ring-[#2072b2]"
                placeholder="Empresa"
              />
            </div>

            <div className="mt-4">
              <input
                type="text"
                name="giro"
                value={formData.giro}
                onChange={handleChange}
                required
                className="w-full bg-[#F5F5F5] p-3 rounded-md outline-none focus:ring-2 focus:ring-[#2072b2]"
                placeholder="Giro"
              />
            </div>

            <div className="mt-4">
              <input
                type="text"
                name="numero_empleados"
                value={formData.numero_empleados}
                onChange={handleChange}
                required
                className="w-full bg-[#F5F5F5] p-3 rounded-md outline-none focus:ring-2 focus:ring-[#2072b2]"
                placeholder="Número de empleados"
              />
            </div>

            <div className="mt-4">
              <textarea
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-[#F5F5F5] p-3 rounded-md outline-none resize-none focus:ring-2 focus:ring-[#2072b2]"
                placeholder="Mensajes"
              />
            </div>

            {/* Mensaje de estado */}
            {submitStatus === 'success' && (
              <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                ✓ ¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                ✗ Hubo un error al enviar el mensaje. Por favor, intenta nuevamente o contáctanos directamente por email.
              </div>
            )}

            <div className="flex justify-end mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-2 bg-[#4AA3A0] text-white rounded-md text-lg transition-all ${
                  isSubmitting
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-[#3d8a87] hover:shadow-lg'
                }`}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar'}
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="px-6 md:px-32 py-10 text-gray-700 bg-[#EDEDED]">
        <p className="text-sm leading-relaxed mb-6">
          Si necesita de nuestra asistencia personalizada para su compañía
          podemos elaborar un programa adecuado a sus necesidades,
          <br />
          no dude en contactarnos:
        </p>

        <div className="space-y-2">
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
