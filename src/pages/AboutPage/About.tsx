import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Leaf, Users, Target, Award, Heart, Globe, Recycle, Zap, Droplets, Wind } from 'lucide-react';
import Timeline from '../AboutPage/Timeline';
import Team from '../AboutPage/Team';
import Misson from '../AboutPage/Misson';
import Values from '../AboutPage/Values';

const About = () => {
  // Responsive milestones (not used in this file, but left for future use)
  const milestones = [
    { year: '2020', title: 'Company Founded', description: 'Started with a vision to revolutionize waste management' },
    { year: '2021', title: 'First 1,000 Users', description: 'Reached our first milestone in community engagement' },
    { year: '2022', title: '10 Cities Launch', description: 'Expanded operations to 10 major metropolitan areas' },
    { year: '2023', title: 'Smart Technology', description: 'Introduced advanced waste classification technology' },
    { year: '2024', title: 'Global Expansion', description: 'Now serving communities in over 25 cities worldwide' }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle py-8 sm:py-12">
      <div className="container mx-auto px-2 sm:px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-primary rounded-full mb-4 sm:mb-6 shadow-green"
          >
            <Leaf className="h-8 w-8 sm:h-10 sm:w-10 text-primary-foreground" />
          </motion.div>
          
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-primary bg-clip-text text-transparent">
            About Clean & Green
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-muted-foreground max-w-2xl sm:max-w-4xl mx-auto leading-relaxed px-2">
            We're on a mission to create cleaner, more sustainable communities through innovative 
            waste management technology and community engagement.
          </p>
        </motion.div>

        {/* Mission Section */}
        <div className="mb-10 sm:mb-16">
          <Misson />
        </div>

        {/* Team Section */}
        <div className="mb-10 sm:mb-16">
          <Team />
        </div>

        {/* Values Section */}
        <div className="mb-10 sm:mb-16">
          <Values />
        </div>

        {/* Timeline Section */}
        <div className="mb-10 sm:mb-16">
          <Timeline />
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-center"
        >
          <Card className="bg-gradient-primary text-primary-foreground border-0 shadow-green mx-auto w-full sm:px-30">
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">
                Join Our Mission
              </CardTitle>
              <CardDescription className="text-base sm:text-xl text-zinc-900 font-serif  max-w-xl mx-auto">
                Ready to make a difference in your community? Start reporting waste and help us create a cleaner, greener future together.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full">
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto"
                >
                  Start Reporting Waste
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto"
                >
                  Get In Touch
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
