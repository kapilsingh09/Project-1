import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Recycle, MapPin, BarChart3, Calendar, Lightbulb, Users, Award, Zap, Sprout, Leaf } from 'lucide-react';
import heroImage from '@/assets/new_bg.jpg';

const Home = () => {
  const features = [
    {
      icon: MapPin,
      title: 'Smart Waste Reporting',
      description: 'Report waste locations with GPS precision and photo documentation',
      delay: 0.1
    },
    {
      icon: BarChart3,
      title: 'Real-time Analytics',
      description: 'Track waste collection statistics and environmental impact',
      delay: 0.2
    },
    {
      icon: Calendar,
      title: 'Collection Scheduling',
      description: 'Never miss a pickup with smart scheduling and reminders',
      delay: 0.3
    },
    {
      icon: Lightbulb,
      title: 'Recycling Tips',
      description: 'Learn best practices for waste sorting and environmental care',
      delay: 0.4
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Waste Reports', icon: Recycle },
    { number: '500+', label: 'Active Users', icon: Users },
    { number: '95%', label: 'Collection Rate', icon: Award },
    { number: '25%', label: 'Waste Reduced', icon: Zap }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center overflow-hidden ">
        {/* Background Image */}
        <img
          src={heroImage}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ objectPosition: 'center' }}
        />
        {/* Top Overlay */}
        <div
          className="absolute top-0 left-0 w-full"
          style={{
            height: '100%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.15) 10%, rgba(0,0,0,0.7) 80%)',
            zIndex: 11,
            pointerEvents: 'none'
          }}
        />
        {/* Main Overlay */}
        {/* <div className="absolute inset-0 bg-black/20 z-20" /> */}
        {/* Content Overlay */}
        <div className="container mx-auto px-4 relative z-20 text-center mb-10">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Clean the Planet,{' '}
              <span className="bg-gradient-to-r from-green-300 to-blue-300 bg-clip-text text-transparent">
                One Report at a Time
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Join the Clean & Green revolution. Report waste, track collections, 
              and make a real difference in your community's environmental future.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4  justify-center"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link to="/report">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300 text-lg px-9 py-9 rounded-full  shadow-lg"
                >
                  <MapPin className=" h-10 w-10" />
                  Report Waste Now
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button 
                  variant="outline" 
                  className="text-white bg-white/10 backdrop-blur-sm border-white/25 hover:bg-white/23 hover:border-white/50 transition-all duration-300 text-xl px-9 py-9 rounded-full shadow-lg"
                >
                  <BarChart3 className=" h-10 w-10" />
                  View Dashboard
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/4 left-10 hidden lg:block z-20"
        >
          <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full">
            <Recycle className="h-8 w-8 text-white" />
          </div>
        </motion.div>
        
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-16 right-24 hidden lg:block z-20"
        >
          <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full">
            <Leaf className="h-8 w-8 text-white" />
          </div>
        </motion.div>
        
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-16 left-16 hidden lg:block z-20"
        >
          <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full">
            <Sprout className="h-8 w-8 text-white" />
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-1/3 right-10 hidden lg:block z-20"
        >
          <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full">
            <Lightbulb className="h-8 w-8 text-white" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-subtle ">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }} 
            className="text-center mb-16  "
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6  text-white/90 ">
              Smart Waste Management Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Powerful tools to help communities manage waste efficiently and create a cleaner environment
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: feature.delay }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className=" h-full bg-card hover:shadow-green transition-all duration-300 rounded-2xl  shadow-card">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:shadow-green transition-all duration-300">
                      <feature.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Impact</h2>
            <p className="text-xl text-muted-foreground">
              Real numbers showing our community's environmental progress
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="mx-auto w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mb-4 shadow-green">
                  <stat.icon className="h-10 w-10 text-primary-foreground" />
                </div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-lg text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-500/80">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold   mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-white font-serif font-medium mb-8">
              Join thousands of users who are already helping create cleaner, greener communities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/report">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="text-lg px-8 rounded-xl  py-6 hover:shadow-lg transition-all duration-300"
                >
                  Start Reporting
                </Button>
              </Link>
              <Link to="/about">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-transparent rounded-xl text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-6 text-zinc-900"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;