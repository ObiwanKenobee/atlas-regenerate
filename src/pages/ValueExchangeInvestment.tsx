import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, DollarSign, PieChart, FileText, ShoppingCart, BarChart3 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface InvestmentAsset {
  id: string;
  project_id: string;
  asset_type: string;
  asset_status: string;
  total_units: number;
  available_units: number;
  unit_price: number;
  risk_rating: string;
  impact_metrics: any;
  created_at: string;
}

interface InvestmentTransaction {
  id: string;
  asset_id: string;
  transaction_type: string;
  units_traded: number;
  unit_price: number;
  total_amount: number;
  platform_fee: number;
  practitioner_payment: number;
  created_at: string;
}

interface InvestorPortfolio {
  id: string;
  portfolio_name: string;
  portfolio_type: string;
  total_invested: number;
  current_value: number;
  impact_score: number;
  diversification_score: number;
}

interface PortfolioHolding {
  id: string;
  portfolio_id: string;
  asset_id: string;
  units_held: number;
  average_cost: number;
  current_value: number;
  unrealized_gain_loss: number;
}

export default function ValueExchangeInvestment() {
  const [assets, setAssets] = useState<InvestmentAsset[]>([]);
  const [transactions, setTransactions] = useState<InvestmentTransaction[]>([]);
  const [portfolios, setPortfolios] = useState<InvestorPortfolio[]>([]);
  const [holdings, setHoldings] = useState<PortfolioHolding[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMarketplaceData();
    const interval = setInterval(fetchMarketplaceData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchMarketplaceData = async () => {
    try {
      const [assetsRes, transactionsRes, portfoliosRes, holdingsRes] = await Promise.all([
        supabase.from('investment_assets').select('*').eq('asset_status', 'listed').order('created_at', { ascending: false }),
        supabase.from('investment_transactions').select('*').order('created_at', { ascending: false }).limit(10),
        supabase.from('investor_portfolios').select('*').order('total_invested', { ascending: false }),
        supabase.from('portfolio_holdings').select('*').order('current_value', { ascending: false })
      ]);

      if (assetsRes.data) setAssets(assetsRes.data);
      if (transactionsRes.data) setTransactions(transactionsRes.data);
      if (portfoliosRes.data) setPortfolios(portfoliosRes.data);
      if (holdingsRes.data) setHoldings(holdingsRes.data);
    } catch (error) {
      console.error('Error fetching marketplace data:', error);
    } finally {
      setLoading(false);
    }
  };

  const purchaseAsset = async (assetId: string, units: number) => {
    try {
      const asset = assets.find(a => a.id === assetId);
      if (!asset) return;

      const totalAmount = units * asset.unit_price;
      const platformFee = totalAmount * 0.025; // 2.5% platform fee
      const practitionerPayment = totalAmount - platformFee;

      const { error } = await supabase.from('investment_transactions').insert({
        asset_id: assetId,
        transaction_type: 'primary_purchase',
        units_traded: units,
        unit_price: asset.unit_price,
        total_amount: totalAmount,
        platform_fee: platformFee,
        practitioner_payment: practitionerPayment
      });

      if (error) throw error;
      toast.success('Investment transaction initiated');
      fetchMarketplaceData();
    } catch (error) {
      toast.error('Failed to process investment');
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getAssetTypeIcon = (type: string) => {
    switch (type) {
      case 'carbon_credit': return '🌱';
      case 'biodiversity_credit': return '🦋';
      case 'impact_bond': return '💰';
      case 'revenue_share': return '📈';
      default: return '💎';
    }
  };

  const getTotalMarketValue = () => {
    return assets.reduce((sum, asset) => sum + (asset.available_units * asset.unit_price), 0);
  };

  const getTotalTransactionVolume = () => {
    return transactions.reduce((sum, tx) => sum + tx.total_amount, 0);
  };

  const getTotalPractitionerPayments = () => {
    return transactions.reduce((sum, tx) => sum + tx.practitioner_payment, 0);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading marketplace data...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="h-8 w-8 text-green-600" />
        <h1 className="text-3xl font-bold">Value Exchange & Investment</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Listed Assets</p>
                <p className="text-2xl font-bold">{assets.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Market Value</p>
                <p className="text-2xl font-bold">${getTotalMarketValue().toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Transaction Volume</p>
                <p className="text-2xl font-bold">${getTotalTransactionVolume().toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Practitioner Payments</p>
                <p className="text-2xl font-bold">${getTotalPractitionerPayments().toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="marketplace" className="space-y-4">
        <TabsList>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger value="portfolios">Portfolios</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="marketplace" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assets.map((asset) => (
              <Card key={asset.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <span>{getAssetTypeIcon(asset.asset_type)}</span>
                      {asset.asset_type.replace('_', ' ')}
                    </CardTitle>
                    <Badge className={getRiskColor(asset.risk_rating)}>
                      {asset.risk_rating} risk
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-600">Unit Price</p>
                        <p className="font-semibold">${asset.unit_price}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Available</p>
                        <p className="font-semibold">{asset.available_units.toLocaleString()}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Availability</p>
                      <Progress value={(asset.available_units / asset.total_units) * 100} />
                      <p className="text-xs text-gray-500 mt-1">
                        {asset.available_units.toLocaleString()} / {asset.total_units.toLocaleString()} units
                      </p>
                    </div>
                    <div className="pt-2">
                      <Button 
                        onClick={() => purchaseAsset(asset.id, Math.min(100, asset.available_units))}
                        className="w-full"
                        disabled={asset.available_units === 0}
                      >
                        Invest Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="portfolios" className="space-y-4">
          {portfolios.map((portfolio) => (
            <Card key={portfolio.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    {portfolio.portfolio_name}
                  </CardTitle>
                  <Badge variant="outline" className="capitalize">
                    {portfolio.portfolio_type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Total Invested</p>
                    <p className="text-lg font-semibold">${portfolio.total_invested.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Current Value</p>
                    <p className="text-lg font-semibold">${portfolio.current_value.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Impact Score</p>
                    <p className="text-lg font-semibold">{portfolio.impact_score.toFixed(1)}/5.0</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Diversification</p>
                    <p className="text-lg font-semibold">{portfolio.diversification_score.toFixed(1)}/5.0</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Performance</span>
                    <span className={portfolio.current_value >= portfolio.total_invested ? 'text-green-600' : 'text-red-600'}>
                      {((portfolio.current_value - portfolio.total_invested) / portfolio.total_invested * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress 
                    value={Math.max(0, Math.min(100, (portfolio.current_value / portfolio.total_invested) * 100))} 
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          {transactions.map((transaction) => (
            <Card key={transaction.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">${transaction.total_amount.toLocaleString()}</p>
                      <p className="text-sm text-gray-600 capitalize">
                        {transaction.transaction_type.replace('_', ' ')} • {transaction.units_traded.toLocaleString()} units
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      {new Date(transaction.created_at).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-400">
                      Fee: ${transaction.platform_fee.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Practitioner Payment:</span>
                    <span className="font-medium text-green-600">
                      ${transaction.practitioner_payment.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Institutional Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Institutional-grade reports will appear here</p>
                <p className="text-sm text-gray-500 mt-2">Monthly, quarterly, and annual performance reports</p>
                <Button className="mt-4">Generate Report</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}