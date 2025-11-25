"use client";

import { projects } from "@/contents/projects";
import Image from "next/image";
import Link from "next/link";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/utils/animation";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import AnimatedText from "./AnimatedText";

const Projects = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <section className="py-20 container max-w-7xl mx-auto px-4">
      <motion.h2 
        {...fadeInUp}
        className="text-3xl font-bold mb-12 text-center">
        <AnimatedText translationKey="projects.title" />
      </motion.h2>
      <motion.div 
        {...staggerContainer}
        className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6"
          >
            <div className=" relative aspect-video mb-4 rounded-lg overflow-hidden">
              <Image
                src={
                  project.title.toLowerCase() === "portfolio"
                    ? theme === "light"
                      ? "/projects/icono_ale.png"
                      : "/projects/icono_ale2.png"
                    : project.image
                }
                alt={project.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {(() => {
                const key = `project.${project.title.toLowerCase()}.title`;
                const translated = t(key);
                return translated === key ? project.title : translated;
              })()}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {(() => {
                const key = `project.${project.title.toLowerCase()}.description`;
                const translated = t(key);
                return translated === key ? project.description : translated;
              })()}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech) => (
                <span key={tech} className="px-3 py-1 bg-primary/10 text-primary/90 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-4 mt-2">
                <Link href={project.githubLink} target='_blank' className='flex items-center gap-2 dark:text-white text-gray-600 hover:text-primary transition-colors'>
                    <FaGithub className="w-5 h-5" /> <span>{t("projects.code")}</span>
                </Link>
                <Link href={project.demoLink} target='_blank' className='flex items-center gap-2 dark:text-white text-gray-600 hover:text-primary transition-colors'>
                    <FaExternalLinkAlt className="w-5 h-5" /> <span>{t("projects.link")}</span>
                </Link>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default Projects;
