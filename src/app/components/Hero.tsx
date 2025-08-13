"use client"

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { motion } from 'framer-motion'
import { fadeInUp, scaleIn } from "@/utils/animation";
import AnimatedText from "./AnimatedText";

// Animación de nodos conectados
const AnimatedBackground = ({ theme }: { theme: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurar canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Nodos
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    // Crear nodos
    const nodeCount = 50;
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Colores basados en el tema
      const nodeColor = '#6366f1'; // Color primario siempre
      const nodeOpacity = theme === 'light' ? 0.8 : 0.6;
      const lineOpacity = theme === 'light' ? 0.4 : 0.3;

      // Actualizar y dibujar nodos
      nodes.forEach((node, i) => {
        // Mover nodos
        node.x += node.vx;
        node.y += node.vy;

        // Rebotar en los bordes
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Mantener dentro del canvas
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));

        // Dibujar nodo
        ctx.fillStyle = nodeColor;
        ctx.globalAlpha = nodeOpacity;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        // Dibujar conexiones
        nodes.slice(i + 1).forEach(otherNode => {
          const distance = Math.sqrt(
            Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
          );

          if (distance < 150) {
            const opacity = (150 - distance) / 150 * lineOpacity;
            ctx.strokeStyle = nodeColor;
            ctx.globalAlpha = opacity;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 1 }}
    />
  );
};

const Hero = () => {
  const { theme } = useTheme();
  
  // Determinar el fondo según el tema
  const backgroundClass = theme === 'light' 
    ? 'bg-gradient-to-br from-gray-50 via-white to-gray-100' 
    : 'bg-gradient-to-br from-gray-900 via-gray-800 to-black';
  
  // Determinar los colores del texto según el tema
  const textColor = theme === 'light' ? 'text-gray-900' : 'text-white';
  const subtextColor = theme === 'light' ? 'text-gray-600' : 'text-gray-300';
  const iconColor = theme === 'light' ? 'text-gray-600 hover:text-primary' : 'text-gray-300 hover:text-primary';
  
  return (
    <section className={`relative w-full h-screen -mt-24 flex items-center justify-center overflow-hidden ${backgroundClass}`}>
      {/* Fondo animado */}
      <AnimatedBackground theme={theme} />
      
      {/* Contenido principal */}
      <div className="relative z-10 container max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div 
            {...scaleIn}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center mb-4"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mb-4">
              <Image
                src={theme === "light" ? "/logo_ale1.png" : "/logo_ale2.png"}
                alt="Alejandro Madrigal Logo"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </motion.div>
          
          <motion.h1
            {...fadeInUp}
            transition={{ delay: 0.3 }}
            className={`text-4xl md:text-6xl font-bold mb-6 ${textColor}`}
          >
            <AnimatedText translationKey="hero.greeting" /> <span className="text-primary">Alejandro Madrigal</span>
          </motion.h1>
          
          <motion.p 
            {...fadeInUp}
            transition={{ delay: 0.5 }}
            className={`text-xl md:text-2xl ${subtextColor} mb-8`}
          >
            <AnimatedText translationKey="hero.role" />
          </motion.p>
          
          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.6 }}
            className="flex justify-center space-x-4 mb-8"
          >
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
              <Link
                href="https://github.com/MigaleMR"
                className={`text-2xl ${iconColor} transition-colors`}
              >
                <FaGithub />
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
              <Link
                href="https://www.linkedin.com/in/miguel-alejandro-madrigal-ramírez-45abba325"
                className={`text-2xl ${iconColor} transition-colors`}
              >
                <FaLinkedin />
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
              <Link
                href="https://www.instagram.com/alemadrigal8"
                className={`text-2xl ${iconColor} transition-colors`}
              >
                <FaInstagram />
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.8 }}
            className="flex flex-col md:flex-row justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
              <Link
                href="/projects"
                className="bg-primary inline-block w-full md:w-auto text-white px-8 py-3 rounded-lg hover:bg-primary/70 transition-colors"
              >
                <AnimatedText translationKey="hero.viewProjects" />
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
              <Link
                href="/contact"
                className="bg-secondary/70 inline-block w-full md:w-auto text-white px-8 py-3 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <AnimatedText translationKey="hero.contactMe" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

