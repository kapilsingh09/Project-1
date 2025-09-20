import React from 'react'
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Leaf, Users, Target, Award, Heart, Globe, Recycle, Zap, Droplets, Wind } from 'lucide-react';
const Values = () => {

      const values = [
    {
      icon: Leaf,
      title: 'Environmental Sustainability',
      description: 'We believe in creating a cleaner, greener future for generations to come through innovative waste management solutions.'
    },
    {
      icon: Users,
      title: 'Community Collaboration',
      description: 'Building strong partnerships with local communities to create effective and lasting environmental change.'
    },
    {
      icon: Zap,
      title: 'Innovation & Technology',
      description: 'Leveraging cutting-edge technology to make waste reporting and collection more efficient and accessible.'
    },
    {
      icon: Heart,
      title: 'Social Responsibility',
      description: 'Committed to making environmental care accessible to everyone, regardless of their background or location.'
    }
  ];

  return (
    <div>
              <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do and help us create meaningful environmental impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full border-0 shadow-card hover:shadow-green transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-xl shadow-green">
                        <value.icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <CardTitle className="text-xl">{value.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
    </div>
  )
}

export default Values
