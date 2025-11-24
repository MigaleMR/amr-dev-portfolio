"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isChanging: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Traducciones
const translations = {
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.about': 'About Me',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'nav.lightMode': 'Light Mode',
    'nav.darkMode': 'Dark Mode',
    
    // Hero Section
    'hero.greeting': 'Hi, I\'m',
    'hero.role': 'Software Engineer Student | Web Developer | Full-Stack Developer',
    'hero.viewProjects': 'View Projects',
    'hero.contactMe': 'Contact Me',
    
    // Projects Section
    'projects.title': 'Featured Projects',
    'projects.pageTitle': 'My Projects',
    'projects.pageDescription': 'Here are some of my recent projects. Click on the links to view the code or the live demo.',
    'projects.code': 'Code',
    'projects.link': 'Link',
    
    // About Page
    'about.title': 'About Me',
    'about.bio': 'I am a costarrican software developer with a passion for creating web applications. With a strong background in TypeScript and frameworks like React, I enjoy building user-friendly interfaces and optimizing performance.',
    'about.skills': 'Skills',
    'about.frontend': 'Frontend',
    'about.backend': 'Backend',
    'about.tools': 'Tools',
    'about.experience': 'Experience',
    'about.position': 'Front-End Developer',
    'about.company': 'Neopublicitario',
    'about.experienceDate': 'January 2025 - June 2025',
    'about.experienceDesc1': 'Developed user-friendly web applications using React and TypeScript.',
    'about.experienceDesc2': 'Collaborated with designers to implement responsive UI/UX designs.',
    'about.education': 'Education',
    'about.degree': 'Bachelor of Software Engineering',
    'about.university': 'Instituto Tecnológico de Costa Rica',
    'about.educationDate': 'In Progress · 2023 - Present',
    'about.downloadCV': 'Download CV',
    
    // Contact Page
    'contact.title': 'Let\'s Work Together',
    'contact.description': 'Looking for a dedicated Full Stack Developer? Let\'s connect and discuss how I can contribute to your team\'s success.',
    'contact.fullName': 'Full Name',
    'contact.fullNamePlaceholder': 'Your full name',
    'contact.email': 'Email Address',
    'contact.emailPlaceholder': 'your.email@example.com',
    'contact.subject': 'Subject',
    'contact.subjectPlaceholder': 'What\'s this about?',
    'contact.message': 'Your Message',
    'contact.messagePlaceholder': 'Tell me about your project or how we can work together...',
    'contact.sending': 'Sending...',
    'contact.sendMessage': 'Send Message',
    'contact.successMessage': 'Message sent successfully! I\'ll contact you soon.',
    'contact.errorMessage': 'Error sending message. Please try again.',
    'contact.connectionError': 'Connection error. Please try again.',
    
    // Project Descriptions (from projects.ts)
    'project.devtree.description': 'A full-stack platform exclusive for developers made to share their social media.',
    'project.schoolify.description': 'A full-stack collaborative college project designed to provide a virtual classroom platform.',
    'project.cashtrackr.description': 'A platform that allows users to create budgets and their respective expenses (work in progress).',
    'project.agendafy.description': 'A comprehensive appointment scheduling and calendar management system designed for efficient time management.',
    'project.portfolio.description': 'My first portfolio website built to showcase my projects and skills as a developer',
    'project.portfolio.title': 'Portfolio',
    'project.ecocolones.description': 'Eco-Colones is a web platform that encourages recycling by connecting users, affiliated businesses and collection centers. Users earn points for recycling, track transactions, and locate nearby collection points on an interactive map',
    'project.ecocolones.title': 'EcoColones',
    
    // Footer
    'footer.description': 'Software Engineer Student passionate about creating innovative web solutions. Specialized in Full-Stack development with modern technologies.',
    'footer.quickLinks': 'Quick Links',
    'footer.contactInfo': 'Contact Info',
    'footer.email': 'Email',
    'footer.phone': 'Phone',
    'footer.location': 'Location',
    'footer.allRightsReserved': 'All rights reserved.',
    'footer.madeIn': 'Made in Costa Rica',
  },
  es: {
    // Navbar
    'nav.home': 'Inicio',
    'nav.about': 'Acerca de',
    'nav.projects': 'Proyectos',
    'nav.contact': 'Contacto',
    'nav.lightMode': 'Modo Claro',
    'nav.darkMode': 'Modo Oscuro',
    
    // Hero Section
    'hero.greeting': 'Hola, soy',
    'hero.role': 'Estudiante de Ingeniería de Software | Desarrollador Web | Desarrollador Full-Stack',
    'hero.viewProjects': 'Ver Proyectos',
    'hero.contactMe': 'Contáctame',
    
    // Projects Section
    'projects.title': 'Proyectos Destacados',
    'projects.pageTitle': 'Mis Proyectos',
    'projects.pageDescription': 'Aquí están algunos de mis proyectos recientes. Haz clic en los enlaces para ver el código o la demo en vivo.',
    'projects.code': 'Código',
    'projects.link': 'Enlace',
    
    // About Page
    'about.title': 'Acerca de Mí',
    'about.bio': 'Soy un desarrollador de software costarricense con pasión por crear aplicaciones web. Con una sólida experiencia en TypeScript y frameworks como React, disfruto construir interfaces amigables y optimizar el rendimiento.',
    'about.skills': 'Habilidades',
    'about.frontend': 'Frontend',
    'about.backend': 'Backend',
    'about.tools': 'Herramientas',
    'about.experience': 'Experiencia',
    'about.position': 'Desarrollador Front-End',
    'about.company': 'Neopublicitario',
    'about.experienceDate': 'Enero 2025 - Junio 2025',
    'about.experienceDesc1': 'Desarrollé aplicaciones web amigables usando React y TypeScript.',
    'about.experienceDesc2': 'Colaboré con diseñadores para implementar diseños UI/UX responsivos.',
    'about.education': 'Educación',
    'about.degree': 'Licenciatura en Ingeniería de Software',
    'about.university': 'Instituto Tecnológico de Costa Rica',
    'about.educationDate': 'En Progreso · 2023 - Presente',
    'about.downloadCV': 'Descargar CV',
    
    // Contact Page
    'contact.title': 'Trabajemos Juntos',
    'contact.description': '¿Buscas un Desarrollador Full Stack dedicado? Conectemos y hablemos sobre cómo puedo contribuir al éxito de tu equipo.',
    'contact.fullName': 'Nombre Completo',
    'contact.fullNamePlaceholder': 'Tu nombre completo',
    'contact.email': 'Correo Electrónico',
    'contact.emailPlaceholder': 'tu.correo@ejemplo.com',
    'contact.subject': 'Asunto',
    'contact.subjectPlaceholder': '¿De qué se trata?',
    'contact.message': 'Tu Mensaje',
    'contact.messagePlaceholder': 'Cuéntame sobre tu proyecto o cómo podemos trabajar juntos...',
    'contact.sending': 'Enviando...',
    'contact.sendMessage': 'Enviar Mensaje',
    'contact.successMessage': '¡Mensaje enviado exitosamente! Te contactaré pronto.',
    'contact.errorMessage': 'Error al enviar el mensaje. Intenta de nuevo.',
    'contact.connectionError': 'Error de conexión. Por favor intenta de nuevo.',
    
    // Project Descriptions (from projects.ts)
    'project.devtree.description': 'Una plataforma full-stack exclusiva para desarrolladores diseñada para compartir sus redes sociales.',
    'project.schoolify.description': 'Un proyecto universitario colaborativo full-stack diseñado para proporcionar una plataforma de aula virtual.',
    'project.cashtrackr.description': 'Una plataforma que permite a los usuarios crear presupuestos y sus respectivos gastos (trabajo en progreso).',
    'project.agendafy.description': 'Un sistema integral de programación de citas y gestión de calendario diseñado para una administración eficiente del tiempo.',
    'project.portfolio.description': 'Mi primer sitio web de portafolio creado para mostrar mis proyectos y habilidades como desarrollador',
    'project.portfolio.title': 'Portafolio',
    'project.ecocolones.description': 'Eco-Colones es una plataforma web que fomenta el reciclaje conectando a usuarios, negocios y centros de recolección. Los usuarios obtienen puntos por reciclar, registran transacciones y localizan puntos de recolección cercanos en un mapa interactivo',
    'project.ecocolones.title': 'EcoColones',
    
    // Footer
    'footer.description': 'Estudiante de Ingeniería de Software apasionado por crear soluciones web innovadoras. Especializado en desarrollo Full-Stack con tecnologías modernas.',
    'footer.quickLinks': 'Enlaces Rápidos',
    'footer.contactInfo': 'Información de Contacto',
    'footer.email': 'Correo',
    'footer.phone': 'Teléfono',
    'footer.location': 'Ubicación',
    'footer.allRightsReserved': 'Todos los derechos reservados.',
    'footer.madeIn': 'Hecho en Costa Rica',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('portfolio-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = async (lang: Language) => {
    if (lang === language) return;
    
    setIsChanging(true);
    
    // Pequeña pausa para mostrar la transición
    setTimeout(() => {
      setLanguage(lang);
      localStorage.setItem('portfolio-language', lang);
      
      // Terminar la animación después de un breve momento
      setTimeout(() => {
        setIsChanging(false);
      }, 150);
    }, 150);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t, isChanging }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
