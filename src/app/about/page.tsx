"use client";

import React from "react";
import { FaCode, FaLaptopCode, FaTools, FaDownload } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, slideInLeft, slideInRight, pageTransition } from "@/utils/animation";
import { useLanguage } from "../context/LanguageContext";

export default function About() {
  const { t, language } = useLanguage();

  return (
    <motion.div {...pageTransition} className="container max-w-7xl mx-auto py-20">
      <motion.h1 {...fadeInUp} className="text-4xl font-bold mb-8 text-center">{t("about.title")}</motion.h1>
      {/* Bio Section */}
      <motion.section {...fadeInUp} transition={{ delay: 0.2 }} className="mb-16">
        <p className="text-lg text-slate-500 max-w-3xl mx-auto text-center">
          {t("about.bio")}
        </p>
      </motion.section>

      {/* CV Download Section */}
      <motion.section {...fadeInUp} transition={{ delay: 0.25 }} className="mb-16">
        <div className="flex justify-center">
          <motion.a
            href={language === 'es' ? '/Alejandro Madrigal CV ES.pdf' : '/Alejandro Madrigal CV EN.pdf'}
            download={language === 'es' ? 'Alejandro Madrigal CV ES.pdf' : 'Alejandro Madrigal CV EN.pdf'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <FaDownload className="h-5 w-5" />
            {t("about.downloadCV")}
          </motion.a>
        </div>
      </motion.section>
      {/* Skill Section */}
      <motion.section {...fadeInUp} transition={{ delay: 0.3 }} className="mb-16">
        <h2 className="section-title">{t("about.skills")}</h2>
        <motion.div {...staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div 
            {...slideInLeft}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
            <FaCode className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">{t("about.frontend")}</h3>
            <ul className="text-slate-500 space-y-2">
              <li>React / Next.js</li>
              <li>TypeScript</li>
              <li>TailWind CSS</li>
              <li>HTML5 / CSS3</li>
            </ul>
          </motion.div>
          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
            <FaLaptopCode className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">{t("about.backend")}</h3>
            <ul className="text-slate-500 space-y-2">
              <li>Node.js</li>
              <li>Express</li>
              <li>PostgreSQL</li>
              <li>MongoDB</li>
            </ul>
          </motion.div>
          <motion.div 
            {...slideInRight}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
            <FaTools className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">{t("about.tools")}</h3>
            <ul className="text-slate-500 space-y-2">
              <li>GitHub</li>
              <li>Docker</li>
              <li>Office</li>
              <li>CI/CD</li>
            </ul>
          </motion.div>
        </motion.div>
      </motion.section>
      {/* Experience Section */}
      <motion.section {...fadeInUp} transition={{ delay: 0.4 }} className="mb-16">
        <h2 className="section-title">{t("about.experience")}</h2>
        <div className="max-w-3xl mx-auto space-y-8">
          <motion.div 
            {...slideInLeft}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{t("about.position")}</h3>
            <p className="text-primary/80 mb-2">
              {t("about.company")} · {t("about.experienceDate")}
            </p>
            <ul className="text-slate-500 spacy-y-2 list-disc list-inside">
              <li>
                {t("about.experienceDesc1")}
              </li>
              <li>
                {t("about.experienceDesc2")}
              </li>
            </ul>
          </motion.div>
        </div>
      </motion.section>
      {/* Education Section */}
      <motion.section {...fadeInUp} transition={{ delay: 0.5 }} className="mb-16">
        <h2 className="section-title">{t("about.education")}</h2>
        <div className="max-w-3xl mx-auto space-y-8">
          <motion.div 
            {...slideInRight}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">
              {t("about.degree")}
            </h3>
            <p className="text-primary/80 mb-2">
              {t("about.university")}
            </p>
            <p className="text-slate-500">{t("about.educationDate")}</p>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
}
