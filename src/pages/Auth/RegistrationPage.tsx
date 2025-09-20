import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Chrome, Eye, EyeOff, User, Phone } from "lucide-react";

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (!response.ok) {
      // Show backend validation errors
      alert(data.errors.join("\n"));
      return;
    }

    // Success
    alert(data.message);
    // Optionally, redirect to login page
    // router.push("/login");
  } catch (err) {
    console.error("Registration error:", err);
    alert("Something went wrong. Please try again.");
  }
};


  const handleGoogleSignup = () => {
    console.log("Continue with Google clicked");
    // TODO: Add Google OAuth logic here
  };

  return (
    <div className="min-h-screen flex flex-col mb-10 items-center justify-center bg-transparent ">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-32 h-32 border border-white/10 rounded-full"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 border border-white/10 rounded-full"></div>
        <div className="absolute top-1/3 right-20 w-16 h-16 border border-white/10 rounded-full"></div>
        <div className="absolute bottom-1/3 left-1/4 w-20 h-20 border border-white/10 rounded-full"></div>
      </div>

      {/*   container */}
      <div className="relative z-10 w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 border border-white/20 rounded-full mb-4 backdrop-blur-sm">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-white/70">Join us and get started today</p>
        </div>

        {/* Registration container */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
          <div className="space-y-5">
            {/* Name fields row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-white text-sm font-medium">
                  First Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    required
                    className="pl-10 h-11 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-white/40 rounded-xl transition-all duration-200 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-white text-sm font-medium">
                  Last Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    required
                    className="pl-10 h-11 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-white/40 rounded-xl transition-all duration-200 text-sm"
                  />
                </div>
              </div>
            </div>

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
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="pl-12 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-white/40 rounded-xl transition-all duration-200"
                />
              </div>
            </div>

            {/* Phone field */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white text-sm font-medium">
                Phone Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
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
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
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

            {/* Confirm Password field */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white text-sm font-medium">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  required
                  className="pl-12 pr-12 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-white/40 rounded-xl transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/70 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Terms and conditions */}
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 h-4 w-4 rounded border-white/20 bg-white/10 text-white focus:ring-white/50"
              />
              <label htmlFor="terms" className="text-sm text-white/70 leading-5">
                I agree to the{" "}
                <a href="#" className="text-white hover:text-white/80 font-medium transition-colors">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-white hover:text-white/80 font-medium transition-colors">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Create account button */}
            <Button 
              onClick={handleSubmit}
              className="w-full h-12 bg-white text-black hover:bg-white/90 font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02]"
            >
              Create Account
            </Button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-1 border-white/20" />
            <span className="mx-4 text-white/50 text-sm">or continue with</span>
            <hr className="flex-1 border-white/20" />
          </div>

          {/* Google signup button */}
          <Button
            variant="outline"
            className="w-full h-12 bg-white/10 border-white/20 text-white hover:bg-white/15 hover:border-white/30 font-medium rounded-xl transition-all duration-200 transform hover:scale-[1.02]"
            onClick={handleGoogleSignup}
          >
            <Chrome className="w-5 h-5 mr-2" />
            Continue with Google
          </Button>

          {/* Sign in link */}
          <div className="text-center mt-6">
            <p className="text-white/70 text-sm">
              Already have an account?{" "}
              <a href="#" className="text-white hover:text-white/80 font-medium transition-colors">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}