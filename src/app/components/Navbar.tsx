"use client";

import {
  Bars3Icon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
  LanguageIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInDown } from "@/utils/animation";
import AnimatedText from "./AnimatedText";

const Navbar = () => {
  const {theme, toggleTheme} = useTheme()
  const { language, setLanguage } = useLanguage()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  const menuItems = [
    { href: "/", label: "nav.home" },
    { href: "/about", label: "nav.about" },
    { href: "/projects", label: "nav.projects" },
    { href: "/contact", label: "nav.contact" },
  ];
  return (
    <motion.nav 
      {...fadeInDown}
      className="fixed w-full bg-white/80 dark:bg-dark backdrop:blur-sm z-50 border-b border-gray-200 dark:border-secondary transition-colors">
      <div className="container max-w7xl mx-auto px-4">
        {/* Desktop Menu */}
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="group relative flex items-center">
            <div className="relative w-20 h-20 transition-transform duration-300 group-hover:scale-110">
              <Image
                src={theme === "light" ? "/icono_ale.png" : "/icono_ale2.png"}
                alt="Alejandro Madrigal Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    hover:text-primary transition-colors font-medium ${
                      isActive ? "text-primary" : ""
                    }`}
                >
                  <AnimatedText translationKey={item.label} />
                </Link>
              );
            })}
            <motion.button 
              onClick={toggleLanguage}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-1 p-2 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800 hover:text-primary transition-all duration-300"
              title={`Switch to ${language === 'en' ? 'Español' : 'English'}`}
            >
              <LanguageIcon className="w-5 h-5" />
              <motion.span 
                key={language}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="text-sm font-medium"
              >
                {language.toUpperCase()}
              </motion.span>
            </motion.button>
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-grey-800 hover:text-primary transition-colors">
              {theme === "dark" ? (
                <SunIcon className="w-5 h-5" />
              ) : (
                <MoonIcon className="w-5 h-5" />
              )}
            </button>
          </div>
          {/* Mobile Menu */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden">
              <div className="py-4 space-y-4">
                {menuItems.map((item, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={toggleMobileMenu}>
                    <Link
                      href={item.href}
                      className="block py-2 hover:text-primary transition-colors"
                    >
                      <AnimatedText translationKey={item.label} />
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: menuItems.length * 0.1 }}>
                  <motion.button 
                    onClick={toggleLanguage}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center py-2 hover:text-primary transition-colors"
                  >
                    <LanguageIcon className="w-5 h-5 mr-2" />
                    <motion.span
                      key={language}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {language === 'en' ? 'Español' : 'English'}
                    </motion.span>
                  </motion.button>
                </motion.div>
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: (menuItems.length + 1) * 0.1 }}>
                  <button onClick={toggleTheme} className="flex items-center py-2 hover:text-primary transition-colors">
                    {theme === "dark" ? (
                      <>
                        <SunIcon className="w-5 h-5 mr-2" /> 
                        <AnimatedText translationKey="nav.lightMode" />
                      </>
                    ) : (
                      <>
                        <MoonIcon className="w-5 h-5 mr-2" /> 
                        <AnimatedText translationKey="nav.darkMode" />
                      </>
                    )}
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
