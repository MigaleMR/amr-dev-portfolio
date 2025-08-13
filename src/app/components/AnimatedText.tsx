"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface AnimatedTextProps {
  translationKey: string;
  className?: string;
  children?: React.ReactNode;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ 
  translationKey, 
  className = '', 
  children 
}) => {
  const { t, language } = useLanguage();

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={`${translationKey}-${language}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ 
          duration: 0.3,
          ease: "easeInOut"
        }}
        style={{ display: 'inline-block' }}
        className={className}
      >
        {children || t(translationKey)}
      </motion.span>
    </AnimatePresence>
  );
};

export default AnimatedText;
