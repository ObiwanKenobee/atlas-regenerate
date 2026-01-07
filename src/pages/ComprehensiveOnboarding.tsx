import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import UserFlowLayout from '@/components/UserFlowLayout';
import { 
  Users, TrendingUp, Building, GraduationCap, Sprout, 
  ArrowRight, CheckCircle, Target, DollarSign 
} from 'lucide-react';

const userTypes = [
  {
    id: 'practitioner',
    title: 'Regenerative Practitioner',
    description: 'Farmers, land stewards, and ecosystem restorers',
    icon: Sprout,
    color: 'from-green-500 to-emerald-600',
    features: ['Project registration', 'Impact tracking', 'Funding access', 'Knowledge sharing']
  },
  {
    id: 'investor',
    title: 'Impact Investor',
    description: 'Individuals and institutions investing in regenerative projects',
    icon: TrendingUp,
    color: 'from-blue-500 to-cyan-600',
    features: ['Verified opportunities', 'Impact metrics', 'Portfolio tracking', 'Due diligence']
  },
  {
    id: 'organization',
    title: 'Organization/NGO',
    description: 'Government agencies, NGOs, and institutional partners',
    icon: Building,
    color: 'from-purple-500 to-indigo-600',
    features: ['Program oversight', 'Policy insights', 'Grant management', 'Impact reporting']
  },
  {
    id: 'researcher',
    title: 'Researcher/Academic',
    description: 'Scientists, researchers, and academic institutions',
    icon: GraduationCap,
    color: 'from-orange-500 to-red-600',
    features: ['Data access', 'Research collaboration', 'Publication support', 'Methodology sharing']
  }
];

export default function ComprehensiveOnboarding() {
  const [step, setStep] = useState(1);
  const [selectedUserType, setSelectedUserType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    location: '',
    interests: [],
    experience: '',
    goals: ''
  });
  const navigate = useNavigate();

  const handleUserTypeSelect = (userType: string) => {
    setSelectedUserType(userType);
    setStep(2);
  };

  const handleFormSubmit = () => {
    // Simulate account creation
    setStep(3);
    setTimeout(() => {
      // Navigate to appropriate dashboard
      switch (selectedUserType) {
        case 'practitioner':
          navigate('/practitioner');
          break;
        case 'investor':
          navigate('/investor');
          break;
        case 'organization':
          navigate('/government');
          break;
        case 'researcher':
          navigate('/builder');
          break;
        default:
          navigate('/dashboard');
      }
    }, 2000);
  };

  const interests = [
    'Regenerative Agriculture', 'Blue Economy', 'Human Health', 'Circular Economy',
    'AI Intelligence', 'Impact Investment', 'Policy Development', 'Research'
  ];

  return (
    <UserFlowLayout>
      <div className="p-4 sm:p-6 max-w-4xl mx-auto">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= stepNum ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step > stepNum ? <CheckCircle className="h-5 w-5" /> : stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`w-16 h-1 ${step > stepNum ? 'bg-green-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {step === 1 && 'Choose Your Role'}
              {step === 2 && 'Complete Your Profile'}
              {step === 3 && 'Welcome to Atlas Sanctum!'}
            </h1>
            <p className="text-gray-600 mt-2">
              {step === 1 && 'Select the role that best describes you'}
              {step === 2 && 'Tell us more about yourself and your interests'}
              {step === 3 && 'Your account is being set up...'}
            </p>
          </div>
        </div>

        {/* Step 1: User Type Selection */}
        {step === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {userTypes.map((userType) => {
              const Icon = userType.icon;
              return (
                <Card 
                  key={userType.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm border-white/20"
                  onClick={() => handleUserTypeSelect(userType.id)}
                >
                  <CardHeader>
                    <div className={`w-12 h-12 bg-gradient-to-r ${userType.color} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{userType.title}</CardTitle>
                    <p className="text-sm text-gray-600">{userType.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {userType.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-4">
                      Select Role <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Step 2: Profile Form */}
        {step === 2 && (
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {userTypes.find(u => u.id === selectedUserType)?.icon && (
                  <div className={`w-8 h-8 bg-gradient-to-r ${userTypes.find(u => u.id === selectedUserType)?.color} rounded-lg flex items-center justify-center`}>
                    {(() => {
                      const Icon = userTypes.find(u => u.id === selectedUserType)?.icon;
                      return Icon ? <Icon className="h-4 w-4 text-white" /> : null;
                    })()}
                  </div>
                )}
                {userTypes.find(u => u.id === selectedUserType)?.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input 
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input 
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="organization">Organization</Label>
                  <Input 
                    id="organization"
                    value={formData.organization}
                    onChange={(e) => setFormData({...formData, organization: e.target.value})}
                    placeholder="Your organization or farm name"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="City, Country"
                  />
                </div>
              </div>

              <div>
                <Label>Areas of Interest</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                  {interests.map((interest) => (
                    <div key={interest} className="flex items-center space-x-2">
                      <Checkbox 
                        id={interest}
                        checked={formData.interests.includes(interest)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData({...formData, interests: [...formData.interests, interest]});
                          } else {
                            setFormData({...formData, interests: formData.interests.filter(i => i !== interest)});
                          }
                        }}
                      />
                      <Label htmlFor={interest} className="text-sm">{interest}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="experience">Experience Level</Label>
                <Select value={formData.experience} onValueChange={(value) => setFormData({...formData, experience: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                    <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                    <SelectItem value="advanced">Advanced (5-10 years)</SelectItem>
                    <SelectItem value="expert">Expert (10+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="goals">Your Goals</Label>
                <Textarea 
                  id="goals"
                  value={formData.goals}
                  onChange={(e) => setFormData({...formData, goals: e.target.value})}
                  placeholder="What do you hope to achieve through regenerative practices?"
                  rows={3}
                />
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button 
                  onClick={handleFormSubmit}
                  disabled={!formData.name || !formData.email}
                  className="flex-1"
                >
                  Create Account
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Created Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Welcome to the Atlas Sanctum regenerative ecosystem. You're being redirected to your personalized dashboard.
            </p>
            <div className="animate-spin w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full mx-auto"></div>
          </div>
        )}
      </div>
    </UserFlowLayout>
  );
}