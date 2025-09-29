import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, MapPin, Trash2, User, Mail, Phone, FileText, Upload, X, CheckCircle, Eye } from 'lucide-react';
import ReportPopUp from './SubmitReportPop';
import ErrorPopup from './ErrorPopup';
import { NavLink } from 'react-router-dom';



const ReportWaste = () => {
  // Form fields managed individually for clarity
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [wasteType, setWasteType] = useState('');
  const [description, setDescription] = useState('');
  //error state popup
  const [showError, setShowError] = useState(false);
  const [errorList, setErrorList] = useState<string[]>([]);
  //report state model pop
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPreview, setShowPreview] = useState(true);
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    email: string;
    phone?: string;
    location: string;
    wasteType: string;
    description?: string;
    photo?: string;
  } | null>(null);

  const [user] = useState({
    name: "Luffy",
    email: "Monkey.D@me.com",
    avatar: "",
    phone: "+91 9876543210",
    address: "East Blue, Goa Kingdom, Windmill Village",
    points: 1200,
    level: 3,
    rewards: [
      { id: 1, title: "Welcome Bonus", status: "Claimed" },
      { id: 2, title: "Weekly Login", status: "Available" },
      { id: 3, title: "Referral Reward", status: "Locked" },
    ],
    reports: {
      lastLogin: "2025-09-20 10:45 AM",
      totalLogins: 54,
      activeDays: 32,
      streak: 5,
      tasksCompleted: 18,
    },
    reportsHistory: [
      { id: 1, title: "Glass Waste Report #101", date: "2025-09-15", status: "Reviewed", reward: "+10 pts" },
      { id: 2, title: "Plastic Waste Report #102", date: "2025-09-17", status: "Approved", reward: "+20 pts" },
      { id: 3, title: "Organic Waste Report #103", date: "2025-09-18", status: "Rejected", reward: "0 pts" },
      { id: 4, title: "E-waste Report #104", date: "2025-09-21", status: "Pending", reward: "..." },
    ],
  });
  // New: Track if device is mobile
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount and on resize
  useEffect(() => {
    const checkMobile = () => {
      // Tailwind's lg is 1024px, so < 1024 is mobile/tablet
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // New: Only auto-show preview on mobile when on last step
  useEffect(() => {
    if (isMobile && currentStep === totalSteps) {
      setShowPreview(true);
    } else if (isMobile && currentStep !== totalSteps) {
      setShowPreview(false);
    }
    // On desktop, always show preview panel (handled in render)
  }, [isMobile, currentStep]);

  const totalSteps = 4;

  const steps = [
    { number: 1, title: 'Personal Info', icon: User, description: 'Your contact details' },
    { number: 2, title: 'Location', icon: MapPin, description: 'Where is the waste?' },
    { number: 3, title: 'Waste Details', icon: Trash2, description: 'Type and description' },
    { number: 4, title: 'Photo & Submit', icon: Camera, description: 'Add photo and review' }
  ];

  // Validate current step fields
  const validateStep = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (currentStep === 1) {
      if (!name) newErrors.name = 'Name is required';
      if (!email) newErrors.email = 'Email is required';
      if (email && !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format';
    }

    if (currentStep === 2 && !location) {
      newErrors.location = 'Location is required';
    }

    if (currentStep === 3 && !wasteType) {
      newErrors.wasteType = 'Waste type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Move to next step
  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  // Move to previous step
  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // Handle file selection
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhotoFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove photo
  const removePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    const fileInput = document.getElementById('photo') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  // Submit final form data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('location', location);
    formData.append('wasteType', wasteType);
    formData.append('description', description);
    if (photoFile) formData.append('photo', photoFile);

    try {
      const response = await fetch('/api/waste', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        // Prepare data for the popup
        const dataForPopup = {
          name,
          email,
          phone,
          location,
          wasteType,
          description,
          photo: photoPreview
        };

        setSubmittedData(dataForPopup);
        setShowSuccessModal(true);
        // console.log(result);

        // Reset form after successful submit
        setName('');
        setEmail('');
        setPhone('');
        setLocation('');
        setWasteType('');
        setDescription('');
        setPhotoFile(null);
        setPhotoPreview(null);
        setCurrentStep(1);
        setErrors({});
        setShowPreview(false);
      } else {
        setErrorList([result.error || 'An error occurred while submitting the report.']);
        setShowError(true);
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      setErrorList(['Failed to submit report. Please check your connection and try again.']);
      setShowError(true);
    }
  };

  const togglePreview = () => {
    setShowPreview((prev) => !prev);
  };

  return (
    <div className="min-h-screen  py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mb-4">
            <Trash2 className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Report Waste</h1>
        <p className="text-base text-muted-foreground max-w-xl mx-auto mb-4">
          Report waste in your area to help keep our community clean. Your quick action makes a difference!
        </p>
        </div>

        {/* Step Indicator */}
     

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3  gap-8 w-full">
          {/* Form Section */}
          <div className="lg:col-span-2  ">
            <div className="bg-zinc-900 border-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-10">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Info */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 dark:bg-green-900 rounded-full mb-4">
                        <User className="w-9 h-9 text-white dark:text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1 dark:text-white">Personal Information</h3>
                      <p className="text-zinc-900 dark:text-white">We need your contact details to follow up on the report</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-base font-medium">Full Name *</Label>
                        <div className="relative mt-2">
                          <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your full name"
                            className="pl-12 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-white/40 rounded-xl transition-all duration-200"
                          />
                          <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        </div>
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-base font-medium">Email Address *</Label>
                        <div className="relative mt-2">
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="pl-12 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-white/40 rounded-xl transition-all duration-200"
                          />
                          <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        </div>
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-base font-medium">Phone Number (Optional)</Label>
                      <div className="relative mt-2">
                        <Input
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Enter your phone number"
                          className="pl-12 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-white/40 rounded-xl transition-all duration-200"
                        />
                        <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Location Info */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-4">
                        <MapPin className="w-6 h-6 text-red-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">Location Details</h3>
                      <p className="text-gray-600">Tell us exactly where you found the waste</p>
                    </div>

                    <div>
                      <Label htmlFor="location" className="text-base font-medium">Location *</Label>
                      <div className="relative mt-2">
                        <Input
                          id="location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="e.g., Main Street near Central Park, Building address, etc."
                          className="pl-12 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-white/40 rounded-xl transition-all duration-200"
                        />
                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      </div>
                      {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                    </div>
                  </div>
                )}

                {/* Step 3: Waste Type & Description */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
                        <FileText className="w-6 h-6 text-orange-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">Waste Details</h3>
                      <p className="text-gray-600">Describe the type and condition of waste you found</p>
                    </div>

                    <div>
                      <Label htmlFor="wasteType" className="text-base font-medium">Waste Type *</Label>
                      <Select onValueChange={(value) => setWasteType(value)}>
                        <SelectTrigger className="mt-2 py-3 text-base">
                          <SelectValue placeholder="Select the type of waste" />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            'Plastic Bottles',
                            'Paper & Cardboard',
                            'Glass',
                            'Electronic Waste',
                            'Organic Waste',
                            'Metal Cans',
                            'Hazardous Materials',
                            'Mixed Waste',
                            'Other',
                          ].map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.wasteType && <p className="text-red-500 text-sm mt-1">{errors.wasteType}</p>}
                    </div>

                    <div>
                      <Label htmlFor="description" className="text-base font-medium">Description (Optional)</Label>
                      <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Provide additional details about the waste situation, quantity, condition, etc."
                        className="pl-12 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-white/40 rounded-xl transition-all duration-200 mt-2 min-h-[120px]"
                        style={{ minHeight: '120px' }}
                      />
                    </div>
                  </div>
                )}

                {/* Step 4: Upload Photo */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                        <Camera className="w-6 h-6 text-purple-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">Photo & Review</h3>
                      <p className="text-gray-600">Add a photo to help us better understand the situation</p>
                    </div>

                    <div>
                      <Label htmlFor="photo" className="text-base font-medium">Upload Photo (Optional)</Label>
                      <div className="mt-2">
                        {!photoPreview ? (
                          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-gray-400 transition-colors">
                            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                            <p className="text-sm text-gray-400">PNG, JPG up to 10MB</p>
                            <Input
                              type="file"
                              id="photo"
                              accept="image/*"
                              onChange={handlePhotoChange}
                              className="pl-12 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-white/40 rounded-xl transition-all duration-200 mt-4"
                            />
                          </div>
                        ) : (
                          <div className="relative">
                            <img
                              src={photoPreview}
                              alt="Waste photo preview"
                              className="w-full h-64 object-cover rounded-xl border border-gray-200"
                            />
                            <button
                              type="button"
                              onClick={removePhoto}
                              className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                            <div className="mt-3 p-3  rounded-lg border-2 border-white/30 flex items-center justify-between">
                              <div className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                                <span className="text-sm text-white">{photoFile?.name}</span>
                              </div>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={removePhoto}
                                className="text-red-600 hover:text-red-700"
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mt-7 pt-4 border-t border-gray-100 gap-2 sm:gap-0">
                  {currentStep > 1 ? (
                    <Button
                      type="button"
                      onClick={prevStep}
                      variant="outline"
                      className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
                    >
                      Previous
                    </Button>
                  ) : (
                    <div className="hidden sm:block"></div>
                  )}

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:space-x-4 w-full sm:w-auto">
                    {currentStep === totalSteps && (
                      <Button
                        type="button"
                        onClick={togglePreview}
                        variant="outline"
                        className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base mb-2 sm:mb-0"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        {showPreview ? 'Hide Preview' : 'Preview Report'}
                      </Button>
                    )}

                    {currentStep < totalSteps && (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-green-600 hover:bg-green-700"
                      >
                        Next
                      </Button>
                    )}

                    {currentStep === totalSteps && (
                      <Button
                        type="submit"
                        className="w-full sm:w-auto px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-base bg-green-600 hover:bg-green-700"
                      >
                        Submit Report
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Preview Panel */}
          {/* Desktop (lg and up): Always show preview panel */}
          {!isMobile && showPreview && (
            <div className="hidden lg:block lg:col-span-1 h-full">
              <div
                className={`flex flex-col h-full bg-white/5 border-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-6 transition-all duration-300 ${
                  showPreview || currentStep === totalSteps ? 'opacity-100' : 'opacity-50'
                }`}
                style={{ minHeight: '100%', height: '100%' }}
              >
                <div className="text-center mb-3">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">Report Preview</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">How your report will look</p>
                </div>
                <div className="flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Reporter Info */}
                    <div className="p-4 bg-gray-100 dark:bg-gray-600 rounded-lg mb-4">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Reporter</h5>
                      <p className="text-sm text-gray-800 dark:text-gray-100">{name || 'Name not provided'}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-200">{email || 'Email not provided'}</p>
                      {phone && <p className="text-sm text-gray-700 dark:text-gray-200">{phone}</p>}
                    </div>
                    {/* Location */}
                    <div className="p-4 bg-blue-100 dark:bg-blue-800/50 rounded-lg mb-4">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-blue-700 dark:text-blue-300" />
                        Location
                      </h5>
                      <p className="text-sm text-gray-800 dark:text-gray-100">{location || 'Location not specified'}</p>
                    </div>
                    {/* Waste Type */}
                    <div className="p-4 bg-orange-100 dark:bg-orange-800/50 rounded-lg mb-4">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                        <Trash2 className="w-4 h-4 mr-2 text-orange-700 dark:text-orange-300" />
                        Waste Type
                      </h5>
                      <p className="text-sm text-gray-800 dark:text-gray-100">{wasteType || 'Type not selected'}</p>
                    </div>
                    {/* Description */}
                    {description && (
                      <div className="p-4 bg-green-100 dark:bg-green-800/50 rounded-lg mb-4">
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Description</h5>
                        <p className="text-sm text-gray-800 dark:text-gray-100">{description}</p>
                      </div>
                    )}
                    {/* Photo */}
                    {photoPreview && (
                      <div className="p-4 bg-purple-100 dark:bg-purple-800/50 rounded-lg mb-4">
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Photo</h5>
                        <img
                          src={photoPreview}
                          alt="Waste preview"
                          className="w-full h-32 object-cover rounded-md"
                        />
                      </div>
                    )}
                  </div>
                  {/* Status */}
                  <div className="p-4 bg-yellow-100 dark:bg-yellow-800/50 rounded-lg mt-4">
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Status</h5>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-200 dark:bg-yellow-700/70 text-yellow-900 dark:text-yellow-100">
                      Draft
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mobile (below lg): Show preview as overlay only when showPreview is true */}
          {isMobile && showPreview && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 lg:hidden">
              <div className="relative w-full max-w-md mx-auto bg-white/5 border-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-6">
                <button
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  onClick={() => setShowPreview(false)}
                  aria-label="Close Preview"
                  type="button"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="text-center mb-6">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">Report Preview</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">How your report will look</p>
                </div>
                <div className="space-y-4">
                  {/* Reporter Info */}
                  <div className="p-4 bg-gray-100 dark:bg-gray-600 rounded-lg">
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Reporter</h5>
                    <p className="text-sm text-gray-800 dark:text-gray-100">{name || 'Name not provided'}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-200">{email || 'Email not provided'}</p>
                    {phone && <p className="text-sm text-gray-700 dark:text-gray-200">{phone}</p>}
                  </div>
                  {/* Location */}
                  <div className="p-4 bg-blue-100 dark:bg-blue-800/50 rounded-lg">
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-blue-700 dark:text-blue-300" />
                      Location
                    </h5>
                    <p className="text-sm text-gray-800 dark:text-gray-100">{location || 'Location not specified'}</p>
                  </div>
                  {/* Waste Type */}
                  <div className="p-4 bg-orange-100 dark:bg-orange-800/50 rounded-lg">
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                      <Trash2 className="w-4 h-4 mr-2 text-orange-700 dark:text-orange-300" />
                      Waste Type
                    </h5>
                    <p className="text-sm text-gray-800 dark:text-gray-100">{wasteType || 'Type not selected'}</p>
                  </div>
                  {/* Description */}
                  {description && (
                    <div className="p-4 bg-green-100 dark:bg-green-800/50 rounded-lg">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Description</h5>
                      <p className="text-sm text-gray-800 dark:text-gray-100">{description}</p>
                    </div>
                  )}
                  {/* Photo */}
                  {photoPreview && (
                    <div className="p-4 bg-purple-100 dark:bg-purple-800/50 rounded-lg">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Photo</h5>
                      <img
                        src={photoPreview}
                        alt="Waste preview"
                        className="w-full h-32 object-cover rounded-md"
                      />
                    </div>
                  )}
                  {/* Status */}
                  <div className="p-4 bg-yellow-100 dark:bg-yellow-800/50 rounded-lg">
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Status</h5>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-200 dark:bg-yellow-700/70 text-yellow-900 dark:text-yellow-100">
                      Draft
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

{/* component of profile page */}
      <div className="w-full flex flex-col items-center justify-center mt-6">
        <Card className="bg-white/5 w-full max-w-6xl border-white/20 backdrop-blur-lg rounded-2xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Your Recent Reports</CardTitle>
          </CardHeader>

          {/* //here i have to use components */}
          <CardContent className="space-y-4 text-sm">
            {user.reportsHistory.length === 0 ? (
              <div className="text-white/70 text-center py-6">No reports yet. Start reporting to see your history here!</div>
            ) : (
              user.reportsHistory.slice(0, 3).map((report) => (
                <div
                  key={report.id}
                  className="flex items-center cursor-pointer justify-between p-3 rounded-xl bg-white/10 border border-white/20 transition-all duration-200 hover:bg-white/20 hover:scale-[1.02]"
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-white flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-400" /> {report.title}
                    </span>
                    <span className="text-white/50 text-xs">{report.date}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span
                      className={`text-xs px-3 py-1 rounded-full mb-1 ${
                        report.status === "Approved"
                          ? "bg-green-500/20 text-green-400 border border-green-500/40"
                          : report.status === "Reviewed"
                          ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/40"
                          : report.status === "Pending"
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/40"
                          : "bg-red-500/20 text-red-400 border border-red-500/40"
                      }`}
                    >
                      {report.status}
                    </span>
                    <span className="text-xs text-white/70">{report.reward}</span>
                  </div>
                </div>
              ))
            )}
            <div className="flex justify-center mt-4">
              <NavLink
                to="/profile"
                className="inline-block w-full sm:w-auto px-8 py-3 text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow transition-all duration-200 text-base"
                style={{ maxWidth: 320 }}
              >
                View All Reports &rarr;
              </NavLink>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Success Modal */}
      <ReportPopUp
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        submittedData={submittedData}
      />
      <ErrorPopup
        open={showError}
        onClose={() => setShowError(false)}
        errors={errorList}
      />

    </div>
  );
};

export default ReportWaste;