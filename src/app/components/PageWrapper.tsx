"use client";

import { motion, AnimatePresence } from "framer-motion";
import React from "react";

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, x: -150 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 150 }}
          transition={{ delay: 0.5 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};
