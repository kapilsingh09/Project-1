import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "../components/layout/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-subtle">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <p className="mb-6 text-muted-foreground">The page you're looking for doesn't exist.</p>
        <Link to="/">
          <button className="px-6 py-3 bg-gradient-primary text-primary-foreground rounded-lg hover:shadow-green transition-all duration-300">
            Return to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
