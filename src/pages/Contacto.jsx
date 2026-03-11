import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// URL de la Lambda a través de API Gateway
const LAMBDA_ENDPOINT = process.env.REACT_APP_LAMBDA_ENDPOINT || 'https://u8jetz7kg5.execute-api.us-east-1.amazonaws.com/prod/contact';

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
  const [errors, setErrors] = useState({});

  // Limpiar mensaje de éxito después de 5 segundos
  useEffect(() => {
    if (submitStatus === 'success') {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  // Validar email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validar formulario
  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.apellido.trim()) {
      newErrors.apellido = 'El apellido es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Por favor ingresa un email válido';
    }

    if (!formData.empresa.trim()) {
      newErrors.empresa = 'La empresa es requerida';
    }

    if (!formData.giro.trim()) {
      newErrors.giro = 'El giro es requerido';
    }

    if (!formData.numero_empleados.trim()) {
      newErrors.numero_empleados = 'El número de empleados es requerido';
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es requerido';
    } else if (formData.mensaje.trim().length < 10) {
      newErrors.mensaje = 'El mensaje debe tener al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
    // Limpiar estado de envío al cambiar campos
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar formulario antes de enviar
    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrors({});

    try {
      // Preparar los datos para enviar
      const payload = {
        nombre: formData.nombre.trim(),
        apellido: formData.apellido.trim(),
        email: formData.email.trim(),
        empresa: formData.empresa.trim(),
        giro: formData.giro.trim(),
        numero_empleados: formData.numero_empleados.trim(),
        mensaje: formData.mensaje.trim(),
      };

      console.log('Enviando formulario a:', LAMBDA_ENDPOINT);
      console.log('Datos enviados:', payload);

      const response = await fetch(LAMBDA_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Manejar la respuesta
      let data;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        try {
          data = JSON.parse(text);
        } catch {
          data = { message: text || 'Respuesta no válida del servidor' };
        }
      }

      console.log('Respuesta recibida:', { status: response.status, data });

      if (response.ok) {
        // Verificar si realmente hubo éxito en el envío de SMS
        if (data.results && Array.isArray(data.results)) {
          const hasErrors = data.results.some(r => r.status === 'error');
          const hasSuccess = data.results.some(r => r.status === 'success');
          
          console.log('Resultados de envío SMS:', {
            total: data.results.length,
            exitosos: data.results.filter(r => r.status === 'success').length,
            errores: data.results.filter(r => r.status === 'error').length,
            detalles: data.results
          });
          
          if (hasErrors && !hasSuccess) {
            // Todos los SMS fallaron
            setSubmitStatus('error');
            console.error('Todos los SMS fallaron:', data.results);
            // Guardar detalles del error para debugging
            setErrors({ 
              _general: `Error al enviar notificaciones: ${data.results.map(r => r.error || 'Error desconocido').join(', ')}` 
            });
          } else if (hasErrors) {
            // Algunos SMS fallaron pero otros tuvieron éxito
            console.warn('Algunos SMS fallaron pero el formulario se procesó:', data.results);
            setSubmitStatus('success');
            // Limpiar formulario después de éxito parcial
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
            // Todo exitoso
            setSubmitStatus('success');
            // Limpiar formulario después de éxito
            setFormData({
              nombre: "",
              apellido: "",
              email: "",
              empresa: "",
              giro: "",
              numero_empleados: "",
              mensaje: "",
            });
          }
        } else {
          // No hay información de resultados, asumir éxito
          setSubmitStatus('success');
          setFormData({
            nombre: "",
            apellido: "",
            email: "",
            empresa: "",
            giro: "",
            numero_empleados: "",
            mensaje: "",
          });
        }
      } else {
        setSubmitStatus('error');
        console.error('Error en la respuesta del servidor:', {
          status: response.status,
          statusText: response.statusText,
          data,
        });
        // Guardar detalles del error para debugging
        setErrors({ 
          _general: `Error del servidor (${response.status}): ${data.error || data.message || 'Error desconocido'}` 
        });
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error al enviar formulario:', error);
      console.error('Detalles del error:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
        cause: error.cause
      });
      
      // Mensajes de error más específicos
      let errorMessage = 'Error desconocido al enviar el formulario';
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        errorMessage = 'Error de red: No se pudo conectar con el servidor. Verifica tu conexión a internet.';
        console.error('Error de red: No se pudo conectar con el servidor');
      } else if (error.message) {
        errorMessage = `Error: ${error.message}`;
      }
      
      // Guardar detalles del error para debugging
      setErrors({ 
        _general: errorMessage 
      });
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

      <section className="flex justify-center py-10 md:py-16 bg-[#EDEDED] px-4 sm:px-6">
        <div className="bg-white rounded-xl p-4 sm:p-6 md:p-10 w-full max-w-4xl shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className={`w-full bg-[#F5F5F5] p-3 rounded-md outline-none focus:ring-2 focus:ring-[#2072b2] ${
                    errors.nombre ? 'border-2 border-red-400' : ''
                  }`}
                  placeholder="Nombre"
                />
                {errors.nombre && (
                  <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  required
                  className={`w-full bg-[#F5F5F5] p-3 rounded-md outline-none focus:ring-2 focus:ring-[#2072b2] ${
                    errors.apellido ? 'border-2 border-red-400' : ''
                  }`}
                  placeholder="Apellido"
                />
                {errors.apellido && (
                  <p className="text-red-500 text-sm mt-1">{errors.apellido}</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full bg-[#F5F5F5] p-3 rounded-md outline-none focus:ring-2 focus:ring-[#2072b2] ${
                  errors.email ? 'border-2 border-red-400' : ''
                }`}
                placeholder="e-mail"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="mt-4">
              <input
                type="text"
                name="empresa"
                value={formData.empresa}
                onChange={handleChange}
                required
                className={`w-full bg-[#F5F5F5] p-3 rounded-md outline-none focus:ring-2 focus:ring-[#2072b2] ${
                  errors.empresa ? 'border-2 border-red-400' : ''
                }`}
                placeholder="Empresa"
              />
              {errors.empresa && (
                <p className="text-red-500 text-sm mt-1">{errors.empresa}</p>
              )}
            </div>

            <div className="mt-4">
              <input
                type="text"
                name="giro"
                value={formData.giro}
                onChange={handleChange}
                required
                className={`w-full bg-[#F5F5F5] p-3 rounded-md outline-none focus:ring-2 focus:ring-[#2072b2] ${
                  errors.giro ? 'border-2 border-red-400' : ''
                }`}
                placeholder="Giro"
              />
              {errors.giro && (
                <p className="text-red-500 text-sm mt-1">{errors.giro}</p>
              )}
            </div>

            <div className="mt-4">
              <input
                type="text"
                name="numero_empleados"
                value={formData.numero_empleados}
                onChange={handleChange}
                required
                className={`w-full bg-[#F5F5F5] p-3 rounded-md outline-none focus:ring-2 focus:ring-[#2072b2] ${
                  errors.numero_empleados ? 'border-2 border-red-400' : ''
                }`}
                placeholder="Número de empleados"
              />
              {errors.numero_empleados && (
                <p className="text-red-500 text-sm mt-1">{errors.numero_empleados}</p>
              )}
            </div>

            <div className="mt-4">
              <textarea
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                required
                rows={4}
                className={`w-full bg-[#F5F5F5] p-3 rounded-md outline-none resize-none focus:ring-2 focus:ring-[#2072b2] ${
                  errors.mensaje ? 'border-2 border-red-400' : ''
                }`}
                placeholder="Mensajes"
              />
              {errors.mensaje && (
                <p className="text-red-500 text-sm mt-1">{errors.mensaje}</p>
              )}
            </div>

            {/* Mensaje de estado */}
            {submitStatus === 'success' && (
              <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md animate-fade-in">
                <div className="flex items-center gap-2">
                  <span className="text-xl">✓</span>
                  <div>
                    <p className="font-semibold">¡Mensaje enviado exitosamente!</p>
                    <p className="text-sm mt-1">Nos pondremos en contacto contigo pronto.</p>
                  </div>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md animate-fade-in">
                <div className="flex items-start gap-2">
                  <span className="text-xl">✗</span>
                  <div className="flex-1">
                    <p className="font-semibold">Error al enviar el mensaje</p>
                    {errors._general && (
                      <p className="text-sm mt-1 font-mono bg-red-50 p-2 rounded border border-red-200">
                        {errors._general}
                      </p>
                    )}
                    <p className="text-sm mt-2">
                      Por favor, intenta nuevamente o contáctanos directamente por email a{' '}
                      <a 
                        href="mailto:contacto@bienestarpae.com" 
                        className="underline hover:text-red-800"
                      >
                        contacto@bienestarpae.com
                      </a>
                      {' '}o al teléfono{' '}
                      <a 
                        href="tel:+525537845715" 
                        className="underline hover:text-red-800"
                      >
                        5537845715
                      </a>
                    </p>
                    <p className="text-xs mt-2 text-red-600">
                      Si el problema persiste, revisa la consola del navegador (F12) para más detalles.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <p className="mt-4 text-sm text-gray-600">
              Al enviar este formulario estás de acuerdo con la{" "}
              <Link
                to="/politica-privacidad"
                className="text-[#2072b2] hover:underline font-medium"
              >
                política de privacidad
              </Link>
              .
            </p>

            <div className="flex justify-end mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 bg-[#4AA3A0] text-white rounded-md text-lg font-medium transition-all transform ${
                  isSubmitting
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-[#3d8a87] hover:shadow-lg hover:scale-105 active:scale-95'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  'Enviar'
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="px-4 sm:px-6 md:px-12 lg:px-32 py-10 text-gray-700 bg-[#EDEDED]">
        <p className="text-sm leading-relaxed mb-6">
          Si necesita de nuestra asistencia personalizada para su compañía
          podemos elaborar un programa adecuado a sus necesidades,
          <br />
          no dude en contactarnos:
        </p>

        <div className="space-y-3">
          <div className="flex items-start gap-2 pt-2">
            <span>📧</span>
            <a href="mailto:contacto@bienestarpae.com" className="text-sm text-gray-700 hover:text-[#2072b2] hover:underline">
              contacto@bienestarpae.com
            </a>
          </div>
          <div className="flex items-start gap-2">
            <span>📞</span>
            <a href="tel:+525537845715" className="text-sm text-gray-700 hover:text-[#2072b2] hover:underline">
              5537845715
            </a>
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
