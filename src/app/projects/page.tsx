"use client";

import { projects } from "@/contents/projects";
import Image from "next/image";
import Link from "next/link";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, pageTransition } from "@/utils/animation";
import { useLanguage } from "../context/LanguageContext";

const Projects = () =>{
    const { t } = useLanguage();

    return(
        <motion.div {...pageTransition} className="container max-w-7xl mx-auto py-20">
            <motion.h1 {...fadeInUp} className="text-4xl font-bold mb-4 text-center">{t("projects.pageTitle")}</motion.h1>
            <motion.p 
              {...fadeInUp} 
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-500 mb-24 text-center">
              {t("projects.pageDescription")}
            </motion.p>
      <motion.div {...staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                src={project.image}
                alt={project.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t(`project.${project.title.toLowerCase()}.description`)}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech) => (
                <span key={tech} className="px-3 py-1 bg-primary/10 text-primary/90 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-4 mt-2">
                <Link href={project.githubLink} target='_blank' className='flex items-center gap-2 text-white hover:text-primary transition-colors'>
                    <FaGithub className="w-5 h-5" /> <span>{t("projects.code")}</span>
                </Link>
                <Link href={project.demoLink} target='_blank' className='flex items-center gap-2 text-white hover:text-primary transition-colors'>
                    <FaExternalLinkAlt className="w-5 h-5" /> <span>{t("projects.link")}</span>
                </Link>
            </div>
          </motion.article>
        ))}
      </motion.div>
        </motion.div>
    )
}

export default Projects;