import React, { useState, useEffect, useRef } from "react";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const stats = [
  { value: 48, suffix: "%", label: "Reducción estrés laboral" },
  { value: 53, suffix: "%", label: "Mejora clima laboral" },
  { value: 52, suffix: "%", label: "Incremento de productividad" },
  { value: 60, suffix: "%", label: "Reducción de ausentismo" },
  { value: 68, suffix: "%", label: "Reducción de fuga de talento" },
];

const pillarsFirstRow = [
  {
    slug: "accion-nom-035",
    title: "Acción NOM-035",
    desc: "El costo de no atender el riesgo psicosocial en la empresa es incalculable.",
    icon: (
      <svg
        className="w-10 h-10 text-[#00A4CF]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  {
    slug: "custom-care",
    title: "Customer CARE",
    desc: "Cálida atención a cliente 24/7 X 365.",
    icon: (
      <svg
        className="w-10 h-10 text-[#00A4CF]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    slug: "cobertura-completa",
    title: "Cobertura completa",
    desc: "De especialidades psicológicas y consultorías especializadas.",
    icon: (
      <svg
        className="w-10 h-10 text-[#00A4CF]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    slug: "capaz-180",
    title: "CAPAZ 180",
    desc: "Ser CAPAZ es un primer paso para lograr sus metas.",
    icon: (
      <svg
        className="w-10 h-10 text-[#00A4CF]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
];

const pillarsSecondRow = [
  {
    slug: "well-being-coaching",
    title: "Well-being coaching fitness emocional.",
    desc: "Fortalecer su estabilidad emocional.",
    icon: (
      <svg
        className="w-10 h-10 text-[#00A4CF]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
  },
  {
    slug: "webinars",
    title: "Webinars + Conferencias ON-SITE",
    desc: "Nos interesa ser un acompañamiento completo.",
    icon: (
      <svg
        className="w-10 h-10 text-[#00A4CF]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    slug: "cism",
    title: "CISM",
    desc: "Intervención en crisis.",
    icon: (
      <svg
        className="w-10 h-10 text-[#00A4CF]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

const heroSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    title: "Bienestar PAE",
    description: "Más que apoyo psicológico:\n\nsomos el impulso emocional que ayuda a sus empleados a crecer, superar desafíos y brillar en cada ambito de su vida.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    title: "Pioneros en México y agentes de inspiración.",
    description: "y cambio para más de 2.3 millones de personas, impulsando su equilibrio emocional y su capacidad para alcanzar sus metas personales y profesionales.",
  },
];

function CountUpStat({ end, suffix, label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          let startTime = null;
          const duration = 2000;

          const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            const easeProgress = 1 - Math.pow(1 - progress, 4);

            setCount(Math.floor(easeProgress * end));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [end]);

  return (
    <div ref={ref} className="flex flex-col items-center px-2">
      <Typography
        variant="h2"
        className="text-4xl md:text-5xl font-light text-gray-900 mb-2"
      >
        {count}
        {suffix}
      </Typography>
      <Typography
        variant="small"
        className="text-gray-600 font-medium leading-tight max-w-[120px]"
      >
        {label}
      </Typography>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCardClick = (slug) => {
    navigate(`/servicio/${slug}`);
  };

  useEffect(() => {
    setIsAnimating(false);
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 50);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000); 

    return () => clearInterval(id);
  }, []);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="flex flex-col w-full">
      <section
        className="relative h-[600px] w-full bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url('${heroSlides[currentSlide].image}')`,
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <Typography
              key={`title-${currentSlide}`}
              variant="h2"
              className={`mb-4 font-normal text-4xl md:text-5xl lg:text-6xl transition-all duration-700 ease-in-out ${
                isAnimating 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4'
              }`}
            >
              {heroSlides[currentSlide].title}
            </Typography>
            <Typography
              key={`description-${currentSlide}`}
              variant="lead"
              className={`mb-8 font-light text-base md:text-lg leading-relaxed whitespace-pre-line transition-all duration-700 delay-150 ease-in-out ${
                isAnimating 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4'
              }`}
            >
              {heroSlides[currentSlide].description}
            </Typography>
            <Button
              size="lg"
              className="bg-[#00C2E8] hover:bg-[#0097C4] text-white rounded-none px-8 shadow-none hover:shadow-lg transition-all"
            >
              CONOCE MÁS &rarr;
            </Button>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                currentSlide === index ? "w-6 bg-white" : "bg-white/60"
              }`}
            />
          ))}
        </div>
      </section>

      <section className="bg-[#F3F4F6] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center divide-x-0 md:divide-x divide-gray-300">
            {stats.map((stat, idx) => (
              <CountUpStat
                key={idx}
                end={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </section>

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {pillarsFirstRow.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleCardClick(item.slug)}
                className="cursor-pointer h-full"
              >
                <PillarCard item={item} />
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {pillarsSecondRow.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleCardClick(item.slug)}
                className="w-full md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] flex-grow-0 cursor-pointer"
              >
                <PillarCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="relative h-[450px] w-full bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <button className="relative z-10 w-20 h-20 bg-[#E91E63] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 group">
          <svg
            className="w-10 h-10 text-white ml-1"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
          <div className="absolute inset-0 rounded-full animate-ping bg-[#E91E63] opacity-25"></div>
        </button>
      </section>
    </div>
  );
}

function PillarCard({ item }) {
  return (
    <Card className="h-full shadow-sm hover:shadow-md transition-shadow border border-gray-100 rounded-xl">
      <CardBody className="flex flex-col items-center text-center p-8 h-full">
        <div className="mb-4 p-3 bg-cyan-50 rounded-full">{item.icon}</div>
        <Typography variant="h6" color="blue-gray" className="mb-2 font-bold">
          {item.title}
        </Typography>
        <Typography className="text-gray-500 text-sm mb-6 flex-grow">
          {item.desc}
        </Typography>
        <div className="mt-auto border border-gray-300 rounded px-4 py-1">
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
      </CardBody>
    </Card>
  );
}
