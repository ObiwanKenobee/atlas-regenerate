import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, DollarSign, Target, Award, Users, BarChart3, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface RegenerativeVenture {
  id: string;
  venture_name: string;
  venture_type: string;
  sector: string;
  stage: string;
  funding_goal: number;
  funding_raised: number;
  minimum_investment: number;
  verification_status: string;
  impact_metrics: any;
  created_at: string;
}

interface InvestmentOpportunity {
  id: string;
  venture_id: string;
  opportunity_type: string;
  target_amount: number;
  raised_amount: number;
  investor_count: number;
  expected_return: number;
  investment_period_months: number;
  status: string;
  closing_date: string;
}

interface MarketplaceInvestment {
  id: string;
  opportunity_id: string;
  investment_amount: number;
  investment_date: string;
  expected_impact: any;
  investment_status: string;
}

interface ImpactRating {
  id: string;
  venture_id: string;
  rating_agency: string;
  overall_rating: string;
  impact_score: number;
  financial_score: number;
  rating_outlook: string;
  rating_date: string;
  governance_score?: number;
  risk_score?: number;
}

interface SecondaryMarket {
  id: string;
  asset_type: string;
  units_for_sale: number;
  asking_price_per_unit: number;
  total_asking_price: number;
  market_status: string;
  listing_date: string;
}

export default function ImpactMarketplaces() {
  // Mock data since marketplace tables don't exist
  const ventures: RegenerativeVenture[] = [
    { id: '1', venture_name: 'EcoForest Ventures', venture_type: 'startup', sector: 'forestry', stage: 'growth', funding_goal: 2000000, funding_raised: 1450000, minimum_investment: 1000, verification_status: 'verified', impact_metrics: {}, created_at: '2025-06-15' },
    { id: '2', venture_name: 'Ocean Regeneration Co', venture_type: 'social_enterprise', sector: 'marine', stage: 'seed', funding_goal: 500000, funding_raised: 285000, minimum_investment: 500, verification_status: 'featured', impact_metrics: {}, created_at: '2025-08-20' }
  ];

  const opportunities: InvestmentOpportunity[] = [
    { id: '1', venture_id: '1', opportunity_type: 'equity', target_amount: 500000, raised_amount: 350000, investor_count: 45, expected_return: 12.5, investment_period_months: 36, status: 'open', closing_date: '2026-03-31' }
  ];

  const investments: MarketplaceInvestment[] = [
    { id: '1', opportunity_id: '1', investment_amount: 5000, investment_date: '2026-01-20', expected_impact: {}, investment_status: 'active' }
  ];

  const ratings: ImpactRating[] = [
    { id: '1', venture_id: '1', rating_agency: 'ImpactVerify', overall_rating: 'A+', impact_score: 92, financial_score: 85, rating_outlook: 'positive', rating_date: '2026-01-15' }
  ];

  const secondaryMarket: SecondaryMarket[] = [
    { id: '1', asset_type: 'equity', units_for_sale: 100, asking_price_per_unit: 125, total_asking_price: 12500, market_status: 'listed', listing_date: '2026-01-25' }
  ];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const getVentureTypeIcon = (type: string) => {
    switch (type) {
      case 'startup': return <Zap className="h-4 w-4 text-blue-600" />;
      case 'cooperative': return <Users className="h-4 w-4 text-green-600" />;
      case 'social_enterprise': return <Target className="h-4 w-4 text-purple-600" />;
      case 'community_project': return <Users className="h-4 w-4 text-orange-600" />;
      default: return <TrendingUp className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-500';
      case 'featured': return 'bg-blue-500';
      case 'open': return 'bg-green-500';
      case 'closing_soon': return 'bg-yellow-500';
      case 'funded': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getRatingColor = (rating: string) => {
    if (['AAA', 'AA'].includes(rating)) return 'bg-green-500';
    if (['A', 'BBB'].includes(rating)) return 'bg-blue-500';
    if (['BB', 'B'].includes(rating)) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getFundingProgress = (venture: RegenerativeVenture) => {
    return (venture.funding_raised / venture.funding_goal) * 100;
  };

  const investInOpportunity = async (opportunityId: string, amount: number) => {
    try {
      // This would typically require user authentication and investor profile
      toast.success('Investment interest recorded - complete KYC to proceed');
    } catch (error) {
      toast.error('Failed to process investment');
    }
  };

  const getTotalMarketValue = () => {
    return opportunities.reduce((sum, opp) => sum + opp.target_amount, 0);
  };

  const getTotalInvestments = () => {
    return investments.reduce((sum, inv) => sum + inv.investment_amount, 0);
  };

  const getAverageReturn = () => {
    if (opportunities.length === 0) return 0;
    return opportunities.reduce((sum, opp) => sum + (opp.expected_return || 0), 0) / opportunities.length;
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading impact marketplace...</div>;
  }

  return (
    <div className="md:ml-80 p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
        <h1 className="text-2xl sm:text-3xl font-bold">Impact Marketplaces</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Verified Ventures</p>
                <p className="text-xl sm:text-2xl font-bold">{ventures.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Market Value</p>
                <p className="text-xl sm:text-2xl font-bold">${(getTotalMarketValue() / 1000000).toFixed(1)}M</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Total Invested</p>
                <p className="text-xl sm:text-2xl font-bold">${(getTotalInvestments() / 1000000).toFixed(1)}M</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Avg Expected Return</p>
                <p className="text-xl sm:text-2xl font-bold">{getAverageReturn().toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="ventures" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          <TabsTrigger value="ventures" className="text-xs sm:text-sm">Ventures</TabsTrigger>
          <TabsTrigger value="opportunities" className="text-xs sm:text-sm">Opportunities</TabsTrigger>
          <TabsTrigger value="ratings" className="text-xs sm:text-sm">Ratings</TabsTrigger>
          <TabsTrigger value="secondary" className="text-xs sm:text-sm">Secondary</TabsTrigger>
          <TabsTrigger value="portfolio" className="text-xs sm:text-sm">Portfolio</TabsTrigger>
        </TabsList>

        <TabsContent value="ventures" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {ventures.map((venture) => (
              <Card key={venture.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                      {getVentureTypeIcon(venture.venture_type)}
                      <span className="truncate">{venture.venture_name}</span>
                    </CardTitle>
                    <Badge className={getStatusColor(venture.verification_status)}>
                      {venture.verification_status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Sector</p>
                    <p className="font-semibold text-sm capitalize">{venture.sector.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Stage</p>
                    <p className="font-semibold text-sm capitalize">{venture.stage}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-600 text-xs">Funding Goal</p>
                      <p className="font-semibold">${venture.funding_goal.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs">Min Investment</p>
                      <p className="font-semibold">${venture.minimum_investment.toLocaleString()}</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Funding Progress</span>
                      <span>{getFundingProgress(venture).toFixed(1)}%</span>
                    </div>
                    <Progress value={getFundingProgress(venture)} />
                    <p className="text-xs text-gray-500 mt-1">
                      ${venture.funding_raised.toLocaleString()} raised
                    </p>
                  </div>
                  <Button className="w-full" size="sm">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-4">
          {opportunities.map((opportunity) => (
            <Card key={opportunity.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <DollarSign className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="truncate">{opportunity.opportunity_type.replace('_', ' ')} Investment</span>
                  </CardTitle>
                  <Badge className={getStatusColor(opportunity.status)}>
                    {opportunity.status.replace('_', ' ')}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Target Amount</p>
                    <p className="text-base sm:text-lg font-semibold">${opportunity.target_amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Raised</p>
                    <p className="text-base sm:text-lg font-semibold">${opportunity.raised_amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Expected Return</p>
                    <p className="text-base sm:text-lg font-semibold">{opportunity.expected_return?.toFixed(1) || 'N/A'}%</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Investment Period</p>
                    <p className="text-base sm:text-lg font-semibold">{opportunity.investment_period_months} months</p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Funding Progress</span>
                    <span>{((opportunity.raised_amount / opportunity.target_amount) * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={(opportunity.raised_amount / opportunity.target_amount) * 100} />
                  <p className="text-xs text-gray-500 mt-1">
                    {opportunity.investor_count} investors • Closes {new Date(opportunity.closing_date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button 
                    onClick={() => investInOpportunity(opportunity.id, 10000)}
                    className="flex-1"
                    size="sm"
                  >
                    Invest Now
                  </Button>
                  <Button variant="outline" className="flex-1" size="sm">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="ratings" className="space-y-4">
          {ratings.map((rating) => (
            <Card key={rating.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Impact Rating
                  </CardTitle>
                  <div className="flex gap-2">
                    <Badge className={getRatingColor(rating.overall_rating)}>
                      {rating.overall_rating}
                    </Badge>
                    <Badge variant="outline">
                      {rating.rating_outlook}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Impact Score</p>
                    <div className="flex items-center gap-2">
                      <Progress value={(rating.impact_score / 100) * 100} className="flex-1" />
                      <span className="text-sm font-semibold">{rating.impact_score.toFixed(1)}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Financial Score</p>
                    <div className="flex items-center gap-2">
                      <Progress value={(rating.financial_score / 100) * 100} className="flex-1" />
                      <span className="text-sm font-semibold">{rating.financial_score.toFixed(1)}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Governance Score</p>
                    <div className="flex items-center gap-2">
                      <Progress value={(rating.governance_score / 100) * 100} className="flex-1" />
                      <span className="text-sm font-semibold">{rating.governance_score.toFixed(1)}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Risk Score</p>
                    <div className="flex items-center gap-2">
                      <Progress value={(rating.risk_score / 100) * 100} className="flex-1" />
                      <span className="text-sm font-semibold">{rating.risk_score.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">Rating Agency</p>
                  <p className="font-semibold">{rating.rating_agency}</p>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Rated: {new Date(rating.rating_date).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="secondary" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {secondaryMarket.map((listing) => (
              <Card key={listing.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base capitalize">
                      {listing.asset_type.replace('_', ' ')}
                    </CardTitle>
                    <Badge className={getStatusColor(listing.market_status)}>
                      {listing.market_status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-600">Units for Sale</p>
                        <p className="font-semibold">{listing.units_for_sale.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Price per Unit</p>
                        <p className="font-semibold">${listing.asking_price_per_unit.toFixed(2)}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Asking Price</p>
                      <p className="text-lg font-semibold">${listing.total_asking_price.toLocaleString()}</p>
                    </div>
                    <Button className="w-full" size="sm">
                      Make Offer
                    </Button>
                    <p className="text-xs text-gray-500">
                      Listed: {new Date(listing.listing_date).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                My Investment Portfolio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Connect your investor profile to view your portfolio</p>
                <p className="text-sm text-gray-500 mt-2">Track your regenerative investments and impact returns</p>
                <Button className="mt-4">Create Investor Profile</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}