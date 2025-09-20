import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar'; // Removed AvatarImage as it's not needed

const Team = () => {

  const team = [
    {
      name: 'Dr. Evelyn Reed',
      role: 'Project Lead',
      bio: 'A visionary leader guiding the team with a strong background in sustainable development and project management.'
    },
    {
      name: 'Kapil',
      role: 'Frontend Developer',
      bio: 'Specializes in creating intuitive and engaging user interfaces, ensuring a seamless user experience (UI/UX).'
    },
    {
      name: 'Maria Lopez',
      role: 'Backend Developer',
      bio: 'Develops robust and scalable backend systems, handling data and server-side logic efficiently in servers. '
    },
    {
      name: 'Daniel Kim',
      role: 'Information Gatherer',
      bio: 'A detail-oriented researcher responsible for collecting and verifying all necessary information for the project.'
    },
    {
      name: 'Jessica Lee',
      role: 'Presentation Designer (PPT)',
      bio: 'Crafts compelling and visually stunning presentations, translating complex ideas into clear and impactful visuals.'
    },
    {
      name: 'Chris Evans',
      role: 'Analyst & Strategist',
      bio: 'Focuses on data analysis and strategic planning to ensure the project meets its goals effectively and achives goals.'
    }
  ];

  return (
    <div>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mb-20"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Our Team</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Passionate individuals working together to create a cleaner, greener future
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pl-20 pr-20">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <Card className="text-center  shadow-card hover:shadow-green border border-white/20 transition-all duration-300">
                <CardHeader className="pb-4">
                  <Avatar className="w-24 h-24 mx-auto mb-4 shadow-soft">
                    {/* The AvatarImage component has been removed */}
                    <AvatarFallback className="text-lg font-semibold bg-gradient-primary text-primary-foreground">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Team;