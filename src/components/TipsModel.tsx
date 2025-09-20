import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const TipModal = ({ tip, onClose }) => {
  if (!tip) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 50 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="relative w-full max-w-2xl bg-background rounded-xl shadow-lg p-6 md:p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-4 right-4 h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
            <img 
              src={tip.image} 
              alt={tip.title} 
              className="w-full md:w-1/3 h-auto md:h-48 object-cover rounded-lg shadow-md" 
            />
            <div className="flex-1">
              <CardTitle className="text-2xl md:text-3xl font-bold mb-2 text-primary-gradient-foreground">
                {tip.title}
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                {tip.description}
              </CardDescription>
            </div>
          </div>
          
          <CardContent className="p-0">
            <p className="text-lg text-foreground leading-relaxed">
              {tip.fullDescription}
            </p>
          </CardContent>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TipModal;