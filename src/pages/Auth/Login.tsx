import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NavLink } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Chrome, Eye, EyeOff, Divide,CirclePlus } from "lucide-react";
import { Close } from "@radix-ui/react-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error,setError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    // TODO: Add login logic here
  };

  const handleGoogleLogin = () => {
    console.log("Continue with Google clicked");
    // TODO: Add Google OAuth logic here
  };

  return (
    <div className="min-h-screen h-full mb-10 flex flex-col p-4 items-center bg-transparent ">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 border border-white/10 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-white/10 rounded-full"></div>
        <div className="absolute top-1/2 left-20 w-16 h-16 border border-white/10 rounded-full"></div>
      </div>

      {/* Main login container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-3 flex justify-between">
       
          <div className="text-left pl-1 ">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-white/70">Sign in to your account</p>
          </div>
   <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 border border-white/20 rounded-full mb-2 backdrop-blur-sm">
            <Lock className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Login form container */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white text-sm font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-12 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-white/40 rounded-xl transition-all duration-200"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-12 pr-12 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-white/40 rounded-xl transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/70 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div className="flex justify-end">
              <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                Forgot password?
              </a>
            </div>

            {error && (
  <div
    role="alert"
    className="relative flex items-center gap-3 w-full px-4 py-3 rounded-2xl bg-red-500/90 border border-red-400 shadow-lg mb-3 animate-fade-in"
  >
    <p className="text-white text-sm font-medium text-center ml-5 leading-relaxed w-full pr-8">{error}</p>
    <button
      type="button"
      onClick={() => setError(false)}
      className="absolute right-3 top-1/2 -translate-y-1/2 mt-0.5 p-1.5 rounded-full hover:bg-red-600/70 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-300"
      aria-label="Close error"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
)}


            {/* Sign in button */}
            <Button 
              type="submit" 
              className="w-full h-12 bg-white text-black hover:bg-white/90 font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02]"
            >
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-1 border-white/20" />
            <span className="mx-4 text-white/50 text-sm">or continue with</span>
            <hr className="flex-1 border-white/20" />
          </div>

          {/* Google login button */}
          <Button
            variant="outline"
            className="w-full h-12 bg-white/10 border-white/20 text-white hover:bg-white/15 hover:border-white/30 font-medium rounded-xl transition-all duration-200 transform hover:scale-[1.02]"
            onClick={handleGoogleLogin}
          >
            <Chrome className="w-5 h-5 mr-2" />
            Continue with Google
          </Button>

          {/* Sign up link */}
          <div className="text-center mt-6">
            <p className="text-white/70 text-sm">
              Don't have an account?{" "}
              <NavLink to="/register" className="text-white hover:underline hover:text-white/80 font-medium transition-colors">
                Sign up
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}