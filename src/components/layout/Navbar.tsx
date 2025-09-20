import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Leaf, Recycle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate()
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 70) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Report Waste', path: '/report' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Tips', path: '/tips' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "sticky top-0 z-50 w-full  transition-all duration-300",
        scrolled
          ? "bg-white/70 border-b  dark:bg-background/50 backdrop-blur-md supports-[backdrop-filter]:bg-background/50"
          : "bg-transparent"
      )}
      style={{
        // fallback for bg blur if not supported
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-primary rounded-lg group-hover:shadow-green transition-all duration-300">
              <Recycle className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg bg-gradient-primary bg-clip-text text-transparent">
                Clean & Green
              </span>
              <span className="text-xs text-muted-foreground">Waste Management</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 drop-shadow-md ">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className={cn(
                    "relative overflow-hidden transition-all duration-300",
                    isActive(item.path)
                      ? "bg-gradient-primary  text-primary-foreground shadow-green"
                      : "hover:bg-accent"
                  )}
                >
                  {item.name}
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-primary rounded-md -z-10"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                </Button>
              </Link>
            ))}
          </div>

          {/* Mobile Menu / Actions */}
          <div className="flex items-center space-x-2">
            {/* Sign In */}
            <div className="flex justify-center items-center rounded-full">
              <button
                onClick={() => navigate('/login')}
                className={cn(
                  // Responsive height, padding, and text size
                  "border border-white/30 font-semibold rounded-full shadow transition hover:bg-green-700/40 hover:underline hover:decoration-1 hover:underline-offset-2",
                  "h-10 px-5 text-sm", // default (md and up)
                  "sm:h-10 sm:px-6 sm:text-base", // small screens (sm)
                  "xs:h-8 xs:px-4 xs:text-xs", // extra small screens (xs)
                  "md:h-10 md:px-6 md:text-base", // medium and up
                  "max-xs:h-8 max-xs:px-3 max-xs:text-xs" // fallback for very small screens
                )}
                style={{
                  minWidth: 0,
                  width: 'auto',
                }}
              >
                <span className="block md:text-base sm:text-sm xs:text-xs max-xs:text-xs">
                  <span className="hidden xs:inline sm:inline md:inline">Sign In</span>
                  <span className="inline xs:hidden sm:hidden md:hidden">Sign In</span>
                </span>
              </button>
            </div>
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-accent"
              onClick={() => setIsOpen(!isOpen)}
            >
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{
            height: isOpen ? 'auto' : 0,
            opacity: isOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start transition-all duration-300",
                    isActive(item.path)
                      ? "bg-gradient-primary text-primary-foreground shadow-green"
                      : "hover:bg-accent"
                  )}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;