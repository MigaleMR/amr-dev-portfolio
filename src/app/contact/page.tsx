"use client";

import React from 'react';
import Contact from '../components/Contact';
import { motion } from "framer-motion";
import { pageTransition } from "@/utils/animation";

const ContactPage = () => {
  return (
    <motion.div {...pageTransition}>
      <Contact />
    </motion.div>
  );
};

export default ContactPage;