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
    title: 'Composting Kitchen Scraps',
    description: 'Turn vegetable peels, coffee grounds, and eggshells into nutrient-rich soil for your garden.',
    fullDescription: 'Composting is a fantastic way to divert organic waste from landfills, where it would otherwise produce methane, a potent greenhouse gas. By creating a compost pile, you can convert food scraps and yard trimmings into valuable fertilizer for your garden. This process improves soil health and reduces your carbon footprint.',
    category: 'organic',
    difficulty: 'Medium',
    impact: 'High',
    time: '5 min',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=200&fit=crop'
  },
  {
    id: 3,
    title: 'Switch to Energy-Efficient Bulbs',
    description: 'Replace incandescent bulbs with LED or CFL bulbs to significantly reduce electricity consumption.',
    fullDescription: 'Energy-efficient bulbs like LEDs use up to 80% less energy and last much longer than traditional incandescent bulbs. This reduces your carbon footprint and lowers your electricity bill over time. While the initial cost may be higher, the long-term savings and environmental benefits are substantial.',
    category: 'energy',
    difficulty: 'Easy',
    impact: 'High',
    time: '10 min',
    image: 'https://images.unsplash.com/photo-1549419163-4914c68832c3?w=400&h=200&fit=crop'
  },
  {
    id: 4,
    title: 'Rainwater Harvesting',
    description: 'Install a barrel to collect rainwater for your garden, saving water and reducing storm runoff.',
    fullDescription: 'Rainwater harvesting is an effective way to conserve water. By collecting rainwater from your roof, you can use it to water plants, wash your car, or flush toilets, reducing your reliance on treated tap water. This method eases the strain on municipal water systems and can lower your water bills.',
    category: 'water',
    difficulty: 'Hard',
    impact: 'Very High',
    time: '1 hr',
    image: 'https://images.unsplash.com/photo-1531631558913-68d80f08a478?w=400&h=200&fit=crop'
  },
  {
    id: 5,
    title: 'Eco-friendly Electronics Disposal',
    description: 'Find certified e-waste recycling centers to safely dispose of old phones, batteries, and laptops.',
    fullDescription: 'Electronic waste (e-waste) contains toxic materials like lead, mercury, and cadmium. Proper disposal through certified recycling programs ensures these materials are handled safely and don’t pollute the environment. Many manufacturers also have take-back programs for their old products.',
    category: 'electronic',
    difficulty: 'Medium',
    impact: 'High',
    time: '30 min',
    image: 'https://images.unsplash.com/photo-1621213303681-37d456721017?w=400&h=200&fit=crop'
  },

  // New Tips Added
  {
    id: 6,
    title: 'Use Reusable Shopping Bags',
    description: 'Carry cloth or reusable bags instead of single-use plastic bags when shopping.',
    fullDescription: 'Single-use plastic bags create massive pollution and take hundreds of years to decompose. Switching to reusable bags significantly reduces plastic waste and encourages sustainable consumer habits. Keep a few bags in your car or backpack to always have them handy.',
    category: 'plastic',
    difficulty: 'Easy',
    impact: 'High',
    time: 'Instant',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e1b9?w=400&h=200&fit=crop'
  },
  {
    id: 7,
    title: 'DIY Natural Cleaning Products',
    description: 'Use vinegar, baking soda, and lemon to make eco-friendly cleaning solutions.',
    fullDescription: 'Many commercial cleaning products contain harsh chemicals that are harmful to humans and the environment. DIY natural cleaners are safe, cost-effective, and reduce chemical runoff into water systems. They also reduce plastic bottle waste from store-bought cleaners.',
    category: 'organic',
    difficulty: 'Medium',
    impact: 'Medium',
    time: '15 min',
    image: 'https://images.unsplash.com/photo-1560185127-6c6b81a15d64?w=400&h=200&fit=crop'
  },
  {
    id: 8,
    title: 'Install Low-Flow Fixtures',
    description: 'Replace old faucets and showerheads with water-saving low-flow versions.',
    fullDescription: 'Low-flow faucets and showerheads can reduce water usage by up to 30%, saving money and conserving a vital resource. Installing these fixtures is relatively simple and reduces household water consumption without affecting performance.',
    category: 'water',
    difficulty: 'Medium',
    impact: 'High',
    time: '20 min',
    image: 'https://images.unsplash.com/photo-1581579183301-0cfa91f7b4f6?w=400&h=200&fit=crop'
  },
  {
    id: 9,
    title: 'Unplug Idle Electronics',
    description: 'Disconnect chargers and devices not in use to prevent phantom energy consumption.',
    fullDescription: 'Even when devices are turned off, many still consume electricity if plugged in. Unplugging idle electronics reduces energy waste, lowers electricity bills, and reduces greenhouse gas emissions from power generation.',
    category: 'energy',
    difficulty: 'Easy',
    impact: 'Medium',
    time: '5 min',
    image: 'https://images.unsplash.com/photo-1602524814250-cf0f4e1c0f54?w=400&h=200&fit=crop'
  },
  {
    id: 10,
    title: 'Proper Paper Recycling',
    description: 'Recycle newspapers, cardboard, and office paper to reduce deforestation and landfill waste.',
    fullDescription: 'Paper recycling reduces the need to cut down trees, saves water, and reduces landfill space. Separate paper from other waste and ensure it is clean and dry for optimal recycling results.',
    category: 'plastic',
    difficulty: 'Easy',
    impact: 'Medium',
    time: '2 min',
    image: 'https://images.unsplash.com/photo-1565372914902-9c6e0f8e1a4b?w=400&h=200&fit=crop'
  },
  {
    id: 11,
    title: 'Reduce Food Waste',
    description: 'Plan meals, store leftovers properly, and compost scraps to minimize food waste.',
    fullDescription: 'Food waste contributes to methane emissions in landfills. Proper planning and storage reduce waste, save money, and feeding compost heaps helps enrich the soil naturally.',
    category: 'organic',
    difficulty: 'Medium',
    impact: 'High',
    time: '15 min',
    image: 'https://images.unsplash.com/photo-1605470048170-089d7b82c7f0?w=400&h=200&fit=crop'
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

  const handleOpenModal = (tip: any) => {
    setSelectedTip(tip);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTip(null);
  };

  return (
    <div className="min-h-screen  bg-gradient-subtle py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Recycling & Environmental Tips
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover practical ways to reduce waste, recycle effectively, and live more sustainably
          </p>

          {/* Hero Image */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative max-w-4xl mx-auto mb-12 rounded-2xl overflow-hidden shadow-card"
          >
            <img
              src={recyclingImage}
              alt="Recycling and waste sorting"
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
              <div className="p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Start Your Green Journey Today</h3>
                <p className="text-lg opacity-90">Every small action counts towards a cleaner planet</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 space-y-4"
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
                className={`transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-primary text-primary-foreground shadow-green'
                    : 'hover:bg-accent'
                }`}
              >
                <category.icon className="h-4 w-4 mr-2" />
                {category.name}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={tip.image}
                    alt={tip.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className={getImpactColor(tip.impact)}>
                      {tip.impact} Impact
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-lg leading-snug">
                    {tip.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <CardDescription className="text-base leading-relaxed">
                    {tip.description}
                  </CardDescription>

                  <div className="flex items-center justify-between text-sm">
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
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                    onClick={() => handleOpenModal(tip)}
                  >
                    <Lightbulb className="h-4 w-4 mr-2" />
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
            className="text-center py-12"
          >
            <Lightbulb className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No tips found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or category filter
            </p>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Card className="bg-gradient-primary text-primary-foreground border-0 shadow-green">
            <CardHeader>
              <CardTitle className="text-2xl">Have a Green Tip to Share?</CardTitle>
              <CardDescription className="text-primary-foreground/90">
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
            className="fixed inset-0 z-50  bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={handleCloseModal}
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
                onClick={handleCloseModal}
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
                <img
                  src={selectedTip.image}
                  alt={selectedTip.title}
                  className="w-full md:w-1/3 h-auto md:h-48 object-cover rounded-lg shadow-md"
                />
                <div className="flex-1">
                  <CardTitle className="text-2xl md:text-3xl font-bold mb-2 text-primary-gradient-foreground">
                    {selectedTip.title}
                  </CardTitle>
                  <CardDescription className="text-base text-muted-foreground">
                    {selectedTip.description}
                  </CardDescription>
                </div>
              </div>

              <CardContent className="p-0">
                <p className="text-lg text-foreground leading-relaxed">
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
