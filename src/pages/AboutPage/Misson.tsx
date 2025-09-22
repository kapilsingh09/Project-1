import React from 'react'
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Leaf, Users, Target, Award, Heart, Globe, Recycle, Zap, Droplets, Wind } from 'lucide-react';
const Misson = () => {

    
  return (
    <div>
              <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-20"
        >
          <Card className="bg-gradient-primary text-primary-foreground border-0 shadow-green">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl md:text-4xl font-bold mb-4">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="max-w-4xl mx-auto text-center ">
              <p className="text-xl md:text-2xl leading-relaxed mb-8 opacity-95">
                To empower communities worldwide with the tools and knowledge they need to create 
                a cleaner, more sustainable future through efficient waste management, environmental 
                education, and community-driven action.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 ">
                <div className="text-center ">
                  <Target className="h-12 w-12 mx-auto mb-4 opacity-90" />
                  <h3 className="text-xl font-semibold mb-2">Vision</h3>
                  <p className="opacity-90">A world where waste becomes a resource and every community thrives sustainably</p>
                </div>
                <div className="text-center ">
                  <Zap className="h-12 w-12 mx-auto mb-4 opacity-90" />
                  <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                  <p className="opacity-90">Using technology to make environmental action simple and accessible to everyone</p>
                </div>
                <div className="text-center">
                  <Globe className="h-12 w-12  mx-auto mb-4 opacity-90" />
                  <h3 className="text-xl font-semibold mb-2">Impact</h3>
                  <p className="opacity-90">Creating measurable positive change in communities around the globe</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>   
    </div>
  )
}

export default Misson
