import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, DollarSign, Target, Award, Users, BarChart3, Zap } from 'lucide-react';
import { toast } from 'sonner';

// Mock data
const mockVentures = [
  { id: '1', venture_name: 'Ocean Kelp Farms', venture_type: 'startup', sector: 'marine_agriculture', stage: 'series_a', funding_goal: 2500000, funding_raised: 1750000, minimum_investment: 10000, verification_status: 'verified', impact_metrics: {}, created_at: '2025-06-01' },
  { id: '2', venture_name: 'Regenerative Soil Co', venture_type: 'cooperative', sector: 'agriculture', stage: 'seed', funding_goal: 850000, funding_raised: 595000, minimum_investment: 5000, verification_status: 'featured', impact_metrics: {}, created_at: '2025-08-15' },
  { id: '3', venture_name: 'Forest Carbon Initiative', venture_type: 'social_enterprise', sector: 'forestry', stage: 'growth', funding_goal: 5000000, funding_raised: 3250000, minimum_investment: 25000, verification_status: 'verified', impact_metrics: {}, created_at: '2025-03-20' },
];

const mockOpportunities = [
  { id: '1', venture_id: 'v1', opportunity_type: 'equity', target_amount: 2500000, raised_amount: 1875000, investor_count: 45, expected_return: 12.5, investment_period_months: 36, status: 'open', closing_date: '2026-03-15' },
  { id: '2', venture_id: 'v2', opportunity_type: 'revenue_share', target_amount: 1200000, raised_amount: 960000, investor_count: 28, expected_return: 8.2, investment_period_months: 24, status: 'closing_soon', closing_date: '2026-01-30' },
];

const mockRatings = [
  { id: '1', venture_id: 'v1', rating_agency: 'Impact Ratings Global', overall_rating: 'AA', impact_score: 85, financial_score: 78, governance_score: 82, risk_score: 25, rating_outlook: 'positive', rating_date: '2025-12-01' },
  { id: '2', venture_id: 'v2', rating_agency: 'Regenerative Score', overall_rating: 'A', impact_score: 79, financial_score: 72, governance_score: 75, risk_score: 32, rating_outlook: 'stable', rating_date: '2025-11-15' },
];

export default function ImpactMarketplaces() {
  const [ventures] = useState(mockVentures);
  const [opportunities] = useState(mockOpportunities);
  const [ratings] = useState(mockRatings);

  const getVentureTypeIcon = (type: string) => {
    switch (type) {
      case 'startup': return <Zap className="h-4 w-4 text-blue-600" />;
      case 'cooperative': return <Users className="h-4 w-4 text-green-600" />;
      case 'social_enterprise': return <Target className="h-4 w-4 text-purple-600" />;
      default: return <TrendingUp className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': case 'open': case 'funded': return 'bg-green-500';
      case 'featured': return 'bg-blue-500';
      case 'closing_soon': return 'bg-yellow-500';
      default: return 'bg-muted';
    }
  };

  const getRatingColor = (rating: string) => {
    if (['AAA', 'AA'].includes(rating)) return 'bg-green-500';
    if (['A', 'BBB'].includes(rating)) return 'bg-blue-500';
    if (['BB', 'B'].includes(rating)) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getFundingProgress = (venture: typeof mockVentures[0]) => (venture.funding_raised / venture.funding_goal) * 100;

  const getTotalMarketValue = () => opportunities.reduce((sum, opp) => sum + opp.target_amount, 0);
  const getAverageReturn = () => opportunities.length === 0 ? 0 : opportunities.reduce((sum, opp) => sum + (opp.expected_return || 0), 0) / opportunities.length;

  return (
    <div className="md:ml-80 p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
        <h1 className="text-2xl sm:text-3xl font-bold">Impact Marketplaces</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <Card><CardContent className="p-3 sm:p-4"><div className="flex items-center gap-2"><Target className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" /><div><p className="text-xs sm:text-sm text-muted-foreground">Verified Ventures</p><p className="text-xl sm:text-2xl font-bold">{ventures.length}</p></div></div></CardContent></Card>
        <Card><CardContent className="p-3 sm:p-4"><div className="flex items-center gap-2"><DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" /><div><p className="text-xs sm:text-sm text-muted-foreground">Market Value</p><p className="text-xl sm:text-2xl font-bold">${(getTotalMarketValue() / 1000000).toFixed(1)}M</p></div></div></CardContent></Card>
        <Card><CardContent className="p-3 sm:p-4"><div className="flex items-center gap-2"><BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" /><div><p className="text-xs sm:text-sm text-muted-foreground">Avg Expected Return</p><p className="text-xl sm:text-2xl font-bold">{getAverageReturn().toFixed(1)}%</p></div></div></CardContent></Card>
        <Card><CardContent className="p-3 sm:p-4"><div className="flex items-center gap-2"><TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" /><div><p className="text-xs sm:text-sm text-muted-foreground">Open Opportunities</p><p className="text-xl sm:text-2xl font-bold">{opportunities.length}</p></div></div></CardContent></Card>
      </div>

      <Tabs defaultValue="ventures" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="ventures">Ventures</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="ratings">Ratings</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
        </TabsList>

        <TabsContent value="ventures" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {ventures.map((venture) => (
              <Card key={venture.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">{getVentureTypeIcon(venture.venture_type)}<span className="truncate">{venture.venture_name}</span></CardTitle>
                    <Badge className={getStatusColor(venture.verification_status)}>{venture.verification_status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div><p className="text-xs sm:text-sm text-muted-foreground">Sector</p><p className="font-semibold text-sm capitalize">{venture.sector.replace('_', ' ')}</p></div>
                  <div><p className="text-xs sm:text-sm text-muted-foreground">Stage</p><p className="font-semibold text-sm capitalize">{venture.stage}</p></div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><p className="text-muted-foreground text-xs">Funding Goal</p><p className="font-semibold">${venture.funding_goal.toLocaleString()}</p></div>
                    <div><p className="text-muted-foreground text-xs">Min Investment</p><p className="font-semibold">${venture.minimum_investment.toLocaleString()}</p></div>
                  </div>
                  <div><div className="flex justify-between text-sm mb-1"><span>Funding Progress</span><span>{getFundingProgress(venture).toFixed(1)}%</span></div><Progress value={getFundingProgress(venture)} /><p className="text-xs text-muted-foreground mt-1">${venture.funding_raised.toLocaleString()} raised</p></div>
                  <Button className="w-full" size="sm">View Details</Button>
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
                  <CardTitle className="flex items-center gap-2"><DollarSign className="h-4 w-4 sm:h-5 sm:w-5" /><span className="capitalize">{opportunity.opportunity_type.replace('_', ' ')} Investment</span></CardTitle>
                  <Badge className={getStatusColor(opportunity.status)}>{opportunity.status.replace('_', ' ')}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4">
                  <div><p className="text-xs sm:text-sm text-muted-foreground">Target Amount</p><p className="text-base sm:text-lg font-semibold">${opportunity.target_amount.toLocaleString()}</p></div>
                  <div><p className="text-xs sm:text-sm text-muted-foreground">Raised</p><p className="text-base sm:text-lg font-semibold">${opportunity.raised_amount.toLocaleString()}</p></div>
                  <div><p className="text-xs sm:text-sm text-muted-foreground">Expected Return</p><p className="text-base sm:text-lg font-semibold">{opportunity.expected_return?.toFixed(1) || 'N/A'}%</p></div>
                  <div><p className="text-xs sm:text-sm text-muted-foreground">Investment Period</p><p className="text-base sm:text-lg font-semibold">{opportunity.investment_period_months} months</p></div>
                </div>
                <div className="mb-4"><div className="flex justify-between text-sm mb-1"><span>Funding Progress</span><span>{((opportunity.raised_amount / opportunity.target_amount) * 100).toFixed(1)}%</span></div><Progress value={(opportunity.raised_amount / opportunity.target_amount) * 100} /><p className="text-xs text-muted-foreground mt-1">{opportunity.investor_count} investors • Closes {new Date(opportunity.closing_date).toLocaleDateString()}</p></div>
                <div className="flex flex-col sm:flex-row gap-2"><Button onClick={() => toast.success('Investment interest recorded - complete KYC to proceed')} className="flex-1" size="sm">Invest Now</Button><Button variant="outline" className="flex-1" size="sm">Learn More</Button></div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="ratings" className="space-y-4">
          {ratings.map((rating) => (
            <Card key={rating.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2"><Award className="h-5 w-5" />Impact Rating</CardTitle>
                  <div className="flex gap-2"><Badge className={getRatingColor(rating.overall_rating)}>{rating.overall_rating}</Badge><Badge variant="outline">{rating.rating_outlook}</Badge></div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div><p className="text-sm text-muted-foreground">Impact Score</p><div className="flex items-center gap-2"><Progress value={rating.impact_score} className="flex-1" /><span className="text-sm font-semibold">{rating.impact_score}</span></div></div>
                  <div><p className="text-sm text-muted-foreground">Financial Score</p><div className="flex items-center gap-2"><Progress value={rating.financial_score} className="flex-1" /><span className="text-sm font-semibold">{rating.financial_score}</span></div></div>
                  <div><p className="text-sm text-muted-foreground">Governance Score</p><div className="flex items-center gap-2"><Progress value={rating.governance_score} className="flex-1" /><span className="text-sm font-semibold">{rating.governance_score}</span></div></div>
                  <div><p className="text-sm text-muted-foreground">Risk Score</p><div className="flex items-center gap-2"><Progress value={rating.risk_score} className="flex-1" /><span className="text-sm font-semibold">{rating.risk_score}</span></div></div>
                </div>
                <div className="mt-4"><p className="text-sm text-muted-foreground">Rating Agency</p><p className="font-semibold">{rating.rating_agency}</p></div>
                <p className="text-xs text-muted-foreground mt-2">Rated: {new Date(rating.rating_date).toLocaleDateString()}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-4">
          <Card>
            <CardHeader><CardTitle>Your Impact Portfolio</CardTitle></CardHeader>
            <CardContent className="text-center py-8">
              <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Your portfolio will appear here once you make your first investment</p>
              <Button className="mt-4">Browse Opportunities</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
