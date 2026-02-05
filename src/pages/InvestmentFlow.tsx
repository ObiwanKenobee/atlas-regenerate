import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import UserFlowLayout from '@/components/UserFlowLayout';
import { 
  TrendingUp, DollarSign, Target, Shield, Award, 
  CheckCircle, ArrowRight, ArrowLeft, Eye, FileText 
} from 'lucide-react';

const sampleProjects = [
  {
    id: '1',
    name: 'Regenerative Coffee Farm Transition',
    type: 'Agriculture',
    location: 'Costa Rica',
    fundingGoal: 75000,
    fundingRaised: 45000,
    minInvestment: 1000,
    expectedReturn: 8.5,
    impactScore: 94,
    timeline: '3 years',
    description: 'Converting 200 hectares of conventional coffee to regenerative practices',
    highlights: ['Soil carbon +40%', '150 jobs created', 'Biodiversity restoration']
  },
  {
    id: '2',
    name: 'Ocean Kelp Forest Restoration',
    type: 'Blue Economy',
    location: 'California, USA',
    fundingGoal: 120000,
    fundingRaised: 80000,
    minInvestment: 2500,
    expectedReturn: 7.2,
    impactScore: 96,
    timeline: '5 years',
    description: 'Restoring 500 acres of kelp forest ecosystem',
    highlights: ['Carbon sequestration', 'Marine biodiversity', 'Coastal protection']
  },
  {
    id: '3',
    name: 'Circular Waste Processing Hub',
    type: 'Circular Economy',
    location: 'Kenya',
    fundingGoal: 200000,
    fundingRaised: 150000,
    minInvestment: 5000,
    expectedReturn: 12.3,
    impactScore: 89,
    timeline: '2 years',
    description: 'Community-owned waste processing and upcycling facility',
    highlights: ['500 tons waste/month', '200 jobs created', 'Zero waste to landfill']
  }
];

export default function InvestmentFlow() {
  const [step, setStep] = useState(1);
  const [selectedProject, setSelectedProject] = useState(null);
  const [investmentData, setInvestmentData] = useState({
    amount: '',
    investorType: '',
    riskTolerance: '',
    impactPriorities: [],
    accredited: false,
    kycCompleted: false
  });
  const navigate = useNavigate();

  const impactPriorities = [
    'Carbon Sequestration', 'Biodiversity Conservation', 'Job Creation',
    'Community Development', 'Soil Health', 'Water Conservation',
    'Renewable Energy', 'Circular Economy'
  ];

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setStep(2);
  };

  const handleInvestmentSubmit = () => {
    setStep(4);
    setTimeout(() => {
      navigate('/investor');
    }, 3000);
  };

  return (
    <UserFlowLayout>
      <div className="p-4 sm:p-6 max-w-6xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= stepNum ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step > stepNum ? <CheckCircle className="h-5 w-5" /> : stepNum}
                </div>
                {stepNum < 4 && (
                  <div className={`w-12 h-1 ${step > stepNum ? 'bg-blue-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Impact Investment Journey
            </h1>
          </div>
        </div>

        {/* Step 1: Project Selection */}
        {step === 1 && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold mb-2">Choose Your Investment</h2>
              <p className="text-gray-600">Select a verified regenerative project to invest in</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {sampleProjects.map((project) => (
                <Card key={project.id} className="bg-white/70 backdrop-blur-sm border-white/20 hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{project.type}</Badge>
                      <Badge className="bg-green-100 text-green-800">Verified</Badge>
                    </div>
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <p className="text-sm text-gray-600">{project.location}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">{project.description}</p>
                    
                    <div className="space-y-2">
                      {project.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{highlight}</span>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Expected Return</p>
                        <p className="font-semibold text-green-600">{project.expectedReturn}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Impact Score</p>
                        <p className="font-semibold text-blue-600">{project.impactScore}/100</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Min Investment</p>
                        <p className="font-semibold">${project.minInvestment.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Timeline</p>
                        <p className="font-semibold">{project.timeline}</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Funding Progress</span>
                        <span>{((project.fundingRaised / project.fundingGoal) * 100).toFixed(0)}%</span>
                      </div>
                      <Progress value={(project.fundingRaised / project.fundingGoal) * 100} />
                      <p className="text-xs text-gray-500 mt-1">
                        ${project.fundingRaised.toLocaleString()} of ${project.fundingGoal.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button 
                        onClick={() => handleProjectSelect(project)}
                        size="sm" 
                        className="flex-1"
                      >
                        Invest Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Investment Details */}
        {step === 2 && selectedProject && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Project Summary */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Investment Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">{selectedProject.name}</h3>
                    <p className="text-sm text-gray-600">{selectedProject.location}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Expected Return</p>
                      <p className="font-semibold text-green-600">{selectedProject.expectedReturn}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Impact Score</p>
                      <p className="font-semibold text-blue-600">{selectedProject.impactScore}/100</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">Impact Highlights</p>
                    <div className="space-y-1">
                      {selectedProject.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Investment Form */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  Investment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="amount">Investment Amount *</Label>
                  <Input 
                    id="amount"
                    type="number"
                    value={investmentData.amount}
                    onChange={(e) => setInvestmentData({...investmentData, amount: e.target.value})}
                    placeholder={`Minimum $${selectedProject.minInvestment.toLocaleString()}`}
                    min={selectedProject.minInvestment}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Minimum investment: ${selectedProject.minInvestment.toLocaleString()}
                  </p>
                </div>

                <div>
                  <Label>Investor Type *</Label>
                  <Select value={investmentData.investorType} onValueChange={(value) => setInvestmentData({...investmentData, investorType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select investor type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual Investor</SelectItem>
                      <SelectItem value="institutional">Institutional Investor</SelectItem>
                      <SelectItem value="family_office">Family Office</SelectItem>
                      <SelectItem value="foundation">Foundation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Risk Tolerance *</Label>
                  <Select value={investmentData.riskTolerance} onValueChange={(value) => setInvestmentData({...investmentData, riskTolerance: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select risk tolerance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conservative">Conservative</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="aggressive">Aggressive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Impact Priorities</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {impactPriorities.slice(0, 6).map((priority) => (
                      <div key={priority} className="flex items-center space-x-2">
                        <Checkbox 
                          id={priority}
                          checked={investmentData.impactPriorities.includes(priority)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setInvestmentData({...investmentData, impactPriorities: [...investmentData.impactPriorities, priority]});
                            } else {
                              setInvestmentData({...investmentData, impactPriorities: investmentData.impactPriorities.filter(p => p !== priority)});
                            }
                          }}
                        />
                        <Label htmlFor={priority} className="text-sm">{priority}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back
                  </Button>
                  <Button 
                    onClick={() => setStep(3)}
                    disabled={!investmentData.amount || !investmentData.investorType}
                    className="flex-1"
                  >
                    Next: Verification <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: KYC & Verification */}
        {step === 3 && (
          <Card className="bg-white/70 backdrop-blur-sm border-white/20 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-600" />
                Investor Verification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Required Verification</h3>
                <p className="text-sm text-blue-800">
                  To comply with regulations and ensure secure transactions, we need to verify your identity and investment eligibility.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="font-medium">Identity Verification</p>
                      <p className="text-sm text-gray-600">Upload government-issued ID</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Upload</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="font-medium">Accredited Investor Status</p>
                      <p className="text-sm text-gray-600">Verify investment eligibility</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Verify</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="font-medium">Source of Funds</p>
                      <p className="text-sm text-gray-600">Bank statement or proof of funds</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Upload</Button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="accredited"
                    checked={investmentData.accredited}
                    onCheckedChange={(checked) => setInvestmentData({...investmentData, accredited: checked === true})}
                  />
                  <Label htmlFor="accredited" className="text-sm">
                    I confirm that I am an accredited investor
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="kyc"
                    checked={investmentData.kycCompleted}
                    onCheckedChange={(checked) => setInvestmentData({...investmentData, kycCompleted: checked === true})}
                  />
                  <Label htmlFor="kyc" className="text-sm">
                    I have completed the KYC verification process
                  </Label>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back
                </Button>
                <Button 
                  onClick={handleInvestmentSubmit}
                  disabled={!investmentData.accredited || !investmentData.kycCompleted}
                  className="flex-1"
                >
                  Complete Investment
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Investment Submitted Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Your investment of ${parseInt(investmentData.amount).toLocaleString()} in {selectedProject?.name} is being processed.
            </p>
            <div className="bg-green-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-green-900 mb-2">What happens next:</h3>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Final verification and compliance check</li>
                <li>• Smart contract deployment</li>
                <li>• Impact tracking setup</li>
                <li>• Regular progress updates</li>
              </ul>
            </div>
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          </div>
        )}
      </div>
    </UserFlowLayout>
  );
}