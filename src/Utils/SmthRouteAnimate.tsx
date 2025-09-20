import React from 'react'
import { motion } from 'framer-motion'

interface SmthRouteAnimateProps {
  children: React.ReactNode;
}

const SmthRouteAnimate: React.FC<SmthRouteAnimateProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className='w-full h-full'
    >
      {children}
    </motion.div>
  )
}

export default SmthRouteAnimate
