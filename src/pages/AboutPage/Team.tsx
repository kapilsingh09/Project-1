import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Team = () => {
  const team = [
    {
      name: "Dr. Evelyn Reed",
      role: "Project Lead",
      bio: "A visionary leader guiding the team with a strong background in sustainable development and project management.",
    },
    {
      name: "Kapil",
      role: "Frontend Developer",
      bio: "Specializes in creating intuitive and engaging user interfaces, ensuring a seamless user experience (UI/UX).",
    },
    {
      name: "Maria Lopez",
      role: "Backend Developer",
      bio: "Develops robust and scalable backend systems, handling data and server-side logic efficiently in servers.",
    },
    {
      name: "Daniel Kim",
      role: "Information Gatherer",
      bio: "A detail-oriented researcher responsible for collecting and verifying all necessary information for the project.",
    },
    {
      name: "Jessica Lee",
      role: "Presentation Designer (PPT)",
      bio: "Crafts compelling and visually stunning presentations, translating complex ideas into clear and impactful visuals.",
    },
    {
      name: "Chris Evans",
      role: "Analyst & Strategist",
      bio: "Focuses on data analysis and strategic planning to ensure the project meets its goals effectively and achives goals.",
    },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-20">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mb-20 max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12 px-2">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet Our Team
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Passionate individuals working together to create a cleaner, greener
            future
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -10 }}
              className="h-full"
            >
              <Card className="text-center h-full shadow-card hover:shadow-green border border-white/20 transition-all duration-300 rounded-2xl">
                <CardHeader className="pb-4">
                  <Avatar className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 shadow-soft">
                    <AvatarFallback className="text-lg font-semibold bg-gradient-primary text-primary-foreground">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg sm:text-xl">
                    {member.name}
                  </CardTitle>
                  <CardDescription className="text-primary font-medium text-sm sm:text-base">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
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
