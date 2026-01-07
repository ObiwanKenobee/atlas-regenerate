import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import UserFlowLayout from '@/components/UserFlowLayout';
import { 
  Sprout, MapPin, Calendar, DollarSign, Target, 
  Upload, CheckCircle, ArrowRight, ArrowLeft 
} from 'lucide-react';

export default function ProjectRegistrationFlow() {
  const [step, setStep] = useState(1);
  const [projectData, setProjectData] = useState({
    name: '',
    type: '',
    location: '',
    size: '',
    description: '',
    goals: [],
    timeline: '',
    budget: '',
    fundingNeeded: '',
    practices: [],
    certifications: [],
    documents: []
  });
  const navigate = useNavigate();

  const projectTypes = [
    'Regenerative Agriculture', 'Soil Restoration', 'Carbon Sequestration',
    'Biodiversity Conservation', 'Water Management', 'Agroforestry',
    'Sustainable Grazing', 'Organic Transition', 'Permaculture Design'
  ];

  const sustainablePractices = [
    'Cover Cropping', 'Crop Rotation', 'Composting', 'No-Till Farming',
    'Integrated Pest Management', 'Rotational Grazing', 'Silvopasture',
    'Biochar Application', 'Native Species Restoration'
  ];

  const projectGoals = [
    'Increase Soil Health', 'Sequester Carbon', 'Improve Biodiversity',
    'Enhance Water Retention', 'Reduce Chemical Inputs', 'Increase Yields',
    'Generate Carbon Credits', 'Improve Ecosystem Services'
  ];

  const handleSubmit = () => {
    setStep(4);
    setTimeout(() => {
      navigate('/practitioner');
    }, 3000);
  };

  return (
    <UserFlowLayout>
      <div className="p-4 sm:p-6 max-w-4xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= stepNum ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step > stepNum ? <CheckCircle className="h-5 w-5" /> : stepNum}
                </div>
                {stepNum < 4 && (
                  <div className={`w-12 h-1 ${step > stepNum ? 'bg-green-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Register Your Regenerative Project
            </h1>
          </div>
        </div>

        {/* Step 1: Basic Information */}
        {step === 1 && (
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sprout className="h-5 w-5 text-green-600" />
                Project Basics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="name">Project Name *</Label>
                <Input 
                  id="name"
                  value={projectData.name}
                  onChange={(e) => setProjectData({...projectData, name: e.target.value})}
                  placeholder="Enter your project name"
                />
              </div>

              <div>
                <Label>Project Type *</Label>
                <Select value={projectData.type} onValueChange={(value) => setProjectData({...projectData, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input 
                    id="location"
                    value={projectData.location}
                    onChange={(e) => setProjectData({...projectData, location: e.target.value})}
                    placeholder="City, State, Country"
                  />
                </div>
                <div>
                  <Label htmlFor="size">Project Size *</Label>
                  <Input 
                    id="size"
                    value={projectData.size}
                    onChange={(e) => setProjectData({...projectData, size: e.target.value})}
                    placeholder="e.g., 50 hectares"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Project Description *</Label>
                <Textarea 
                  id="description"
                  value={projectData.description}
                  onChange={(e) => setProjectData({...projectData, description: e.target.value})}
                  placeholder="Describe your regenerative project, its current state, and vision"
                  rows={4}
                />
              </div>

              <Button 
                onClick={() => setStep(2)}
                disabled={!projectData.name || !projectData.type || !projectData.location}
                className="w-full"
              >
                Next: Goals & Practices <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Goals & Practices */}
        {step === 2 && (
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                Goals & Practices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Project Goals</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                  {projectGoals.map((goal) => (
                    <div key={goal} className="flex items-center space-x-2">
                      <Checkbox 
                        id={goal}
                        checked={projectData.goals.includes(goal)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setProjectData({...projectData, goals: [...projectData.goals, goal]});
                          } else {
                            setProjectData({...projectData, goals: projectData.goals.filter(g => g !== goal)});
                          }
                        }}
                      />
                      <Label htmlFor={goal} className="text-sm">{goal}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Sustainable Practices</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                  {sustainablePractices.map((practice) => (
                    <div key={practice} className="flex items-center space-x-2">
                      <Checkbox 
                        id={practice}
                        checked={projectData.practices.includes(practice)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setProjectData({...projectData, practices: [...projectData.practices, practice]});
                          } else {
                            setProjectData({...projectData, practices: projectData.practices.filter(p => p !== practice)});
                          }
                        }}
                      />
                      <Label htmlFor={practice} className="text-sm">{practice}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="timeline">Project Timeline</Label>
                <Select value={projectData.timeline} onValueChange={(value) => setProjectData({...projectData, timeline: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6months">6 months</SelectItem>
                    <SelectItem value="1year">1 year</SelectItem>
                    <SelectItem value="2years">2 years</SelectItem>
                    <SelectItem value="3years">3 years</SelectItem>
                    <SelectItem value="5years">5+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back
                </Button>
                <Button onClick={() => setStep(3)} className="flex-1">
                  Next: Funding <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Funding & Documentation */}
        {step === 3 && (
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Funding & Documentation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="budget">Total Project Budget</Label>
                  <Input 
                    id="budget"
                    value={projectData.budget}
                    onChange={(e) => setProjectData({...projectData, budget: e.target.value})}
                    placeholder="e.g., $50,000"
                  />
                </div>
                <div>
                  <Label htmlFor="fundingNeeded">Funding Needed</Label>
                  <Input 
                    id="fundingNeeded"
                    value={projectData.fundingNeeded}
                    onChange={(e) => setProjectData({...projectData, fundingNeeded: e.target.value})}
                    placeholder="e.g., $30,000"
                  />
                </div>
              </div>

              <div>
                <Label>Current Certifications</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                  {['Organic', 'Biodynamic', 'Regenerative Organic', 'Fair Trade', 'Rainforest Alliance', 'Carbon Verified'].map((cert) => (
                    <div key={cert} className="flex items-center space-x-2">
                      <Checkbox 
                        id={cert}
                        checked={projectData.certifications.includes(cert)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setProjectData({...projectData, certifications: [...projectData.certifications, cert]});
                          } else {
                            setProjectData({...projectData, certifications: projectData.certifications.filter(c => c !== cert)});
                          }
                        }}
                      />
                      <Label htmlFor={cert} className="text-sm">{cert}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Supporting Documents</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Upload project documents, photos, or plans</p>
                  <Button variant="outline" size="sm">Choose Files</Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back
                </Button>
                <Button onClick={handleSubmit} className="flex-1">
                  Submit Project
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Submitted Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Your regenerative project is now under review. You'll receive updates on verification status and funding opportunities.
            </p>
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">Next Steps:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Project verification (2-5 business days)</li>
                <li>• Impact measurement setup</li>
                <li>• Funding opportunity matching</li>
                <li>• Community connection</li>
              </ul>
            </div>
            <div className="animate-spin w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full mx-auto"></div>
          </div>
        )}
      </div>
    </UserFlowLayout>
  );
}