import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Leaf, Users, Target, Award, Heart, Globe, Recycle, Zap, TreePine, Lightbulb } from 'lucide-react';

const Timeline = () => {

    const milestones = [
        {
            year: '2025',
            title: 'Smart Waste Collection',
            description: 'Launching intelligent smart bins that optimize waste collection routes in real-time to reduce carbon emissions.',
            icon: <Recycle className="text-primary" size={24} />
        },
        {
            year: '2026',
            title: 'Plastic-to-Energy Plants',
            description: 'Building advanced recycling plants that convert non-recyclable plastic waste into clean energy, powering local communities.',
            icon: <Zap className="text-primary" size={24} />
        },
        {
            year: '2027',
            title: 'Global Reforestation Initiative',
            description: 'Partnering with environmental orgs to plant 10 million trees, restoring ecosystems and capturing CO₂ emissions.',
            icon: <TreePine className="text-primary" size={24} />
        },
        {
            year: '2028',
            title: 'Zero Waste Cities',
            description: 'Pilot program to turn selected cities into zero-waste zones through comprehensive recycling and composting infrastructure.',
            icon: <Globe className="text-primary" size={24} />
        },
        {
            year: '2029',
            title: 'Circular Economy Expansion',
            description: 'Developing circular business models that promote reuse, repair, and sharing, significantly reducing resource extraction.',
            icon: <Lightbulb className="text-primary" size={24} />
        }
    ];

    const cardVariants = {
        offscreen: {
            x: -100,
            opacity: 0,
            scale: 0.95,
        },
        onscreen: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring" as const,
                bounce: 0.4,
                duration: 0.8
            }
        }
    };

    return (
        <div className='overflow-hidden py-12'>
            <div className="text-center mb-16">
                <motion.h2
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"
                >
                    Our Journey to a Cleaner Planet
                </motion.h2>
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-xl text-muted-foreground max-w-4xl mx-auto"
                >
                    A look at our key milestones in our mission to create cleaner, more sustainable communities for everyone.
                </motion.p>
            </div>

            <div className="relative max-w-5xl mx-auto">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-2 h-full bg-gradient-to-b from-green-400 to-blue-500 opacity-30 rounded-full"></div>
                <div className="space-y-16">
                    {milestones.map((milestone, index) => (
                        <motion.div
                            key={index}
                            className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.5 }}
                            variants={cardVariants}
                        >
                            <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                                <Card className="border-2 border-primary/20 shadow-xl hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-500 hover:scale-[1.02]">
                                    <CardHeader>
                                        <CardTitle className={`text-2xl font-bold flex items-center gap-3 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                                            {index % 2 === 0 && milestone.icon}
                                            <span>{milestone.title}</span>
                                            {index % 2 !== 0 && milestone.icon}
                                        </CardTitle>
                                        <p className={`text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                                            {milestone.year}
                                        </p>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{milestone.description}</p>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-fuchsia-600 rounded-full border-4 border-background shadow-lg flex items-center justify-center z-10">
                                <div className="w-3 h-3 bg-white rounded-full"></div>
                            </div>
                            <div className="w-1/2"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Timeline;