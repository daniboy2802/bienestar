import React from "react";
import {
  Typography,
  Card,
  CardBody,
} from "@material-tailwind/react";
import { Handshake, Heart} from 'lucide-react';

const infoCards = [  
  {
    title : "Nuestro compromiso",
    description: "Acompañamos a las personas en momentos difíciles y también en su crecimiento personal y profesional, para que puedan pontenciar sus capacidades, fortalecer sus habilidades y alcanzar una vida plena y equilibrada en el ámbito laboral, familiar y social.",
    icon: <Handshake className="w-12 h-12 text-[#17b8b9]" strokeWidth={1.5} />,
  },
  {
    title: "Nuestro valor diferencial",
    description: (
      <>
        Nuestro <strong>trato humano</strong>, sensible y profesional nos distingue.<br />Actuamos con empatía, confidencialidad y ética, porque sabemos que trabajamos con lo más valioso: <strong>las emociones de las personas.</strong>
      </>
    ),
    icon: <Heart className="w-12 h-12 text-[#17b8b9]" strokeWidth={1.5} />,
  }
]; 

export default function AboutUs() {
  return (
    <div className="flex flex-col w-full font-sans">
      <section className="flex flex-col md:flex-row h-auto md:h-[350px] w-full">
        <div className="w-full md:w-1/2 bg-[#41affd] flex flex-col justify-center px-8 md:px-20 py-12">
          <Typography variant="h1" color="white" className="text-4xl md:text-6xl font-normal leading-tight pl-20">
            Bienvenido <br />
            a Asistencia y <br />
            Bienestar PAE
          </Typography>
        </div>
        <div className="w-full md:w-1/2 relative h-[300px] md:h-full">
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Imagen Conozcanos" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </section>
      <section className="bg-[#f2f2f2] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <Typography variant="h2" className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 leading-tight">
              ¿Cómo se <br />
              encuentra hoy?
            </Typography>
            <div className="space-y-8 max-w-4xl text-gray-700">
              <Typography className="font-normal text-lg leading-relaxed">
                En Asistencia y Bienestar PAE estamos para escucharle, acompañarle y brindarle 
                apoyo en cualquier momento, día y lugar.
                Nuestro propósito es que usted y su equipo se sientan emocionalmente tranquilos, 
                en equilibrio y con bienestar integral.
              </Typography>
              <Typography className="font-normal text-lg leading-relaxed">
                Somos un grupo de profesionales especializados: psicólogos (con maestría y 
                doctorado), asesores en temas legales, financieros, fiscales, de haberes del retiro 
                y nutrición, entre otros.
                Trabajamos para ofrecer un acompañamiento psicológico y asesoramiento 
                integral, que ayude a sus colaboradores a recuperar la estabilidad, la motivación 
                y el control de su vida.
              </Typography>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {infoCards.map((item, idx) => (
              <InfoCard key={idx} item={item} />
            ))}
          </div>
        </div>
      </section>
      <section 
        className="relative h-[500px] w-full bg-cover bg-center flex items-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 px-8 md:px-24 max-w-5xl">
          <Typography variant="h2" color="white" className="text-3xl md:text-4xl leading-snug font-normal">
            “Una empresa sana <br />
            y emocionalmente <br />
            <span className="font-light">en equilibrio es una empresa más <br />
            eficiente y productiva.”</span>
          </Typography>
        </div>
      </section>
    </div>
  );
  function InfoCard({ item }) {
    return (
      <Card className="h-[400px] max-w-lg shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-visible">
        <CardBody className="flex flex-col items-start text-left p-8 h-full">
          <div className="mb-6">
              {item.icon}
          </div>
          <Typography variant="h4" color="blue-gray" className="mb-4 font-bold leading-tight">
            {item.title.split(' ').map((word, i) => i === 0 ? <span key={i} className="block">{word}</span> : <span key={i}>{word} </span>)}
          </Typography>
          <Typography className="text-gray-600 font-normal leading-relaxed text-lg md:text-lg mb-4">
            {item.description}
          </Typography>
        </CardBody>
      </Card>
    );
  }
}