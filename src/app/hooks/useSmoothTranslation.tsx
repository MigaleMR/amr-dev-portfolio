"use client";

import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export const useSmoothTranslation = () => {
  const { t, language } = useLanguage();

  const SmoothText = ({ 
    translationKey, 
    className = '',
    duration = 0.3 
  }: { 
    translationKey: string;
    className?: string;
    duration?: number;
  }) => (
    <AnimatePresence mode="wait">
      <motion.span
        key={`${translationKey}-${language}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ 
          duration,
          ease: "easeInOut"
        }}
        className={className}
      >
        {t(translationKey)}
      </motion.span>
    </AnimatePresence>
  );

  return { t, SmoothText, language };
};

export default useSmoothTranslation;
