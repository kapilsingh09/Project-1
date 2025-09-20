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



  const milestones = [
    { year: '2020', title: 'Company Founded', description: 'Started with a vision to revolutionize waste management' },
    { year: '2021', title: 'First 1,000 Users', description: 'Reached our first milestone in community engagement' },
    { year: '2022', title: '10 Cities Launch', description: 'Expanded operations to 10 major metropolitan areas' },
    { year: '2023', title: 'Smart Technology', description: 'Introduced advanced waste classification technology' },
    { year: '2024', title: 'Global Expansion', description: 'Now serving communities in over 25 cities worldwide' }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-full mb-6 shadow-green"
          >
            <Leaf className="h-10 w-10 text-primary-foreground" />
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            About Clean & Green
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            We're on a mission to create cleaner, more sustainable communities through innovative 
            waste management technology and community engagement.
          </p>
        </motion.div>

        {/* Stats Section
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="text-center"
            >
              <Card className="border-0 shadow-card hover:shadow-green transition-all duration-300 p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4 shadow-green">
                  <stat.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div> */}

        {/* Mission Section */}

        <Misson />

<Team />
        {/* Values Section */}

<Values />
        {/* Team Section */}


        {/* Timeline Section */}
<Timeline />
        {/* CTA Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-center"
        >
          <Card className="bg-gradient-primary text-primary-foreground border-0 shadow-green">
            <CardHeader>
              <CardTitle className="text-3xl md:text-4xl font-bold mb-4">
                Join Our Mission
              </CardTitle>
              <CardDescription className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
                Ready to make a difference in your community? Start reporting waste and help us create a cleaner, greener future together.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="text-lg px-8 py-6 hover:shadow-lg transition-all duration-300"
                >
                  Start Reporting Waste
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-6"
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
