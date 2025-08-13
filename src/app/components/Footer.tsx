"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/utils/animation";

const Footer = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: t("footer.email"),
      value: "alejandromr0812@gmail.com",
      href: "mailto:alejandromr0812@gmail.com",
    },
    {
      icon: FaPhone,
      label: t("footer.phone"),
      value: "+506 8944-1991",
      href: "tel:+50689441991",
    },
    {
      icon: FaMapMarkerAlt,
      label: t("footer.location"),
      value: "Costa Rica",
      href: "#",
    },
  ];

  const socialLinks = [
    {
      icon: FaGithub,
      href: "https://github.com/MigaleMR",
      label: "GitHub",
    },
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/miguel-alejandro-madrigal-ramírez-45abba325",
      label: "LinkedIn",
    },
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/alemadrigal8",
      label: "Instagram",
    },
  ];

  const quickLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/projects", label: t("nav.projects") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <footer className="bg-white dark:bg-dark border-t border-gray-200 dark:border-gray-800 transition-colors">
      <motion.div {...staggerContainer} className="container max-w-7xl mx-auto px-4 py-12">
        <motion.div {...fadeInUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="relative w-12 h-12 mr-3">
                <Image
                  src={theme === "light" ? "/icono_ale.png" : "/icono_ale2.png"}
                  alt="Alejandro Madrigal Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Alejandro Madrigal
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-md">
              {t("footer.description")}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-slate-500 hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="text-sm" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-slate-500 font-semibold text-sm uppercase tracking-wider mb-4">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-slate-500 font-semibold text-sm uppercase tracking-wider mb-4">
              {t("footer.contactInfo")}
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((contact, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <contact.icon className="text-primary text-sm mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500 font-medium">
                      {contact.label}
                    </p>
                    {contact.href !== "#" ? (
                      <Link
                        href={contact.href}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                      >
                        {contact.value}
                      </Link>
                    ) : (
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {contact.value}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          {...fadeInUp}
          transition={{ delay: 0.3 }}
          className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-slate-500">
              © {currentYear} Alejandro Madrigal. {t("footer.allRightsReserved")}
            </p>
            <p className="text-sm text-slate-500 flex items-center">
              {t("footer.madeIn")}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
