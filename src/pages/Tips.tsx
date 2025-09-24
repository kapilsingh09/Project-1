import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Recycle, Lightbulb, Search, Leaf, Zap, Droplets, Wind, Clock, X 
} from 'lucide-react';
import recyclingImage from '@/assets/recycling-tips.jpg';
import TipModal from '@/components/TipsModel';

const Tips = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTip, setSelectedTip] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    { id: 'all', name: 'All Tips', icon: Lightbulb, color: 'default' },
    { id: 'plastic', name: 'Plastic', icon: Recycle, color: 'default' },
    { id: 'organic', name: 'Organic', icon: Leaf, color: 'secondary' },
    { id: 'electronic', name: 'Electronic', icon: Zap, color: 'outline' },
    { id: 'water', name: 'Water', icon: Droplets, color: 'secondary' },
    { id: 'energy', name: 'Energy', icon: Wind, color: 'outline' },
  ];

  const tips = [
    {
      id: 1,
      title: 'Proper Plastic Bottle Recycling',
      description: 'Remove caps and labels, rinse thoroughly, and crush to save space. Check local recycling codes.',
      fullDescription: 'Properly recycling plastic bottles is a simple yet high-impact action. The process ensures that plastics can be reused, reducing the need for new material production. Always check the number on the bottle (1-7) to confirm it is recyclable in your area. Removing caps and labels prevents contamination and makes sorting easier for recycling facilities.',
      category: 'plastic',
      difficulty: 'Easy',
      impact: 'High',
      time: '2 min',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'Compost Your Food Scraps',
      description: 'Turn kitchen waste into nutrient-rich compost for your garden.',
      fullDescription: 'Instead of sending food scraps to the landfill, compost them at home. Composting reduces methane emissions and creates a valuable soil amendment for your plants. Start with fruit and vegetable peels, coffee grounds, and eggshells.',
      category: 'organic',
      difficulty: 'Medium',
      impact: 'High',
      time: '10 min',
      image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=400&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'Recycle Old Electronics Responsibly',
      description: 'Take e-waste to certified recycling centers to prevent pollution.',
      fullDescription: 'Electronics contain hazardous materials that can harm the environment if not disposed of properly. Find a local e-waste recycling center and drop off old phones, laptops, and batteries to ensure safe processing.',
      category: 'electronic',
      difficulty: 'Medium',
      impact: 'Very High',
      time: '20 min',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=200&fit=crop'
    },
    {
      id: 4,
      title: 'Fix Leaky Faucets',
      description: 'Repair leaks to save water and reduce your utility bill.',
      fullDescription: 'A single dripping faucet can waste hundreds of gallons of water per year. Check your home for leaks and fix them promptly to conserve water and lower your bills.',
      category: 'water',
      difficulty: 'Easy',
      impact: 'Medium',
      time: '15 min',
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400&h=200&fit=crop'
    },
    {
      id: 5,
      title: 'Switch to LED Bulbs',
      description: 'Replace old bulbs with energy-efficient LEDs to save energy.',
      fullDescription: 'LED bulbs use up to 80% less energy than traditional incandescent bulbs and last much longer. Switching to LEDs reduces your carbon footprint and saves money over time.',
      category: 'energy',
      difficulty: 'Easy',
      impact: 'High',
      time: '5 min',
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=200&fit=crop'
    },
    {
      id: 6,
      title: 'Bring Your Own Shopping Bag',
      description: 'Use reusable bags to cut down on single-use plastic waste.',
      fullDescription: 'Carrying a reusable shopping bag helps reduce the demand for single-use plastic bags, which often end up polluting waterways and harming wildlife.',
      category: 'plastic',
      difficulty: 'Easy',
      impact: 'Medium',
      time: '1 min',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=200&fit=crop'
    },
    {
      id: 7,
      title: 'Unplug Devices When Not in Use',
      description: 'Prevent “phantom” energy loss by unplugging electronics.',
      fullDescription: 'Many devices draw power even when turned off. Unplug chargers, TVs, and computers when not in use to save energy and reduce your electricity bill.',
      category: 'energy',
      difficulty: 'Easy',
      impact: 'Medium',
      time: '2 min',
      image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&h=200&fit=crop'
    },
    {
      id: 8,
      title: 'Collect Rainwater for Gardening',
      description: 'Use rain barrels to water your plants and save tap water.',
      fullDescription: 'Setting up a rain barrel allows you to collect and store rainwater for use in your garden, reducing your reliance on treated tap water and lowering your water bill.',
      category: 'water',
      difficulty: 'Medium',
      impact: 'High',
      time: '30 min',
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400&h=200&fit=crop'
    },
    {
      id: 9,
      title: 'Use Public Transport or Bike',
      description: 'Reduce your carbon footprint by choosing greener transportation.',
      fullDescription: 'Opting for public transport, biking, or walking instead of driving alone helps reduce air pollution and greenhouse gas emissions. It’s also a great way to stay active.',
      category: 'energy',
      difficulty: 'Medium',
      impact: 'Very High',
      time: 'Varies',
      image: 'https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?w=400&h=200&fit=crop'
    },
    {
      id: 10,
      title: 'Start a Community Clean-Up',
      description: 'Organize or join local efforts to clean parks and streets.',
      fullDescription: 'Community clean-ups help remove litter from public spaces, raise awareness, and foster a sense of responsibility. Gather friends or neighbors and make a positive impact together.',
      category: 'organic',
      difficulty: 'Medium',
      impact: 'High',
      time: '2 hr',
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400&h=200&fit=crop'
    },
    {
      id: 11,
      title: 'Donate or Repurpose Old Clothes',
      description: 'Give your clothes a second life by donating or upcycling.',
      fullDescription: 'Instead of throwing away old clothes, donate them to charity or repurpose them into cleaning rags, bags, or crafts. This reduces textile waste and helps others.',
      category: 'organic',
      difficulty: 'Easy',
      impact: 'Medium',
      time: '20 min',
      image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=200&fit=crop'
    },
    {
      id: 12,
      title: 'Buy in Bulk',
      description: 'Purchase items in bulk to reduce packaging waste and overall consumption.',
      fullDescription: 'Buying in bulk reduces the amount of packaging materials, which often end up in landfills or as litter. This also encourages mindful consumption and reduces trips to the store, saving fuel and time.',
      category: 'plastic',
      difficulty: 'Easy',
      impact: 'Medium',
      time: '10 min',
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=200&fit=crop'
    },
    {
      id: 13,
      title: 'Use a Refillable Water Bottle',
      description: 'Ditch single-use bottles for a reusable one.',
      fullDescription: 'Switching to a refillable water bottle helps cut down on plastic waste and saves money. Many public places now offer water refill stations for convenience.',
      category: 'plastic',
      difficulty: 'Easy',
      impact: 'High',
      time: '1 min',
      image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=200&fit=crop'
    },
    {
      id: 14,
      title: 'Plant a Tree',
      description: 'Trees absorb CO2 and provide shade and habitat.',
      fullDescription: 'Planting trees in your yard or community helps combat climate change, improves air quality, and provides homes for wildlife. Choose native species for best results.',
      category: 'organic',
      difficulty: 'Medium',
      impact: 'Very High',
      time: '1 hr',
      image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?w=400&h=200&fit=crop'
    },
    {
      id: 15,
      title: 'Use Natural Cleaning Products',
      description: 'Switch to eco-friendly cleaners to reduce chemical pollution.',
      fullDescription: 'Many household cleaners contain harsh chemicals that can harm the environment. Use natural alternatives like vinegar, baking soda, and lemon for most cleaning tasks.',
      category: 'organic',
      difficulty: 'Easy',
      impact: 'Medium',
      time: '10 min',
      image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=400&h=200&fit=crop'
    },
    {
      id: 16,
      title: 'Set Your Thermostat Wisely',
      description: 'Adjust your thermostat to save energy and money.',
      fullDescription: 'Lowering your thermostat in winter and raising it in summer can significantly reduce your energy use. Even a 1°C change can make a big difference over time.',
      category: 'energy',
      difficulty: 'Easy',
      impact: 'High',
      time: '2 min',
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=200&fit=crop'
    },
    {
      id: 17,
      title: 'Take Shorter Showers',
      description: 'Save water and energy by reducing shower time.',
      fullDescription: 'Cutting your shower by just a few minutes can save gallons of water and reduce the energy needed to heat it. Try using a timer or listening to a short song.',
      category: 'water',
      difficulty: 'Easy',
      impact: 'Medium',
      time: '5 min',
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400&h=200&fit=crop'
    },
    {
      id: 18,
      title: 'Use a Clothesline Instead of a Dryer',
      description: 'Air-dry your clothes to save energy.',
      fullDescription: 'Using a clothesline or drying rack instead of a tumble dryer reduces electricity use and extends the life of your clothes.',
      category: 'energy',
      difficulty: 'Medium',
      impact: 'High',
      time: 'Varies',
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400&h=200&fit=crop'
    },
    {
      id: 19,
      title: 'Opt for Paperless Billing',
      description: 'Reduce paper waste by switching to digital statements.',
      fullDescription: 'Most banks and utilities offer paperless billing options. Going digital saves trees and reduces clutter in your home.',
      category: 'energy',
      difficulty: 'Easy',
      impact: 'Medium',
      time: '5 min',
      image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&h=200&fit=crop'
    },
    {
      id: 20,
      title: 'Participate in Local Recycling Programs',
      description: 'Learn about and use your city’s recycling services.',
      fullDescription: 'Check your local government’s website for recycling guidelines and collection schedules. Proper sorting ensures more materials are actually recycled.',
      category: 'plastic',
      difficulty: 'Easy',
      impact: 'High',
      time: '10 min',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=200&fit=crop'
    }
  ];

  const filteredTips = tips.filter(tip => {
    const matchesSearch = tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tip.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tip.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Very High': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300';
      case 'Medium': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Low': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const handleOpenModal = (tip) => {
    setSelectedTip(tip);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTip(null);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-8 md:py-12">
      <div className="container mx-auto px-2 sm:px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Recycling & Environmental Tips
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 md:mb-8">
            Discover practical ways to reduce waste, recycle effectively, and live more sustainably
          </p>

          {/* Hero Image */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-2xl md:max-w-4xl mx-auto mb-8 md:mb-12 rounded-xl md:rounded-2xl overflow-hidden shadow-card"
          >
            <img
              src={recyclingImage}
              alt="Recycling and waste sorting"
              className="w-full h-40 sm:h-56 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
              <div className="p-4 md:p-8 text-white">
                <h3 className="text-lg md:text-2xl font-bold mb-1 md:mb-2">Start Your Green Journey Today</h3>
                <p className="text-sm md:text-lg opacity-90">Every small action counts towards a cleaner planet</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6 md:mb-8 space-y-3 md:space-y-4"
        >
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search tips..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background border-border"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`transition-all duration-300 text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-primary text-primary-foreground shadow-green'
                    : 'hover:bg-accent'
                }`}
              >
                <category.icon className="h-4 w-4 mr-1 sm:mr-2" />
                {category.name}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredTips.map((tip, index) => (
            <motion.div
              key={tip.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full shadow-card border-0 overflow-hidden hover:shadow-green transition-all duration-300">
                <div className="relative h-36 sm:h-48 overflow-hidden">
                  <img
                    src={tip.image}
                    alt={tip.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
                    <Badge className={getImpactColor(tip.impact)}>
                      {tip.impact} Impact
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-base sm:text-lg leading-snug">
                    {tip.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-2 sm:space-y-4">
                  <CardDescription className="text-sm sm:text-base leading-relaxed">
                    {tip.description}
                  </CardDescription>

                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <div className="flex items-center text-white gap-2">
                      <Badge variant="outline" className={getDifficultyColor(tip.difficulty)}>
                        {tip.difficulty}
                      </Badge>
                      {/* <Clock className="h-4 w-4 text-muted-foreground" /> */}
                      {/* <span className="text-muted-foreground">{tip.time}</span> */}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 text-xs sm:text-sm"
                    onClick={() => handleOpenModal(tip)}
                  >
                    <Lightbulb className="h-4 w-4 mr-1 sm:mr-2" />
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredTips.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 md:py-12"
          >
            <Lightbulb className="h-12 w-12 md:h-16 md:w-16 text-muted-foreground mx-auto mb-3 md:mb-4" />
            <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">No tips found</h3>
            <p className="text-muted-foreground text-sm md:text-base">
              Try adjusting your search or category filter
            </p>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 md:mt-16 text-center"
        >
          <Card className="bg-gradient-primary text-primary-foreground border-0 shadow-green">
            <CardHeader>
              <CardTitle className="text-lg md:text-2xl">Have a Green Tip to Share?</CardTitle>
              <CardDescription className="text-primary-foreground/90 text-sm md:text-base">
                Help our community by contributing your eco-friendly knowledge
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="secondary"
                size="lg"
                className="hover:shadow-lg transition-all duration-300"
              >
                Submit Your Tip
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && selectedTip && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              // Responsive modal: full width on mobile, max-w-2xl on desktop, scrollable on mobile
              className="relative w-full max-w-xs sm:max-w-lg md:max-w-2xl bg-background rounded-lg md:rounded-xl shadow-lg p-3 sm:p-6 md:p-8 overflow-y-auto max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 sm:top-4 sm:right-4 h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={handleCloseModal}
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 mb-4 md:mb-6">
                <img
                  src={selectedTip.image}
                  alt={selectedTip.title}
                  className="w-full md:w-1/3 h-32 md:h-48 object-cover rounded-md md:rounded-lg shadow-md mb-2 md:mb-0"
                />
                <div className="flex-1">
                  <CardTitle className="text-lg md:text-3xl font-bold mb-1 md:mb-2 text-primary-gradient-foreground">
                    {selectedTip.title}
                  </CardTitle>
                  <CardDescription className="text-sm md:text-base text-muted-foreground">
                    {selectedTip.description}
                  </CardDescription>
                </div>
              </div>

              <CardContent className="p-0">
                <p className="text-base md:text-lg text-foreground leading-relaxed">
                  {selectedTip.fullDescription}
                </p>
              </CardContent>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tips;
