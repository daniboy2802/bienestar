import React from 'react';
import { useParams } from 'react-router-dom';

const services = {
  "accion-nom-035": { name: "test1" },
  "custom-care": { name: "test2" },
  "cobertura-completa": { name: "test3" },
  "capaz-180": { name: "test4" },
  "well-being-coaching": { name: "test5" },
  "webinars": { name: "test6" },
  "cism": { name: "test7" },
}

export default function Servicios() {
  const { slug } = useParams(); 
  return (
    <div>
      <h1>Servicio: {slug}, custom info: {services[slug].name}</h1>
    </div>
  );
}